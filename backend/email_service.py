import os
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.smtp_user = os.getenv('SMTP_USER', '')
        self.smtp_pass = os.getenv('SMTP_PASS', '')
        self.business_email = os.getenv('BUSINESS_EMAIL', 'info@puregoldsolutions.ca')
        self.enabled = bool(self.smtp_user and self.smtp_pass)
        
        if not self.enabled:
            logger.warning('Email service disabled: SMTP credentials not configured')

    async def send_email(self, to_email: str, subject: str, html_content: str):
        """Send an email using SMTP"""
        if not self.enabled:
            logger.info(f'Email sending skipped (not configured): {subject} to {to_email}')
            return False

        try:
            message = MIMEMultipart('alternative')
            message['From'] = self.smtp_user
            message['To'] = to_email
            message['Subject'] = subject

            html_part = MIMEText(html_content, 'html')
            message.attach(html_part)

            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_pass,
                start_tls=True
            )
            
            logger.info(f'Email sent successfully to {to_email}')
            return True
        except Exception as e:
            logger.error(f'Failed to send email to {to_email}: {str(e)}')
            return False

    async def send_customer_confirmation(self, booking: dict):
        """Send booking confirmation to customer"""
        if not booking.get('email'):
            logger.info('Customer email not provided, skipping confirmation email')
            return

        subject = '✓ Your Booking is Confirmed - Pure Gold Solutions'
        html_content = f"""
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- Header with Logo and Gradient -->
                <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center; border-radius: 0;">
                    <img src="https://customer-assets.emergentagent.com/job_puregold-carwash/artifacts/iusyof5u_pure%20gold.jpg" alt="Pure Gold Solutions" style="max-width: 120px; height: auto; margin-bottom: 20px; background: white; padding: 10px; border-radius: 10px;" />
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Booking Confirmed!</h1>
                    <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">We're excited to serve you</p>
                </div>
                
                <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="font-size: 16px;">Hi {booking['name']},</p>
                    
                    <p>Thank you for choosing Pure Gold Solutions! Your booking has been confirmed.</p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #f59e0b; margin-top: 0;">Booking Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; width: 40%;">Booking ID:</td>
                                <td style="padding: 8px 0;">{booking['bookingId']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Service:</td>
                                <td style="padding: 8px 0;">{booking['serviceName']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Date:</td>
                                <td style="padding: 8px 0;">{booking['date']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Time:</td>
                                <td style="padding: 8px 0;">{booking['time']}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Address:</td>
                                <td style="padding: 8px 0;">{booking['address']}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; font-weight: bold; color: #92400e;">Payment Information:</p>
                        <p style="margin: 5px 0 0 0; color: #92400e;">Payment will be collected after service completion.</p>
                    </div>
                    
                    <p>Our team will contact you shortly to confirm the appointment details.</p>
                    
                    <p style="margin-top: 30px;">If you have any questions, please don't hesitate to contact us:</p>
                    <p style="margin: 5px 0;">📞 (403) 555-0123</p>
                    <p style="margin: 5px 0;">📧 info@puregoldsolutions.ca</p>
                    
                    <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">Best regards,<br>Pure Gold Solutions Team<br>Calgary's Premier Cleaning Service</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        await self.send_email(booking['email'], subject, html_content)

    async def send_business_notification(self, booking: dict):
        """Send new booking notification to business"""
        subject = f"New Booking: {booking['serviceName']} - {booking['date']}"
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #f59e0b;">New Booking Received</h2>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px;">
                    <h3 style="margin-top: 0;">Booking Details</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; width: 35%;">Booking ID:</td>
                            <td style="padding: 8px 0;">{booking['bookingId']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Service:</td>
                            <td style="padding: 8px 0;">{booking['serviceName']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
                            <td style="padding: 8px 0;">{booking['date']} at {booking['time']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Status:</td>
                            <td style="padding: 8px 0;">{booking['status']}</td>
                        </tr>
                    </table>
                    
                    <h3 style="margin-top: 30px;">Customer Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; width: 35%;">Name:</td>
                            <td style="padding: 8px 0;">{booking['name']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                            <td style="padding: 8px 0;">{booking['phone']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                            <td style="padding: 8px 0;">{booking.get('email', 'Not provided')}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold;">Address:</td>
                            <td style="padding: 8px 0;">{booking['address']}</td>
                        </tr>
                        {f'''<tr>
                            <td style="padding: 8px 0; font-weight: bold;">Vehicle Type:</td>
                            <td style="padding: 8px 0;">{booking['vehicleType']}</td>
                        </tr>''' if booking.get('vehicleType') else ''}
                        {f'''<tr>
                            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Notes:</td>
                            <td style="padding: 8px 0;">{booking['notes']}</td>
                        </tr>''' if booking.get('notes') else ''}
                    </table>
                </div>
                
                <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">This is an automated notification from your booking system.</p>
            </div>
        </body>
        </html>
        """
        
        await self.send_email(self.business_email, subject, html_content)


email_service = EmailService()
