const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

class User {
  static async createUser(userData) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Insert user with hashed password
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: userData.email,
        password: hashedPassword,
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        role: userData.role || 'job_seeker',
        created_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    return data[0];
  }
  
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
  
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  static async updateUser(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
}

module.exports = User;