"use client";
import { useState, useEffect, useCallback } from 'react';
import { PortfolioItem, NewPortfolioItem } from './types';
import { useToast } from '@/components/admin/ui/AdminToast';

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
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
      const response = await fetch('/api/admin/portfolio', {
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio items');
      }
      const data = await response.ok ? await response.json() : [];
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast('error', err.message || 'Failed to retrieve portfolio data.');
    } finally {
      setIsLoading(false);
    }
  }, [getHeaders, toast]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (newItem: NewPortfolioItem) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create item');
      }

      const created = await response.json();
      
      // Optimistic UI updates
      setItems((prev) => [...prev, created]);
      toast('success', 'Portfolio created successfully!');
      return created;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to save portfolio.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<PortfolioItem>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update item');
      }

      const updated = await response.json();
      
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast('success', 'Portfolio updated successfully!');
      return updated;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to update portfolio.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to delete item');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      toast('success', 'Portfolio deleted successfully!');
      return true;
    } catch (err: any) {
      console.error(err);
      toast('error', err.message || 'Failed to delete item.');
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
