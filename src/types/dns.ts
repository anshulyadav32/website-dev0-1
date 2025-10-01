export interface DNSRecord {
  type: 'A' | 'AAAA' | 'MX' | 'NS' | 'CNAME' | 'TXT' | 'SOA';
  name: string;
  value: string;
  ttl?: number;
  priority?: number;
}

export interface DNSStatus {
  domain: string;
  owner: string;
  records: DNSRecord[];
  lastChecked: Date;
  isReachable: boolean;
  responseTime?: number;
}