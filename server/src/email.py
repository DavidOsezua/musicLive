import ssl
import smtplib
from pydantic import EmailStr
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


app_password = "cbdocwfclgknmali"
username = "HQ@FindMeLiveMusic.com"
port = 465  # For SSL
context = ssl.create_default_context()

venue_msg = """<h2>Your venue is now approved and live on the website.</h2>

<p>To keep events updated, send an email with:</p>
  <ul>
  <li>Band name</li>
  <li>Venue</li>
  <li>Date</li>
  <li>Time</li>
</ul>
<p><b>Premium placement for promotion will be available in Q2 of 2025.</b></p>
<p>
<i>If you find this site helpful please consider providing us a tip via the virtual tip jar (since you can't buy us drinks)<i/>
</p>
"""


band_msg = """<h2>Your band is now approved and live on the website.</h2>

<p>To keep events updated, send an email with:</p>
  <ul>
  <li>Band name</li>
  <li>Venue</li>
  <li>Date</li>
  <li>Time</li>
</ul>
<p><b>Premium placement for promotion will be available in Q2 of 2025.</b></p>
<p>
<i>If you find this site helpful please consider providing us a tip via the virtual tip jar (since you can't buy us drinks)<i/>
</p>
"""


def send_venue_approval_msg(email: EmailStr):
    email_str = parse_message(venue_msg, email, "Venue Submission Approval Note")
    send_otp_through_smtp(email, email_str)


def send_band_approval_msg(email: EmailStr):
    email_str = parse_message(band_msg, email, "Band Submission Approval Note")
    send_otp_through_smtp(email, email_str)


def parse_message(message: str, to: str, subject: str) -> str:
    email_message = MIMEMultipart()
    email_message["To"] = to
    email_message["From"] = username
    email_message["Subject"] = subject
    email_message.attach(MIMEText(message, "html"))
    email_string = email_message.as_string()
    return email_string


def send_otp_through_smtp(to: EmailStr, message: str) -> None:
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(username, app_password)
        server.sendmail(username, to, message)
