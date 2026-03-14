import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import type { Observable } from 'rxjs';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  website: string;
  turnstileToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  private readonly CONTACT_API = '/api/contact';

  submitContactForm(data: ContactForm): Observable<boolean> {
    // Basic client-side validation (server does full sanitization)
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return throwError(() => new Error('All fields are required'));
    }

    if (!data.turnstileToken?.trim()) {
      return throwError(() => new Error('Bot verification is required'));
    }

    return this.http.post<{ success: boolean }>(this.CONTACT_API, {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      website: data.website.trim(),
      turnstileToken: data.turnstileToken.trim(),
    }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Contact form submission failed:', error);
        throw error;
      })
    );
  }
}
