import { Component, inject, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionWrapper } from '../../shared/components/section-wrapper/section-wrapper';
import { ContactService } from '../../core/services/contact';
import { TranslationService } from '../../core/services/translation';
import type { NgForm } from '@angular/forms';
import type { ContactForm } from '../../core/services/contact';
import type { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionWrapper, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact implements AfterViewInit, OnDestroy {
  private translationService = inject(TranslationService);
  private ngZone = inject(NgZone);
  t = this.translationService.t;
  readonly turnstileSiteKey = '0x4AAAAAACq6g8oRTn0dWcZh';

  private turnstileWidgetId: string | null = null;

  formData: ContactForm = {
    name: '',
    email: '',
    message: '',
    website: '',
    turnstileToken: '',
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private contactService: ContactService) {}

  ngAfterViewInit() {
    this.renderTurnstile();
  }

  ngOnDestroy() {
    if (this.turnstileWidgetId && window.turnstile) {
      window.turnstile.remove(this.turnstileWidgetId);
    }
  }

  private renderTurnstile() {
    const container = document.getElementById('turnstile-container');
    if (!container) return;

    this.loadTurnstileScript().then(() => {
      if (window.turnstile) {
        this.turnstileWidgetId = window.turnstile.render(container, {
          sitekey: this.turnstileSiteKey,
          callback: (token: string) => {
            this.ngZone.run(() => {
              this.formData.turnstileToken = token;
            });
          },
          'expired-callback': () => {
            this.ngZone.run(() => {
              this.formData.turnstileToken = '';
            });
          },
        });
      }
    });
  }

  private loadTurnstileScript(): Promise<void> {
    if (window.turnstile) return Promise.resolve();

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      
      this.contactService.submitContactForm(this.formData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitSuccess = true;
          form.resetForm();
          this.formData.turnstileToken = '';
          this.resetTurnstile();
        },
        error: () => {
          this.isSubmitting = false;
          this.submitError = true;
          this.formData.turnstileToken = '';
          this.resetTurnstile();
        }
      });
    }
  }

  private resetTurnstile() {
    if (this.turnstileWidgetId && window.turnstile) {
      window.turnstile.reset(this.turnstileWidgetId);
    }
  }
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}
