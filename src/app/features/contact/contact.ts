import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionWrapper } from '../../shared/components/section-wrapper/section-wrapper';
import { ContactService } from '../../core/services/contact';
import { TranslationService } from '../../core/services/translation';
import type { NgForm } from '@angular/forms';
import type { ContactForm } from '../../core/services/contact';
import type { OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionWrapper, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class Contact implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  t = this.translationService.t;
  readonly turnstileSiteKey = '0x4AAAAAACq6g8oRTn0dWcZh';

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

  ngOnInit() {
    window.onTurnstileSuccess = (token: string) => {
      this.formData.turnstileToken = token;
    };

    window.onTurnstileExpired = () => {
      this.formData.turnstileToken = '';
    };
  }

  ngOnDestroy() {
    delete window.onTurnstileSuccess;
    delete window.onTurnstileExpired;
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
          window.turnstile?.reset();
        },
        error: () => {
          this.isSubmitting = false;
          this.submitError = true;
          this.formData.turnstileToken = '';
          window.turnstile?.reset();
        }
      });
    }
  }
}

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
  }
}
