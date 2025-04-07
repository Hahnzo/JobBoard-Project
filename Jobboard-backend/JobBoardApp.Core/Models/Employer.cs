using Stripe;

namespace JobBoardApp.Core.Models
{
    public class Employer : BaseEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public string CompanyName { get; set; } = string.Empty;
        public string? CompanyWebsite { get; set; }
        public string? CompanyLogoUrl { get; set; }
        public string? CompanyDescription { get; set; }
        public string? Industry { get; set; }
        public string? CompanySize { get; set; }
        public string? CompanyLocation { get; set; }
        public DateTime? FoundedYear { get; set; }

        // Subscription details
        public string? SubscriptionId { get; set; }
        public SubscriptionTier SubscriptionTier { get; set; }
        public DateTime? SubscriptionStartDate { get; set; }
        public DateTime? SubscriptionEndDate { get; set; }
        public bool IsSubscriptionActive { get; set; }

        // Navigation properties
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }

    public enum SubscriptionTier
    {
        Free,
        Basic,
        Premium,
        Enterprise
    }
}
