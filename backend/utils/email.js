import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.error('⚠️  RESEND_API_KEY is not set!');
    console.error('📧 Email functionality will not work until you:');
    console.error('   1. Sign up at https://resend.com');
    console.error('   2. Get your API key');
    console.error('   3. Add RESEND_API_KEY to your Render environment variables');
}

const resend = apiKey ? new Resend(apiKey) : null;

export async function sendEmail({ to, subject, html }) {
    if (!resend) {
        throw new Error('Email service not configured. Please set RESEND_API_KEY environment variable.');
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>', // Resend's test domain
            to: [to],
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
