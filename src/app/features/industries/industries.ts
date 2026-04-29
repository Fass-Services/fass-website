import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionWrapper } from '../../shared/components/section-wrapper/section-wrapper';
import { TranslationService } from '../../core/services/translation';

type IndustryKey = 'construction' | 'healthcare' | 'realEstate';

interface IndustryInfo {
  name: string;
  desc: string;
  product: string;
  link: string;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionWrapper],
  templateUrl: './industries.html',
  styleUrls: ['./industries.scss'],
})
export class Industries {
  private translationService = inject(TranslationService);
  t = this.translationService.t;

  industriesList = computed(() => {
    const industries = this.t().industries as Record<IndustryKey, IndustryInfo>;
    return [
      { key: 'construction' as const, icon: 'construction', data: industries.construction },
      { key: 'healthcare' as const, icon: 'healthcare', data: industries.healthcare },
      { key: 'realEstate' as const, icon: 'realEstate', data: industries.realEstate },
    ];
  });
}
