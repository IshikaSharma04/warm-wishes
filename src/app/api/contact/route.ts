import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const MESSAGES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'messages.json');

async function getMessages() {
  try {
    const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    try {
      await fs.mkdir(path.dirname(MESSAGES_FILE_PATH), { recursive: true });
      await fs.writeFile(MESSAGES_FILE_PATH, '[]', 'utf-8');
    } catch (e) {
      console.error('Error creating messages file:', e);
    }
    return [];
  }
}

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required fields.' },
        { status: 400 }
      );
    }

    const newMessageData = {
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      message: message.trim(),
      createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      timestamp: new Date().toISOString(),
    };

    let savedMessage = null;

    if (process.env.MONGODB_URI) {
      try {
        const { Message } = await import('@/lib/models');
        const connectToDatabase = (await import('@/lib/mongodb')).default;
        await connectToDatabase();
        
        const doc = await Message.create(newMessageData);
        savedMessage = {
          id: doc._id.toString(),
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          message: doc.message,
          createdAt: doc.createdAt,
          timestamp: doc.timestamp
        };
      } catch (err) {
        console.error("MongoDB Contact POST error, falling back to local JSON:", err);
      }
    }

    if (!savedMessage) {
      const fallbackMessage = {
        id: Date.now().toString(),
        ...newMessageData
      };
      
      // 1. Save to disk
      try {
        const messages = await getMessages();
        const updated = [fallbackMessage, ...messages];
        await fs.mkdir(path.dirname(MESSAGES_FILE_PATH), { recursive: true });
        await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
      } catch (err) {
        console.error('Failed to write message to disk:', err);
      }
      savedMessage = fallbackMessage;
    }

    // 2. Send email via Gmail
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser;

    if (gmailUser && gmailPass && gmailPass !== 'your_16_char_app_password_here') {
      try {
        const transporter = createTransporter();

        const htmlBody = `
          <div style="font-family: 'Georgia', serif; background: #141210; color: #E8E0D8; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <div style="border-bottom: 1px solid #C8A66A33; padding-bottom: 24px; margin-bottom: 28px;">
              <h1 style="color: #C8A66A; font-size: 26px; margin: 0 0 6px;">✨ New Inquiry — Warm Wishes</h1>
              <p style="color: #E8E0D8; opacity: 0.6; font-size: 13px; font-family: sans-serif; margin: 0;">
                Received at ${savedMessage.createdAt}
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; color: #C8A66A; width: 110px; vertical-align: top; font-weight: 600; letter-spacing: 0.5px;">NAME</td>
                <td style="padding: 10px 0; color: #E8E0D8;">${savedMessage.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #C8A66A; vertical-align: top; font-weight: 600; letter-spacing: 0.5px;">EMAIL</td>
                <td style="padding: 10px 0; color: #E8E0D8;">${savedMessage.email || '<span style="opacity:0.5">Not provided</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #C8A66A; vertical-align: top; font-weight: 600; letter-spacing: 0.5px;">PHONE</td>
                <td style="padding: 10px 0; color: #E8E0D8;">${savedMessage.phone || '<span style="opacity:0.5">Not provided</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0 10px; color: #C8A66A; vertical-align: top; font-weight: 600; letter-spacing: 0.5px;">MESSAGE</td>
                <td style="padding: 14px 0 10px; color: #E8E0D8; line-height: 1.7;">${savedMessage.message.replace(/\n/g, '<br/>')}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; border-top: 1px solid #C8A66A33; padding-top: 20px;">
              ${savedMessage.phone ? `<a href="https://wa.me/91${savedMessage.phone.replace(/\D/g, '')}?text=Hi+${encodeURIComponent(savedMessage.name)}%2C+thanks+for+reaching+out+to+Warm+Wishes!" style="display:inline-block; background: #25D366; color: #fff; font-family: sans-serif; font-size: 12px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 8px; letter-spacing: 1px; margin-right: 10px;">REPLY ON WHATSAPP</a>` : ''}
              ${savedMessage.email ? `<a href="mailto:${savedMessage.email}?subject=Re: Your Inquiry at Warm Wishes" style="display:inline-block; background: #C8A66A; color: #141210; font-family: sans-serif; font-size: 12px; font-weight: 600; text-decoration: none; padding: 10px 20px; border-radius: 8px; letter-spacing: 1px;">REPLY VIA EMAIL</a>` : ''}
            </div>

            <p style="margin-top: 24px; font-family: sans-serif; font-size: 11px; color: #E8E0D8; opacity: 0.4; text-align: center;">
              Warm Wishes · thewarmwishescompany@gmail.com · @warm__wishes
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: `"Warm Wishes Website" <${gmailUser}>`,
          to: receiverEmail,
          replyTo: savedMessage.email || gmailUser,
          subject: `✨ New Inquiry from ${savedMessage.name} — Warm Wishes`,
          html: htmlBody,
          text: `New message from ${savedMessage.name}\nEmail: ${savedMessage.email || 'Not provided'}\nPhone: ${savedMessage.phone || 'Not provided'}\n\nMessage:\n${savedMessage.message}\n\nReceived at: ${savedMessage.createdAt}`,
        });

        console.log('Email sent successfully to', receiverEmail);
      } catch (emailErr) {
        // Non-fatal — message still saved to disk
        console.error('Email sending failed (message saved to disk):', emailErr);
      }
    } else {
      console.warn('Gmail credentials not configured. Message saved to disk only.');
    }

    return NextResponse.json(
      { success: true, message: 'Message received!', data: savedMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
