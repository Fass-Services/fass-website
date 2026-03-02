import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  private readonly SMTP2GO_URL = 'https://api.smtp2go.com/v3/email/send';
  private readonly API_KEY = '***REMOVED***';
  private readonly RECIPIENT = 'info@fassservices.com';
  private readonly SENDER = 'Info@fassservices.com';

  /**
   * Escapes HTML special characters to prevent XSS attacks
   */
  private escapeHtml(text: string): string {
    const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char]);
  }

  /**
   * Sanitizes input to prevent email header injection attacks
   * Removes newlines and carriage returns that could inject headers
   */
  private sanitizeForHeader(text: string): string {
    return text.replace(/[\r\n]/g, ' ').trim();
  }

  /**
   * Validates email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sanitizes all form data
   */
  private sanitizeFormData(data: ContactForm): ContactForm {
    return {
      name: this.sanitizeForHeader(data.name).slice(0, 100),
      email: this.sanitizeForHeader(data.email).slice(0, 254),
      message: data.message.trim().slice(0, 5000),
    };
  }

  submitContactForm(data: ContactForm): Observable<boolean> {
    const sanitized = this.sanitizeFormData(data);

    // Validate email format
    if (!this.isValidEmail(sanitized.email)) {
      return throwError(() => new Error('Invalid email format'));
    }

    // Validate required fields
    if (!sanitized.name || !sanitized.message) {
      return throwError(() => new Error('Name and message are required'));
    }

    // Escape HTML for safe rendering in email body
    const safeName = this.escapeHtml(sanitized.name);
    const safeEmail = this.escapeHtml(sanitized.email);
    const safeMessage = this.escapeHtml(sanitized.message);

    return this.http.post(this.SMTP2GO_URL, {
      api_key: this.API_KEY,
      sender: `FASS Website <${this.SENDER}>`,
      to: [this.RECIPIENT],
      subject: `FASS Website Contact: ${safeName}`,
      html_body: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
      text_body: `Name: ${sanitized.name}\nEmail: ${sanitized.email}\nMessage: ${sanitized.message}`,
      custom_headers: [
        { header: 'Reply-To', value: sanitized.email }
      ]
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Contact form submission failed:', error);
        throw error;
      })
    );
  }
}
