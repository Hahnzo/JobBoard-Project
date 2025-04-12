const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

class Application {
  static async createApplication(applicationData) {
    // Generate a unique filename for the resume
    const resumeFileName = applicationData.resumeFile 
      ? `${uuidv4()}-${applicationData.resumeFile.originalname}`
      : null;
    
    // Store the application in the database
    const { data, error } = await supabase
      .from('applications')
      .insert({
        job_id: applicationData.jobId,
        user_id: applicationData.userId,
        first_name: applicationData.firstName,
        last_name: applicationData.lastName,
        email: applicationData.email,
        phone: applicationData.phone,
        cover_letter: applicationData.coverLetter,
        resume_url: resumeFileName,
        portfolio_url: applicationData.portfolioUrl,
        status: 'pending',
        created_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    
    // If a resume file was provided, upload it to Supabase storage
    if (applicationData.resumeFile && resumeFileName) {
      const { error: storageError } = await supabase
        .storage
        .from('resumes')
        .upload(resumeFileName, applicationData.resumeFile.buffer, {
          contentType: applicationData.resumeFile.mimetype,
        });
      
      if (storageError) {
        // If storage upload fails, delete the application record
        await supabase
          .from('applications')
          .delete()
          .eq('id', data[0].id);
        
        throw storageError;
      }
    }
    
    return data[0];
  }
  
  static async getApplicationsByJobId(jobId) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        jobs(*),
        users(*)
      `)
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
  
  static async getApplicationsByUserId(userId) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        jobs(*),
        users(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
  
  static async updateApplicationStatus(id, status) {
    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
}

module.exports = Application;