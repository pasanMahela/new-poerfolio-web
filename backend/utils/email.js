import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
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
