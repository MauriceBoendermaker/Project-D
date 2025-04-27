using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Threading.Tasks;

namespace Services
{
    public class EmailService : IEmailService
    {
        public async Task<bool> SendEmail(string to, string body)
        {
            try
            {

                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("backoffice@boendermaker.com"));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = "Uw (nieuwe) wachtwoord";
                email.Body = new TextPart(TextFormat.Html) { Text = body };

                using var smtp = new SmtpClient();
                smtp.Connect("boendermaker.com", 465, SecureSocketOptions.SslOnConnect);

                var smtpPass = Environment.GetEnvironmentVariable("SMTP_PASS");
                if (string.IsNullOrEmpty(smtpPass))
                {
                    throw new Exception("SMTP_PASS environment variable staat verkeerd.");
                }

                smtp.Authenticate("backoffice@boendermaker.com", smtpPass);

                await smtp.SendAsync(email);
                smtp.Disconnect(true);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Fout met het verzenden van een email: {ex.Message}");
            }
        }

        public async Task<bool> SendRandomPassword(string to, string wachtwoord)
        {
            var htmlBody = $@"
            <html lang='nl'>
            <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Welkom bij E. Lafeber - Uw accountgegevens</title>
            </head>
            <body style='background-color: #f4f2e6; margin: 0; padding: 0; font-family: Arial, sans-serif;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f4f2e6; padding: 40px 0;'>
                <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>
                    <tr>
                        <td style='background-color: #95191D; padding: 20px; text-align: center;'>
                        <img src='https://www.elafeber.nl/wp-content/uploads/2023/02/oie_transparent.png' alt='E. Lafeber' style='height: 60px;' />
                        </td>
                    </tr>
                    <tr>
                        <td style='padding: 30px;'>
                        <h2 style='color: #333; margin-top: 0;'>Uw (nieuwe) wachtwoord</h2>
                        <p style='color: #555;'>Beste medewerker,</p>
                        <p style='color: #555;'>
                            Uw account is succesvol aangemaakt. Hieronder vindt u uw tijdelijke wachtwoord:
                        </p>
                        <p style='text-align: center; margin: 30px 0;'>
                            <span style='background-color: #95191D; color: white; padding: 12px 24px; border-radius: 15px; font-size: 24px; letter-spacing: 2px; display: inline-block;'>
                            {wachtwoord}
                            </span>
                        </p>
                        <p style='color: #555;'>
                            Gebruik dit wachtwoord om in te loggen. U wordt na het inloggen gevraagd om uw wachtwoord te wijzigen.
                        </p>
                        <p style='color: #999; font-size: 12px;'>
                            Dit is een automatisch gegenereerd bericht. U hoeft hier niet op te reageren.
                        </p>
                        <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;' />
                        <p style='color: #aaa; font-size: 12px; text-align: center;'>
                            &copy; {DateTime.Now.Year} E. Lafeber Internationaal Transporten B.V. Alle rechten voorbehouden.
                        </p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>";
            return await SendEmail(to, htmlBody);
        }
    }
}
