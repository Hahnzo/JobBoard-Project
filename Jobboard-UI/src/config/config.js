require('dotenv').config();
    
module.exports = {
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  environment: process.env.NODE_ENV || 'development',
};