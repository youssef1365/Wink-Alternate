import type { APIRoute } from 'astro';
import { Resend } from 'resend';
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    console.log("Checking API Key:", import.meta.env.RESEND_API_KEY ? "EXISTS" : "MISSING");
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Expected JSON" }), { status: 400 });
  }

  try {
    const body = await request.json();
    const { name, email, organization, country, interest, message } = body;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Change this after domain verification
      to: ['alkarimyoussef@gmail.com'], // Use the email you signed up with for Resend
      subject: `New Inquiry: ${interest} from ${name}`,
      html: `
        <div style="font-family: sans-serif; background-color: #071e2b; color: white; padding: 20px; border-radius: 10px;">
          <h2 style="color: #ff8c00;">New Business Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <hr style="border: 0; border-top: 1px solid #ff8c00;" />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully!", id: data.data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Resend Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};