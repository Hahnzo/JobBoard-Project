const supabase = require('../config/supabase');

class Job {
  static async createJob(jobData) {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title: jobData.title,
        description: jobData.description,
        company_id: jobData.companyId,
        job_type: jobData.jobType,
        location: jobData.location,
        salary_range: jobData.salaryRange,
        experience_level: jobData.experienceLevel,
        created_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    
    // If skills are provided, associate them with the job
    if (jobData.skills && jobData.skills.length > 0) {
      await this.addJobSkills(data[0].id, jobData.skills);
    }
    
    return data[0];
  }
  
  static async addJobSkills(jobId, skills) {
    // First, ensure all skills exist in the skills table
    for (const skill of skills) {
      const { data: existingSkill } = await supabase
        .from('skills')
        .select('*')
        .eq('name', skill)
        .single();
      
      if (!existingSkill) {
        await supabase.from('skills').insert({ name: skill });
      }
    }
    
    // Get skill IDs
    const { data: skillData } = await supabase
      .from('skills')
      .select('*')
      .in('name', skills);
    
    // Create job-skill relationships
    const jobSkills = skillData.map(skill => ({
      job_id: jobId,
      skill_id: skill.id
    }));
    
    const { error } = await supabase
      .from('job_skills')
      .insert(jobSkills);
    
    if (error) throw error;
  }
  
  static async findById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        companies(*),
        job_skills(
          skills(*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  static async getAllJobs(filters = {}) {
    let query = supabase
      .from('jobs')
      .select(`
        *,
        companies(*),
        job_skills(
          skills(*)
        )
      `)
      .order('created_at', { ascending: false });
    
    // Apply filters
    if (filters.jobType) {
      query = query.eq('job_type', filters.jobType);
    }
    
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    
    if (filters.experienceLevel) {
      query = query.eq('experience_level', filters.experienceLevel);
    }
    
    // Apply pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    
    query = query.range(start, end);
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    
    return { data, count };
  }
  
  static async updateJob(id, jobData) {
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    // Update skills if provided
    if (jobData.skills && jobData.skills.length > 0) {
      // First, remove existing job-skill relationships
      await supabase
        .from('job_skills')
        .delete()
        .eq('job_id', id);
      
      // Then add the new skills
      await this.addJobSkills(id, jobData.skills);
    }
    
    return data[0];
  }
  
  static async deleteJob(id) {
    // First delete job-skill relationships
    await supabase
      .from('job_skills')
      .delete()
      .eq('job_id', id);
    
    // Then delete the job
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}

module.exports = Job;