using Microsoft.AspNetCore.Builder;

namespace JobBoardApp.Core.Models
{
    public class Job : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid EmployerId { get; set; }
        public Employer Employer { get; set; } = null!;
        public string Location { get; set; } = string.Empty;
        public bool IsRemote { get; set; }
        public string EmploymentType { get; set; } = string.Empty; // Full-time, Part-time, Contract, etc.
        public decimal? MinSalary { get; set; }
        public decimal? MaxSalary { get; set; }
        public string? Skills { get; set; } // Comma-separated skills
        public string? RequiredExperience { get; set; }
        public string? EducationLevel { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsActive { get; set; }
        public int Views { get; set; }
        public int ApplicationCount { get; set; }

        // Navigation properties
        public ICollection<JobApplication> Applications { get; set; } = new List<JobApplication>();
        public ICollection<SavedJob> SavedBy { get; set; } = new List<SavedJob>();
    }
}
