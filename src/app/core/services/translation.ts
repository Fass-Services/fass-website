import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'fr';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      industries: 'Industries',
      team: 'Team',
      contact: 'Book a Demo'
    },
    home: {
      badge: 'Industry Software',
      title1: 'Software That',
      titleHighlight: 'Solves',
      title2: 'Real Problems',
      subtitle: 'Purpose-built products for construction, healthcare, and real estate—designed for emerging markets, measured by outcomes.',
      cta1: 'Explore Products',
      cta2: 'Book a Demo',
      card1: 'Construction',
      card2: 'Healthcare',
      card3: 'Real Estate',
      // Industry chooser section
      industryBadge: 'Your Industry',
      industryTitle: 'Select Your Sector',
      industrySubtitle: 'Each product is built for operators who need results, not features',
      industryConstruction: 'Construction',
      industryConstructionDesc: 'Budget tracking, materials management, and audit trails for contractors and project managers.',
      industryHealthcare: 'Healthcare',
      industryHealthcareDesc: 'Diagnostic workflows and patient management for clinics and laboratories.',
      industryRealEstate: 'Real Estate',
      industryRealEstateDesc: 'Rental marketplace connecting landlords with tenants, payments included.',
      // Products section
      productsBadge: 'Our Products',
      productsTitle: 'Built for Operators',
      productsSubtitle: 'Not generic tools—productized workflows with onboarding, support, and measurable outcomes',
      suiviproName: 'SuiviPro',
      suiviproTagline: 'Construction Budget Intelligence',
      suiviproDesc: 'Track materials, control budgets, and eliminate leakage. Built for contractors managing multi-site projects.',
      homehavenName: 'HomeHaven',
      homehavenTagline: 'Long-Term Rental Marketplace',
      homehavenDesc: 'Connect landlords with quality tenants. Payments, messaging, and property management in one platform.',
      primetoxdxName: 'PrimeToxDx',
      primetoxdxTagline: 'Medical Diagnostics Platform',
      primetoxdxDesc: 'Streamline diagnostic workflows and patient records for clinics operating in resource-constrained environments.',
      viewProduct: 'Learn More',
      comingSoon: 'Coming Soon',
      // Why emerging markets section
      whyBadge: 'Built Different',
      whyTitle: 'Designed for Real Conditions',
      whySubtitle: 'Our products work where others fail',
      whyOffline: 'Offline-First',
      whyOfflineDesc: 'Full functionality without constant internet. Sync when connected.',
      whyMobile: 'Mobile-Native',
      whyMobileDesc: 'Designed for phones first, because that\'s how operators work.',
      whyLocal: 'Local Workflows',
      whyLocalDesc: 'Built around how businesses actually operate, not Silicon Valley assumptions.',
      whyAudit: 'Audit Trails',
      whyAuditDesc: 'Every action logged. Full accountability for stakeholders and compliance.',
      // Story section
      storyBadge: 'Impact',
      storyTitle: 'Measured by Outcomes',
      storySubtitle: 'We track operator success, not vanity metrics',
      storyMetric1: 'Budget Variance',
      storyMetric1Value: '< 5%',
      storyMetric1Desc: 'Average budget accuracy for SuiviPro users',
      storyMetric2: 'Time Saved',
      storyMetric2Value: '10+ hrs',
      storyMetric2Desc: 'Per week on materials tracking and reporting',
      storyMetric3: 'Audit Ready',
      storyMetric3Value: '100%',
      storyMetric3Desc: 'Full documentation trail for every transaction',
      // CTA section
      ctaTitle1: 'Ready to See',
      ctaTitleHighlight: 'Results',
      ctaText: 'Book a demo and we\'ll show you exactly how our products fit your workflow.',
      ctaBtn1: 'Book a Demo',
      ctaBtn2: 'Talk to Sales'
    },
    about: {
      badge: 'Our Story',
      title: 'About',
      titleHighlight: 'FASS Services',
      subtitle: 'We build software products that solve industry problems in emerging markets.',
      journeyTitle: 'From',
      journeyHighlight: 'Operators',
      journeyLead: 'FASS Services was founded by engineers who saw how broken software was for businesses in emerging markets.',
      journeyText1: 'Headquartered in the USA with operations in the',
      journeyCountry: 'Democratic Republic of Congo',
      journeyText2: ', we build products for the conditions our customers actually face.',
      journeyText3: 'We don\'t sell hours. We deliver productized workflows with implementation, training, and measurable outcomes. If our software doesn\'t improve your operations, we\'ve failed.',
      imagePlaceholder: 'FASS Team',
      mvBadge: 'How We Work',
      mvTitle: 'Our Approach',
      missionTitle: 'Products, Not Projects',
      missionText: 'We build and maintain software products with roadmaps, support, and continuous improvement—not one-off custom development.',
      visionTitle: 'Outcomes, Not Features',
      visionText: 'We measure success by operator results: reduced costs, saved time, eliminated errors. If you\'re not seeing outcomes, we\'re not done.',
      focusBadge: 'Our Advantage',
      focusTitle: 'Built for Emerging Markets',
      focusSubtitle: 'Constraints we design for, not around',
      focusIntro: 'Most software assumes reliable internet, unlimited bandwidth, and Western workflows. We design for the opposite:',
      focusOpportunities: 'real conditions',
      focusIntro2: 'that our customers face daily.',
      focusDigital: 'Offline Capability',
      focusDigitalDesc: 'Full functionality without constant connectivity. Sync when you can.',
      focusEducation: 'Implementation Support',
      focusEducationDesc: 'We don\'t throw software over the wall. Training and support are built in.',
      focusInfra: 'Local Payment Rails',
      focusInfraDesc: 'Mobile money, local currencies, and payment methods that actually work.'
    },
    products: {
      badge: 'Products',
      title: 'Our',
      titleHighlight: 'Products',
      subtitle: 'Industry software built for operators in emerging markets.',
      suivipro: {
        badge: 'Construction',
        name: 'SuiviPro',
        tagline: 'Construction Budget & Materials Intelligence',
        heroDesc: 'Track every material, control every budget, and eliminate leakage across all your construction sites.',
        forWho: 'For contractors, project managers, and construction firms managing multi-site projects.',
        problem: 'Material leakage, budget overruns, and zero visibility into where money actually goes.',
        outcome: 'Predictable budgets, accountable teams, and audit-ready documentation.',
        features: [
          'Real-time materials tracking',
          'Budget variance alerts',
          'Multi-site dashboard',
          'Offline-first mobile app',
          'Audit trail for every transaction',
          'Inspector workflows'
        ],
        cta: 'Book a Demo'
      },
      homehaven: {
        badge: 'Real Estate',
        name: 'HomeHaven',
        tagline: 'Long-Term Rental Marketplace',
        heroDesc: 'Connect quality tenants with verified landlords. Payments, messaging, and property management in one platform.',
        forWho: 'For landlords, property managers, and tenants seeking long-term rentals.',
        problem: 'Fragmented rental market, payment collection challenges, and no tenant verification.',
        outcome: 'Higher occupancy, reliable payments, and verified tenant profiles.',
        features: [
          'Property listings with verification',
          'In-app messaging',
          'Integrated payments',
          'Tenant screening',
          'Lease management',
          'Maintenance requests'
        ],
        cta: 'Join Waitlist'
      },
      primetoxdx: {
        badge: 'Healthcare',
        name: 'PrimeToxDx',
        tagline: 'Medical Diagnostics Platform',
        heroDesc: 'Streamline diagnostic workflows and patient records for clinics operating in resource-constrained environments.',
        forWho: 'For clinics, laboratories, and healthcare providers in underserved regions.',
        problem: 'Paper-based records, lost test results, and no workflow standardization.',
        outcome: 'Faster turnaround, complete patient histories, and quality diagnostics.',
        features: [
          'Digital patient records',
          'Diagnostic workflow automation',
          'Result tracking and alerts',
          'Offline capability',
          'Compliance documentation',
          'Multi-facility support'
        ],
        cta: 'Learn More'
      }
    },
    industries: {
      badge: 'Industries',
      title: 'Industries',
      titleHighlight: 'We Serve',
      subtitle: 'Purpose-built software for operators who need results.',
      construction: {
        name: 'Construction',
        desc: 'Budget tracking, materials management, and accountability for contractors.',
        product: 'SuiviPro',
        link: '/products/suivipro'
      },
      healthcare: {
        name: 'Healthcare',
        desc: 'Diagnostic workflows and patient management for clinics.',
        product: 'PrimeToxDx',
        link: '/products/primetoxdx'
      },
      realEstate: {
        name: 'Real Estate',
        desc: 'Rental marketplace and property management for landlords.',
        product: 'HomeHaven',
        link: '/products/homehaven'
      }
    },
    team: {
      badge: 'Leadership',
      title: 'Meet the',
      titleHighlight: 'Team',
      subtitle: 'Engineers and operators building software that works.',
      joinBadge: 'Careers',
      joinTitle: 'Join Us',
      joinText: 'We\'re building products that matter. If you want to ship software that operators actually use, let\'s talk.',
      joinBtn: 'Get in Touch',
      members: {
        sebastien: {
          name: 'Sebastien Pambu',
          role: 'Co-Founder & CEO',
          bio: 'Operations leader focused on bringing world-class software to emerging markets.'
        },
        archy: {
          name: 'Archy Ntabona',
          role: 'Co-Founder & CTO',
          bio: 'Principal engineer building scalable, offline-first products for real-world conditions.'
        }
      }
    },
    contact: {
      badge: 'Contact',
      title: 'Let\'s',
      titleHighlight: 'Talk',
      subtitle: 'Book a demo, ask a question, or explore a partnership.',
      infoTitle: 'Get in Touch',
      infoText: 'Whether you\'re evaluating our products or want to discuss a custom implementation, we\'re here.',
      email: 'Email',
      locations: 'Locations',
      locationValue: 'USA & Democratic Republic of Congo',
      formTitle: 'Send a Message',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      nameError: 'Name is required.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@company.com',
      emailError: 'Please enter a valid email address.',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell us about your needs...',
      messageError: 'Message must be at least 10 characters long.',
      sendBtn: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successText: 'We\'ll get back to you within 24 hours.',
      sendAnother: 'Send Another',
      errorText: 'Something went wrong. Please try again.'
    },
    footer: {
      tagline: 'Industry software for emerging markets. Built for operators, measured by outcomes.',
      location: 'USA & Democratic Republic of Congo',
      navigate: 'Navigate',
      products: 'Products',
      industries: 'Industries',
      connect: 'Connect',
      emailUs: 'Email Us',
      copyright: 'FASS Services. All rights reserved.',
      builtWith: 'Built for operators. Measured by outcomes.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      products: 'Produits',
      industries: 'Industries',
      team: 'Équipe',
      contact: 'Réserver une Démo'
    },
    home: {
      badge: 'Logiciels Métiers',
      title1: 'Des Logiciels Qui',
      titleHighlight: 'Résolvent',
      title2: 'de Vrais Problèmes',
      subtitle: 'Des produits conçus pour la construction, la santé et l\'immobilier—adaptés aux marchés émergents, mesurés par les résultats.',
      cta1: 'Explorer les Produits',
      cta2: 'Réserver une Démo',
      card1: 'Construction',
      card2: 'Santé',
      card3: 'Immobilier',
      // Industry chooser section
      industryBadge: 'Votre Secteur',
      industryTitle: 'Choisissez Votre Industrie',
      industrySubtitle: 'Chaque produit est conçu pour des opérateurs qui veulent des résultats, pas des fonctionnalités',
      industryConstruction: 'Construction',
      industryConstructionDesc: 'Suivi budgétaire, gestion des matériaux et traçabilité pour les entrepreneurs et chefs de projet.',
      industryHealthcare: 'Santé',
      industryHealthcareDesc: 'Workflows de diagnostic et gestion des patients pour les cliniques et laboratoires.',
      industryRealEstate: 'Immobilier',
      industryRealEstateDesc: 'Plateforme de location connectant propriétaires et locataires, paiements inclus.',
      // Products section
      productsBadge: 'Nos Produits',
      productsTitle: 'Conçus pour les Opérateurs',
      productsSubtitle: 'Pas des outils génériques—des workflows productisés avec accompagnement, support et résultats mesurables',
      suiviproName: 'SuiviPro',
      suiviproTagline: 'Intelligence Budgétaire Construction',
      suiviproDesc: 'Suivez les matériaux, contrôlez les budgets et éliminez les pertes. Conçu pour les entrepreneurs gérant plusieurs chantiers.',
      homehavenName: 'HomeHaven',
      homehavenTagline: 'Plateforme de Location Longue Durée',
      homehavenDesc: 'Connectez propriétaires et locataires de qualité. Paiements, messagerie et gestion immobilière en une seule plateforme.',
      primetoxdxName: 'PrimeToxDx',
      primetoxdxTagline: 'Plateforme de Diagnostic Médical',
      primetoxdxDesc: 'Optimisez les workflows de diagnostic et les dossiers patients pour les cliniques en environnements à ressources limitées.',
      viewProduct: 'En Savoir Plus',
      comingSoon: 'Bientôt Disponible',
      // Why emerging markets section
      whyBadge: 'Différent',
      whyTitle: 'Conçu pour les Conditions Réelles',
      whySubtitle: 'Nos produits fonctionnent là où les autres échouent',
      whyOffline: 'Hors-Ligne d\'Abord',
      whyOfflineDesc: 'Fonctionnalité complète sans connexion permanente. Synchronisation quand disponible.',
      whyMobile: 'Mobile Natif',
      whyMobileDesc: 'Conçu pour mobile d\'abord, car c\'est ainsi que travaillent les opérateurs.',
      whyLocal: 'Workflows Locaux',
      whyLocalDesc: 'Construit autour du fonctionnement réel des entreprises, pas des suppositions de la Silicon Valley.',
      whyAudit: 'Traçabilité',
      whyAuditDesc: 'Chaque action enregistrée. Responsabilité totale pour les parties prenantes.',
      // Story section
      storyBadge: 'Impact',
      storyTitle: 'Mesuré par les Résultats',
      storySubtitle: 'Nous suivons le succès des opérateurs, pas les métriques de vanité',
      storyMetric1: 'Écart Budgétaire',
      storyMetric1Value: '< 5%',
      storyMetric1Desc: 'Précision budgétaire moyenne des utilisateurs SuiviPro',
      storyMetric2: 'Temps Économisé',
      storyMetric2Value: '10+ hrs',
      storyMetric2Desc: 'Par semaine sur le suivi des matériaux et les rapports',
      storyMetric3: 'Prêt pour l\'Audit',
      storyMetric3Value: '100%',
      storyMetric3Desc: 'Documentation complète pour chaque transaction',
      // CTA section
      ctaTitle1: 'Prêt à Voir des',
      ctaTitleHighlight: 'Résultats',
      ctaText: 'Réservez une démo et nous vous montrerons exactement comment nos produits s\'intègrent à votre workflow.',
      ctaBtn1: 'Réserver une Démo',
      ctaBtn2: 'Parler aux Ventes'
    },
    about: {
      badge: 'Notre Histoire',
      title: 'À Propos de',
      titleHighlight: 'FASS Services',
      subtitle: 'Nous créons des logiciels qui résolvent des problèmes métiers dans les marchés émergents.',
      journeyTitle: 'Par des',
      journeyHighlight: 'Opérateurs',
      journeyLead: 'FASS Services a été fondé par des ingénieurs qui ont vu à quel point les logiciels étaient inadaptés aux entreprises des marchés émergents.',
      journeyText1: 'Basés aux États-Unis avec des opérations en',
      journeyCountry: 'République Démocratique du Congo',
      journeyText2: ', nous créons des produits pour les conditions réelles de nos clients.',
      journeyText3: 'Nous ne vendons pas des heures. Nous livrons des workflows productisés avec implémentation, formation et résultats mesurables. Si notre logiciel n\'améliore pas vos opérations, nous avons échoué.',
      imagePlaceholder: 'Équipe FASS',
      mvBadge: 'Notre Approche',
      mvTitle: 'Comment Nous Travaillons',
      missionTitle: 'Des Produits, Pas des Projets',
      missionText: 'Nous construisons et maintenons des produits logiciels avec des roadmaps, du support et une amélioration continue—pas du développement sur mesure ponctuel.',
      visionTitle: 'Des Résultats, Pas des Fonctionnalités',
      visionText: 'Nous mesurons le succès par les résultats opérateurs: coûts réduits, temps gagné, erreurs éliminées. Si vous ne voyez pas de résultats, nous n\'avons pas fini.',
      focusBadge: 'Notre Avantage',
      focusTitle: 'Conçu pour les Marchés Émergents',
      focusSubtitle: 'Des contraintes pour lesquelles nous concevons, pas autour',
      focusIntro: 'La plupart des logiciels supposent une connexion fiable, une bande passante illimitée et des workflows occidentaux. Nous concevons pour l\'opposé:',
      focusOpportunities: 'les conditions réelles',
      focusIntro2: 'que nos clients affrontent quotidiennement.',
      focusDigital: 'Capacité Hors-Ligne',
      focusDigitalDesc: 'Fonctionnalité complète sans connexion permanente. Synchronisation quand possible.',
      focusEducation: 'Support d\'Implémentation',
      focusEducationDesc: 'Nous ne jetons pas le logiciel par-dessus le mur. Formation et support sont intégrés.',
      focusInfra: 'Paiements Locaux',
      focusInfraDesc: 'Mobile money, devises locales et méthodes de paiement qui fonctionnent vraiment.'
    },
    products: {
      badge: 'Produits',
      title: 'Nos',
      titleHighlight: 'Produits',
      subtitle: 'Logiciels métiers conçus pour les opérateurs des marchés émergents.',
      suivipro: {
        badge: 'Construction',
        name: 'SuiviPro',
        tagline: 'Intelligence Budgétaire & Matériaux Construction',
        heroDesc: 'Suivez chaque matériau, contrôlez chaque budget et éliminez les pertes sur tous vos chantiers.',
        forWho: 'Pour les entrepreneurs, chefs de projet et entreprises de construction gérant des projets multi-sites.',
        problem: 'Pertes de matériaux, dépassements budgétaires et zéro visibilité sur où va réellement l\'argent.',
        outcome: 'Budgets prévisibles, équipes responsables et documentation prête pour l\'audit.',
        features: [
          'Suivi des matériaux en temps réel',
          'Alertes d\'écart budgétaire',
          'Tableau de bord multi-sites',
          'Application mobile hors-ligne',
          'Traçabilité de chaque transaction',
          'Workflows inspecteurs'
        ],
        cta: 'Réserver une Démo'
      },
      homehaven: {
        badge: 'Immobilier',
        name: 'HomeHaven',
        tagline: 'Plateforme de Location Longue Durée',
        heroDesc: 'Connectez locataires de qualité et propriétaires vérifiés. Paiements, messagerie et gestion en une seule plateforme.',
        forWho: 'Pour les propriétaires, gestionnaires et locataires cherchant des locations longue durée.',
        problem: 'Marché locatif fragmenté, difficultés de recouvrement et pas de vérification des locataires.',
        outcome: 'Meilleur taux d\'occupation, paiements fiables et profils locataires vérifiés.',
        features: [
          'Annonces avec vérification',
          'Messagerie intégrée',
          'Paiements intégrés',
          'Screening locataires',
          'Gestion des baux',
          'Demandes de maintenance'
        ],
        cta: 'Rejoindre la Liste d\'Attente'
      },
      primetoxdx: {
        badge: 'Santé',
        name: 'PrimeToxDx',
        tagline: 'Plateforme de Diagnostic Médical',
        heroDesc: 'Optimisez les workflows de diagnostic et les dossiers patients pour les cliniques en environnements à ressources limitées.',
        forWho: 'Pour les cliniques, laboratoires et prestataires de santé dans les régions mal desservies.',
        problem: 'Dossiers papier, résultats de tests perdus et aucune standardisation des workflows.',
        outcome: 'Délais plus rapides, historiques patients complets et diagnostics de qualité.',
        features: [
          'Dossiers patients numériques',
          'Automatisation des workflows diagnostic',
          'Suivi des résultats et alertes',
          'Capacité hors-ligne',
          'Documentation de conformité',
          'Support multi-établissements'
        ],
        cta: 'En Savoir Plus'
      }
    },
    industries: {
      badge: 'Industries',
      title: 'Industries',
      titleHighlight: 'Que Nous Servons',
      subtitle: 'Logiciels sur mesure pour les opérateurs qui veulent des résultats.',
      construction: {
        name: 'Construction',
        desc: 'Suivi budgétaire, gestion des matériaux et responsabilité pour les entrepreneurs.',
        product: 'SuiviPro',
        link: '/products/suivipro'
      },
      healthcare: {
        name: 'Santé',
        desc: 'Workflows de diagnostic et gestion des patients pour les cliniques.',
        product: 'PrimeToxDx',
        link: '/products/primetoxdx'
      },
      realEstate: {
        name: 'Immobilier',
        desc: 'Plateforme de location et gestion immobilière pour les propriétaires.',
        product: 'HomeHaven',
        link: '/products/homehaven'
      }
    },
    team: {
      badge: 'Direction',
      title: 'Rencontrez',
      titleHighlight: 'l\'Équipe',
      subtitle: 'Ingénieurs et opérateurs créant des logiciels qui fonctionnent.',
      joinBadge: 'Carrières',
      joinTitle: 'Rejoignez-Nous',
      joinText: 'Nous créons des produits qui comptent. Si vous voulez livrer des logiciels que les opérateurs utilisent vraiment, parlons.',
      joinBtn: 'Nous Contacter',
      members: {
        sebastien: {
          name: 'Sebastien Pambu',
          role: 'Co-Fondateur & CEO',
          bio: 'Leader opérationnel focalisé sur l\'apport de logiciels de classe mondiale aux marchés émergents.'
        },
        archy: {
          name: 'Archy Ntabona',
          role: 'Co-Fondateur & CTO',
          bio: 'Ingénieur principal construisant des produits scalables et hors-ligne pour les conditions réelles.'
        }
      }
    },
    contact: {
      badge: 'Contact',
      title: 'Parlons',
      titleHighlight: 'Ensemble',
      subtitle: 'Réservez une démo, posez une question ou explorez un partenariat.',
      infoTitle: 'Contactez-Nous',
      infoText: 'Que vous évaluiez nos produits ou souhaitiez discuter d\'une implémentation personnalisée, nous sommes là.',
      email: 'Email',
      locations: 'Localisations',
      locationValue: 'États-Unis & République Démocratique du Congo',
      formTitle: 'Envoyer un Message',
      nameLabel: 'Nom Complet',
      namePlaceholder: 'Votre nom',
      nameError: 'Le nom est requis.',
      emailLabel: 'Adresse Email',
      emailPlaceholder: 'vous@entreprise.com',
      emailError: 'Veuillez entrer une adresse email valide.',
      messageLabel: 'Message',
      messagePlaceholder: 'Parlez-nous de vos besoins...',
      messageError: 'Le message doit comporter au moins 10 caractères.',
      sendBtn: 'Envoyer',
      sending: 'Envoi...',
      successTitle: 'Message Envoyé!',
      successText: 'Nous vous répondrons sous 24 heures.',
      sendAnother: 'Envoyer un Autre',
      errorText: 'Une erreur s\'est produite. Veuillez réessayer.'
    },
    footer: {
      tagline: 'Logiciels métiers pour marchés émergents. Conçus pour les opérateurs, mesurés par les résultats.',
      location: 'États-Unis & République Démocratique du Congo',
      navigate: 'Navigation',
      products: 'Produits',
      industries: 'Industries',
      connect: 'Contact',
      emailUs: 'Écrivez-nous',
      copyright: 'FASS Services. Tous droits réservés.',
      builtWith: 'Conçu pour les opérateurs. Mesuré par les résultats.'
    }
  }
};

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langSignal = signal<Language>(this.getInitialLang());
  
  currentLang = this.langSignal.asReadonly();
  t = computed(() => translations[this.langSignal()]);

  private getInitialLang(): Language {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('fass-lang') as Language;
      if (saved === 'en' || saved === 'fr') return saved;
    }
    return 'en';
  }

  setLang(lang: Language) {
    this.langSignal.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('fass-lang', lang);
    }
  }

  toggleLang() {
    const newLang = this.langSignal() === 'en' ? 'fr' : 'en';
    this.setLang(newLang);
  }
}
