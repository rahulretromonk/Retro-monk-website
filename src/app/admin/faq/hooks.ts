"use client";
import { useState, useEffect, useCallback } from 'react';
import { FAQItem, NewFAQItem } from './types';
import { useToast } from '@/components/admin/ui/AdminToast';

export function useFAQs() {
  const [items, setItems] = useState<FAQItem[]>([]);
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
      const response = await fetch('/api/admin/faq', {
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      const data = await response.ok ? await response.json() : [];
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast('error', err.message || 'Failed to retrieve FAQs.');
    } finally {
      setIsLoading(false);
    }
  }, [getHeaders, toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (newItem: NewFAQItem) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/faq', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create FAQ');
      }

      const created = await response.json();
      setItems((prev) => [...prev, created]);
      toast('success', 'FAQ created successfully!');
      return created;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to save FAQ.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<FAQItem>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update FAQ');
      }

      const updated = await response.json();
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast('success', 'FAQ updated successfully!');
      return updated;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to update FAQ.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to delete FAQ');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast('success', 'FAQ deleted successfully!');
      return true;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to delete FAQ.');
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
