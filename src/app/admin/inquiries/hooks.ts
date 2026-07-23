"use client";
import { useState, useEffect, useCallback } from 'react';
import { InquiryItem, NewInquiryItem } from './types';
import { useToast } from '@/components/admin/ui/AdminToast';

export function useInquiries() {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getHeaders = useCallback(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, []);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/inquiries', {
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }
      const data = await response.ok ? await response.json() : [];
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast('error', err.message || 'Failed to retrieve inquiries.');
    } finally {
      setIsLoading(false);
    }
  }, [getHeaders, toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (newItem: NewInquiryItem) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to submit inquiry');
      }

      const created = await response.json();
      setItems((prev) => [created, ...prev]);
      toast('success', 'Inquiry submitted successfully!');
      return created;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to save inquiry.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<InquiryItem>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update inquiry');
      }

      const updated = await response.json();
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast('success', 'Inquiry updated successfully!');
      return updated;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to update inquiry.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to delete inquiry');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast('success', 'Inquiry deleted successfully!');
      return true;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to delete inquiry.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    refresh: fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
}
