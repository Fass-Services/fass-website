import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SectionWrapper } from '../../shared/components/section-wrapper/section-wrapper';
import { TranslationService } from '../../core/services/translation';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionWrapper],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss'],
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private translationService = inject(TranslationService);
  
  t = this.translationService.t;
  
  slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') || 'suivipro')),
    { initialValue: 'suivipro' }
  );

  product = computed(() => {
    const s = this.slug();
    const products = this.t().products as Record<string, unknown>;
    return products[s] as {
      badge: string;
      name: string;
      tagline: string;
      heroDesc: string;
      forWho: string;
      problem: string;
      outcome: string;
      features: string[];
      cta: string;
    };
  });
}
