import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// No Backend (Node), precisamos carregar o dotenv manualmente se o arquivo for usado de forma independente
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);