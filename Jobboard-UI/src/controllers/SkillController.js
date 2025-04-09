const Skill = require('../models/Skill');

class SkillController {
  static async getAllSkills(req, res) {
    try {
      const skills = await Skill.getAllSkills();
      return res.status(200).json(skills);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async createSkill(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Skill name is required' });
      }
      
      const skill = await Skill.createSkill(name);
      return res.status(201).json(skill);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async getSkillsByJob(req, res) {
    try {
      const { jobId } = req.params;
      const skills = await Skill.getSkillsByJobId(jobId);
      return res.status(200).json(skills);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SkillController;