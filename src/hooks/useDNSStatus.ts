import { useState, useEffect, useCallback } from 'react';
import { DNSStatus } from '../types/dns';
import { getMockDNSStatus } from '../services/DNSService';

interface UseDNSStatusResult {
  dnsStatus: DNSStatus;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useDNSStatus = (domain: string, owner: string): UseDNSStatusResult => {
  const [dnsStatus, setDnsStatus] = useState<DNSStatus>(getMockDNSStatus());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDNSStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll use mock data initially
      // In production, you would uncomment the line below:
      // const status = await DNSService.getCompleteDNSStatus(domain, owner);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const status = getMockDNSStatus();
      status.domain = domain;
      status.owner = owner;
      status.lastChecked = new Date();
      
      setDnsStatus(status);
    } catch (err) {
      setError('Failed to fetch DNS status');
      console.error('DNS fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [domain, owner]);

  const refresh = useCallback(() => {
    fetchDNSStatus();
  }, [fetchDNSStatus]);

  useEffect(() => {
    fetchDNSStatus();
  }, [fetchDNSStatus]);

  return {
    dnsStatus,
    isLoading,
    error,
    refresh
  };
};