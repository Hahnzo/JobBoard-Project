const supabase = require('../config/supabase');

class Company {
  static async createCompany(companyData) {
    const { data, error } = await supabase
      .from('companies')
      .insert({
        name: companyData.name,
        logo_url: companyData.logoUrl,
        website: companyData.website,
        description: companyData.description,
        user_id: companyData.userId,
        created_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    return data[0];
  }
  
  static async findById(id) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
  
  static async updateCompany(id, companyData) {
    const { data, error } = await supabase
      .from('companies')
      .update(companyData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
}

module.exports = Company;