import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionWrapper } from '../../shared/components/section-wrapper/section-wrapper';
import { TranslationService } from '../../core/services/translation';

type ProductSlug = 'suivipro' | 'homehaven' | 'primetoxdx';

interface ProductInfo {
  badge: string;
  name: string;
  tagline: string;
  heroDesc: string;
  forWho: string;
  problem: string;
  outcome: string;
  features: string[];
  cta: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionWrapper],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
})
export class Products {
  private translationService = inject(TranslationService);
  t = this.translationService.t;

  productsList = computed(() => {
    const products = this.t().products as Record<ProductSlug, ProductInfo>;
    return [
      { slug: 'suivipro' as const, status: 'active' as const, data: products.suivipro },
      { slug: 'homehaven' as const, status: 'coming' as const, data: products.homehaven },
      { slug: 'primetoxdx' as const, status: 'coming' as const, data: products.primetoxdx },
    ];
  });
}
