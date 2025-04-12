const Company = require('../models/Company');
const User = require('../models/User');
const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

class CompanyController {
  static async createCompany(req, res) {
    try {
      const userId = req.user.id;
      const { name, website, description } = req.body;
      
      // Validate required fields
      if (!name) {
        return res.status(400).json({ error: 'Company name is required' });
      }
      
      // Check if user already has a company
      const existingCompany = await Company.findByUserId(userId);
      if (existingCompany) {
        return res.status(400).json({ error: 'User already has a company' });
      }
      
      // Handle company logo upload if provided
      let logoUrl = null;
      if (req.file) {
        const fileName = `${uuidv4()}-${req.file.originalname}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('company-logos')
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
          });
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL for the logo
        const { data } = supabase
          .storage
          .from('company-logos')
          .getPublicUrl(fileName);
        
        logoUrl = data.publicUrl;
      }
      
      // Update company
      const updatedCompany = await Company.updateCompany(company.id, {
        name: name || company.name,
        logo_url: logoUrl,
        website: website || company.website,
        description: description || company.description
      });
      
      return res.status(200).json(updatedCompany);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CompanyController;