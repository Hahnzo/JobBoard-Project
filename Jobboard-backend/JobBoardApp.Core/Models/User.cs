namespace JobBoardApp.Core.Models
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public bool EmailVerified { get; set; }
        public string? ProfilePictureUrl { get; set; }

        // Navigation properties
        public JobSeeker? JobSeeker { get; set; }
        public Employer? Employer { get; set; }
    }

    public enum UserRole
    {
        Admin,
        JobSeeker,
        Employer
    }
}
