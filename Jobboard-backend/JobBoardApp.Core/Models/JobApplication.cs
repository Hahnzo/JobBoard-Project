namespace JobBoardApp.Core.Models
{
    public class JobApplication : BaseEntity
    {
        public Guid JobId { get; set; }
        public Job Job { get; set; } = null!;
        public Guid JobSeekerId { get; set; }
        public JobSeeker JobSeeker { get; set; } = null!;
        public string? CoverLetter { get; set; }
        public string? ResumeUrl { get; set; }
        public ApplicationStatus Status { get; set; }
        public string? RejectionReason { get; set; }
        public DateTime? ViewedAt { get; set; }
        public bool IsAiGenerated { get; set; }
        public decimal? MatchScore { get; set; } // AI-generated match score
    }

    public enum ApplicationStatus
    {
        Applied,
        Viewed,
        InReview,
        Interview,
        Rejected,
        Hired
    }
}
