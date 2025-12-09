import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
// IMPORTANT: Resend free tier only allows sending to the email you signed up with
// This MUST match the email you used to create your Resend account
const RESEND_VERIFIED_EMAIL = 'pasanmama5@gmail.com';

if (!apiKey) {
    console.error('⚠️  RESEND_API_KEY is not set!');
    console.error('📧 Email functionality will not work until you:');
    console.error('   1. Sign up at https://resend.com');
    console.error('   2. Get your API key');
    console.error('   3. Add RESEND_API_KEY to your Render environment variables');
}

const resend = apiKey ? new Resend(apiKey) : null;

export async function sendEmail({ to, subject, html, replyTo }) {
    if (!resend) {
        throw new Error('Email service not configured. Please set RESEND_API_KEY environment variable.');
    }

    try {
        // On Resend free tier, we can ONLY send to the email used to sign up
        // Ignore the 'to' parameter and always send to verified email
        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: [RESEND_VERIFIED_EMAIL], // Hardcoded verified email
            reply_to: replyTo, // Include original sender for replies
            subject: subject,
            html: html,
        });

        if (error) {
            throw new Error(error.message);
        }

        return { success: true, data };
    } catch (error) {
        console.error('Resend email error:', error);
        throw error;
    }
}
