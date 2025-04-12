require('dotenv').config();
    
module.exports = {
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
  jwtSecret: process.env.JWT_SECRET || 'zXoOkHXfBY+Er+JV3F/0/iRJ/0VDWZk55D4dEYAPFz7I/iPeIHKeiJ6c7rwefgnkqk6A3YncT4MMXflByaIXIQ==',
  environment: process.env.NODE_ENV || 'development',
};