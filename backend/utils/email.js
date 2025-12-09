import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'pasanmama5@gmail.com';

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
        // On Resend free tier, we can only send to our verified email
        // So we always send to ADMIN_EMAIL regardless of the 'to' parameter
        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: [ADMIN_EMAIL], // Always send to admin email on free tier
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
