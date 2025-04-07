using Microsoft.AspNetCore.Builder;

namespace JobBoardApp.Core.Models
{
    public class JobSeeker : BaseEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public string? ResumeUrl { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? PortfolioUrl { get; set; }
        public string? PreferredJobTitle { get; set; }
        public string? Skills { get; set; } // Comma-separated skills
        public string? Bio { get; set; }
        public decimal? ExpectedSalary { get; set; }
        public string? Location { get; set; }
        public bool IsAvailableForHire { get; set; }

        // Navigation properties
        public ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
        public ICollection<SavedJob> SavedJobs { get; set; } = new List<SavedJob>();
    }
}
