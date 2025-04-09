const supabase = require('../config/supabase');

class Skill {
  static async getAllSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }
  
  static async createSkill(name) {
    const { data, error } = await supabase
      .from('skills')
      .insert({ name })
      .select();
    
    if (error) throw error;
    return data[0];
  }
  
  static async getSkillsByJobId(jobId) {
    const { data, error } = await supabase
      .from('job_skills')
      .select(`
        skills(*)
      `)
      .eq('job_id', jobId);
    
    if (error) throw error;
    return data.map(item => item.skills);
  }
}

module.exports = Skill;