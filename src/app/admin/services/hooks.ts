"use client";
import { useState, useEffect, useCallback } from 'react';
import { ServiceItem, NewServiceItem } from './types';
import { useToast } from '@/components/admin/ui/AdminToast';

export function useServices() {
  const [items, setItems] = useState<ServiceItem[]>([]);
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
      const response = await fetch('/api/admin/services', {
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.ok ? await response.json() : [];
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast('error', err.message || 'Failed to retrieve services.');
    } finally {
      setIsLoading(false);
    }
  }, [getHeaders, toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (newItem: NewServiceItem) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create service');
      }

      const created = await response.json();
      setItems((prev) => [...prev, created]);
      toast('success', 'Service created successfully!');
      return created;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to save service.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<ServiceItem>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update service');
      }

      const updated = await response.json();
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast('success', 'Service updated successfully!');
      return updated;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to update service.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to delete service');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast('success', 'Service deleted successfully!');
      return true;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to delete service.');
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
