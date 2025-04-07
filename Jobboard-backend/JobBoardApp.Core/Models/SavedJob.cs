namespace JobBoardApp.Core.Models
{
    public class SavedJob : BaseEntity
    {
        public Guid JobId { get; set; }
        public Job Job { get; set; } = null!;
        public Guid JobSeekerId { get; set; }
        public JobSeeker JobSeeker { get; set; } = null!;
    }
}
