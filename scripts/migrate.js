const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read env file manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error("Missing .env.local file!");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dbJsonPath = path.resolve(process.cwd(), 'src/lib/db.json');
if (!fs.existsSync(dbJsonPath)) {
  console.error("Missing db.json seed file at src/lib/db.json!");
  process.exit(1);
}

const localDb = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));

async function migrate() {
  console.log("Starting migration of seed data from db.json to Supabase...");
  
  const tables = ['portfolio', 'services', 'testimonials', 'faq', 'inquiries'];
  
  for (const table of tables) {
    const items = localDb[table];
    if (!items || items.length === 0) {
      console.log(`Table '${table}' has no local items to migrate. Skipping.`);
      continue;
    }
    
    console.log(`Migrating ${items.length} items to table '${table}'...`);
    
    // Supabase upsert inserts new rows or updates existing rows matching 'id'
    const { error } = await supabase.from(table).upsert(items);
    
    if (error) {
      console.error(`Error migrating table '${table}':`, error.message);
    } else {
      console.log(`Successfully migrated table '${table}'!`);
    }
  }
  
  console.log("Migration complete!");
}

migrate();
