namespace Services
{
    public interface IEmailService
    {
        Task<bool> SendEmail(string to, string body);
        Task<bool> SendRandomPassword(string to, string wachtwoord);
        Task<string> GeneratePass();
    }
}