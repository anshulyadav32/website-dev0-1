import axios from 'axios';
import { DNSRecord, DNSStatus } from '../types/dns';

// Using Google DNS-over-HTTPS API for DNS queries
const DNS_API_BASE = 'https://dns.google/resolve';

export class DNSService {
  private static async queryDNS(domain: string, type: string): Promise<any> {
    try {
      const response = await axios.get(DNS_API_BASE, {
        params: {
          name: domain,
          type: type,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error querying ${type} records for ${domain}:`, error);
      return null;
    }
  }

  private static parseDNSResponse(response: any, type: string): DNSRecord[] {
    if (!response || !response.Answer) {
      return [];
    }

    return response.Answer.map((answer: any) => ({
      type: answer.type === 1 ? 'A' : 
            answer.type === 28 ? 'AAAA' :
            answer.type === 15 ? 'MX' :
            answer.type === 2 ? 'NS' :
            answer.type === 5 ? 'CNAME' :
            answer.type === 16 ? 'TXT' :
            answer.type === 6 ? 'SOA' : 'UNKNOWN',
      name: answer.name,
      value: answer.data,
      ttl: answer.TTL,
    }));
  }

  public static async getDNSRecords(domain: string): Promise<DNSRecord[]> {
    const recordTypes = ['A', 'AAAA', 'MX', 'NS', 'CNAME', 'TXT', 'SOA'];
    const allRecords: DNSRecord[] = [];

    // Query each record type
    for (const type of recordTypes) {
      const response = await this.queryDNS(domain, type);
      if (response) {
        const records = this.parseDNSResponse(response, type);
        allRecords.push(...records);
      }
    }

    return allRecords;
  }

  public static async checkDomainReachability(domain: string): Promise<{ isReachable: boolean; responseTime?: number }> {
    try {
      const startTime = Date.now();
      
      // Try to resolve A record as a basic connectivity test
      const response = await this.queryDNS(domain, 'A');
      const responseTime = Date.now() - startTime;
      
      return {
        isReachable: response && response.Answer && response.Answer.length > 0,
        responseTime
      };
    } catch (error) {
      return { isReachable: false };
    }
  }

  public static async getCompleteDNSStatus(domain: string, owner: string): Promise<DNSStatus> {
    const [records, reachability] = await Promise.all([
      this.getDNSRecords(domain),
      this.checkDomainReachability(domain)
    ]);

    return {
      domain,
      owner,
      records,
      lastChecked: new Date(),
      isReachable: reachability.isReachable,
      responseTime: reachability.responseTime
    };
  }
}

// Mock data for development/demo purposes
export const getMockDNSStatus = (): DNSStatus => {
  return {
    domain: 'dev0-1.com',
    owner: 'anshulyadav32',
    records: [
      {
        type: 'A',
        name: 'dev0-1.com',
        value: '192.168.1.100',
        ttl: 300
      },
      {
        type: 'A',
        name: 'www.dev0-1.com',
        value: '192.168.1.100',
        ttl: 300
      },
      {
        type: 'AAAA',
        name: 'dev0-1.com',
        value: '2001:db8::1',
        ttl: 300
      },
      {
        type: 'MX',
        name: 'dev0-1.com',
        value: 'mail.dev0-1.com',
        ttl: 3600,
        priority: 10
      },
      {
        type: 'NS',
        name: 'dev0-1.com',
        value: 'ns1.example.com',
        ttl: 86400
      },
      {
        type: 'NS',
        name: 'dev0-1.com',
        value: 'ns2.example.com',
        ttl: 86400
      },
      {
        type: 'TXT',
        name: 'dev0-1.com',
        value: 'v=spf1 include:_spf.google.com ~all',
        ttl: 3600
      },
      {
        type: 'CNAME',
        name: 'www.dev0-1.com',
        value: 'dev0-1.com',
        ttl: 300
      }
    ],
    lastChecked: new Date(),
    isReachable: true,
    responseTime: 150
  };
};