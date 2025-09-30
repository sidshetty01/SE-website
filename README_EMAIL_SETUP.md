Environment variables for EmailJS (create a .env file in project root):

- VITE_EMAILJS_SERVICE_ID=your_service_id
- VITE_EMAILJS_TEMPLATE_ID=your_template_id
- VITE_EMAILJS_PUBLIC_KEY=your_public_key

Template variables required in EmailJS:

- to_email
- otp

If variables are missing, the app will show the OTP in a toast for local testing.

