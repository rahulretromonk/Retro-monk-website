import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

const JSON_FILE_PATH = path.resolve(process.cwd(), 'src/lib/db.json');

// Helper to read local JSON database
function readLocalDb(): any {
  try {
    if (!fs.existsSync(JSON_FILE_PATH)) {
      return { portfolio: [], services: [], testimonials: [], faq: [], inquiries: [] };
    }
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local JSON db:', err);
    return { portfolio: [], services: [], testimonials: [], faq: [], inquiries: [] };
  }
}

// Helper to write local JSON database
function writeLocalDb(data: any): void {
  try {
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing local JSON db:', err);
  }
}

// Check if a table exists/is accessible in Supabase
async function useSupabaseForTable(tableName: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from(tableName).select('id').limit(1);
    if (error && error.message.includes("Could not find the table")) {
      return false; // Table doesn't exist, fallback to local JSON
    }
    return !error;
  } catch {
    return false;
  }
}

// Helper to normalize portfolio items by category to be contiguous (1, 2, 3...)
function normalizePortfolio(portfolio: any[]): any[] {
  const categories: { [key: string]: any[] } = {};
  for (const item of portfolio) {
    const cat = item.category || 'WEDDING';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  }

  const result: any[] = [];
  for (const cat in categories) {
    categories[cat].sort((a, b) => {
      const orderA = Number(a.displayOrder) || 9999;
      const orderB = Number(b.displayOrder) || 9999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    });

    categories[cat].forEach((item, index) => {
      item.displayOrder = index + 1;
      result.push(item);
    });
  }
  return result;
}

// Helper to normalize global lists (services, faq, testimonials) to be contiguous (1, 2, 3...)
function normalizeGlobalList(list: any[]): any[] {
  return list
    .sort((a, b) => {
      const orderA = Number(a.displayOrder) || 9999;
      const orderB = Number(b.displayOrder) || 9999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    })
    .map((item, index) => {
      item.displayOrder = index + 1;
      return item;
    });
}

export const db = {
  // --- PORTFOLIO ---
  async getPortfolio() {
    const useSb = await useSupabaseForTable('portfolio');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('portfolio').select('*').order('displayOrder', { ascending: true });
      if (!error && data) return normalizePortfolio(data);
    }
    const local = readLocalDb();
    const normalized = normalizePortfolio(local.portfolio);
    return normalized.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createPortfolio(item: any) {
    const useSb = await useSupabaseForTable('portfolio');
    const newItem = {
      ...item,
      id: item.id || `port-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    if (useSb && supabase) {
      const { data, error } = await supabase.from('portfolio').insert(newItem).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    local.portfolio.push(newItem);
    local.portfolio = normalizePortfolio(local.portfolio);
    writeLocalDb(local);
    return local.portfolio.find((i: any) => i.id === newItem.id) || newItem;
  },

  async updatePortfolio(id: string, updates: any) {
    const useSb = await useSupabaseForTable('portfolio');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('portfolio').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    const index = local.portfolio.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      local.portfolio[index] = { ...local.portfolio[index], ...updates };
      local.portfolio = normalizePortfolio(local.portfolio);
      writeLocalDb(local);
      return local.portfolio.find((i: any) => i.id === id) || local.portfolio[index];
    }
    return null;
  },

  async deletePortfolio(id: string) {
    const useSb = await useSupabaseForTable('portfolio');
    if (useSb && supabase) {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (!error) return true;
    }
    const local = readLocalDb();
    const beforeCount = local.portfolio.length;
    local.portfolio = local.portfolio.filter((i: any) => i.id !== id);
    local.portfolio = normalizePortfolio(local.portfolio);
    writeLocalDb(local);
    return local.portfolio.length < beforeCount;
  },

  // --- SERVICES ---
  async getServices() {
    const useSb = await useSupabaseForTable('services');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('services').select('*').order('displayOrder', { ascending: true });
      if (!error && data) return normalizeGlobalList(data);
    }
    const local = readLocalDb();
    const normalized = normalizeGlobalList(local.services);
    return normalized.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createService(item: any) {
    const useSb = await useSupabaseForTable('services');
    const newItem = {
      ...item,
      id: item.id || `srv-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    if (useSb && supabase) {
      const { data, error } = await supabase.from('services').insert(newItem).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    local.services.push(newItem);
    local.services = normalizeGlobalList(local.services);
    writeLocalDb(local);
    return local.services.find((i: any) => i.id === newItem.id) || newItem;
  },

  async updateService(id: string, updates: any) {
    const useSb = await useSupabaseForTable('services');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('services').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    const index = local.services.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      local.services[index] = { ...local.services[index], ...updates };
      local.services = normalizeGlobalList(local.services);
      writeLocalDb(local);
      return local.services.find((i: any) => i.id === id) || local.services[index];
    }
    return null;
  },

  async deleteService(id: string) {
    const useSb = await useSupabaseForTable('services');
    if (useSb && supabase) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) return true;
    }
    const local = readLocalDb();
    const beforeCount = local.services.length;
    local.services = local.services.filter((i: any) => i.id !== id);
    local.services = normalizeGlobalList(local.services);
    writeLocalDb(local);
    return local.services.length < beforeCount;
  },

  // --- TESTIMONIALS ---
  async getTestimonials() {
    const useSb = await useSupabaseForTable('testimonials');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('displayOrder', { ascending: true });
      if (!error && data) return normalizeGlobalList(data);
    }
    const local = readLocalDb();
    const normalized = normalizeGlobalList(local.testimonials);
    return normalized.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createTestimonial(item: any) {
    const useSb = await useSupabaseForTable('testimonials');
    const newItem = {
      ...item,
      id: item.id || `tst-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    if (useSb && supabase) {
      const { data, error } = await supabase.from('testimonials').insert(newItem).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    local.testimonials.push(newItem);
    local.testimonials = normalizeGlobalList(local.testimonials);
    writeLocalDb(local);
    return local.testimonials.find((i: any) => i.id === newItem.id) || newItem;
  },

  async updateTestimonial(id: string, updates: any) {
    const useSb = await useSupabaseForTable('testimonials');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('testimonials').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    const index = local.testimonials.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      local.testimonials[index] = { ...local.testimonials[index], ...updates };
      local.testimonials = normalizeGlobalList(local.testimonials);
      writeLocalDb(local);
      return local.testimonials.find((i: any) => i.id === id) || local.testimonials[index];
    }
    return null;
  },

  async deleteTestimonial(id: string) {
    const useSb = await useSupabaseForTable('testimonials');
    if (useSb && supabase) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (!error) return true;
    }
    const local = readLocalDb();
    const beforeCount = local.testimonials.length;
    local.testimonials = local.testimonials.filter((i: any) => i.id !== id);
    local.testimonials = normalizeGlobalList(local.testimonials);
    writeLocalDb(local);
    return local.testimonials.length < beforeCount;
  },

  // --- FAQS ---
  async getFAQs() {
    const useSb = await useSupabaseForTable('faq');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('faq').select('*').order('displayOrder', { ascending: true });
      if (!error && data) return normalizeGlobalList(data);
    }
    const local = readLocalDb();
    const normalized = normalizeGlobalList(local.faq);
    return normalized.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createFAQ(item: any) {
    const useSb = await useSupabaseForTable('faq');
    const newItem = {
      ...item,
      id: item.id || `faq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    if (useSb && supabase) {
      const { data, error } = await supabase.from('faq').insert(newItem).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    local.faq.push(newItem);
    local.faq = normalizeGlobalList(local.faq);
    writeLocalDb(local);
    return local.faq.find((i: any) => i.id === newItem.id) || newItem;
  },

  async updateFAQ(id: string, updates: any) {
    const useSb = await useSupabaseForTable('faq');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('faq').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    const index = local.faq.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      local.faq[index] = { ...local.faq[index], ...updates };
      local.faq = normalizeGlobalList(local.faq);
      writeLocalDb(local);
      return local.faq.find((i: any) => i.id === id) || local.faq[index];
    }
    return null;
  },

  async deleteFAQ(id: string) {
    const useSb = await useSupabaseForTable('faq');
    if (useSb && supabase) {
      const { error } = await supabase.from('faq').delete().eq('id', id);
      if (!error) return true;
    }
    const local = readLocalDb();
    const beforeCount = local.faq.length;
    local.faq = local.faq.filter((i: any) => i.id !== id);
    local.faq = normalizeGlobalList(local.faq);
    writeLocalDb(local);
    return local.faq.length < beforeCount;
  },

  // --- INQUIRIES ---
  async getInquiries() {
    const useSb = await useSupabaseForTable('inquiries');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('inquiries').select('*').order('submittedDate', { ascending: false });
      if (!error && data) return data;
    }
    return readLocalDb().inquiries.sort((a: any, b: any) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
  },

  async createInquiry(item: any) {
    const useSb = await useSupabaseForTable('inquiries');
    const newItem = {
      ...item,
      id: item.id || `inq-${Date.now()}`,
      status: item.status || 'pending',
      submittedDate: item.submittedDate || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    if (useSb && supabase) {
      const { data, error } = await supabase.from('inquiries').insert(newItem).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    local.inquiries.push(newItem);
    writeLocalDb(local);
    return newItem;
  },

  async updateInquiry(id: string, updates: any) {
    const useSb = await useSupabaseForTable('inquiries');
    if (useSb && supabase) {
      const { data, error } = await supabase.from('inquiries').update(updates).eq('id', id).select().single();
      if (!error && data) return data;
    }
    const local = readLocalDb();
    const index = local.inquiries.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      local.inquiries[index] = { ...local.inquiries[index], ...updates };
      writeLocalDb(local);
      return local.inquiries[index];
    }
    return null;
  },

  async deleteInquiry(id: string) {
    const useSb = await useSupabaseForTable('inquiries');
    if (useSb && supabase) {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (!error) return true;
    }
    const local = readLocalDb();
    const beforeCount = local.inquiries.length;
    local.inquiries = local.inquiries.filter((i: any) => i.id !== id);
    writeLocalDb(local);
    return local.inquiries.length < beforeCount;
  }
};
