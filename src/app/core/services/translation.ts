import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'fr';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Our Work',
      industries: 'Industries',
      team: 'Team',
      contact: 'Start a Project'
    },
    home: {
      // Hero - Software Studio positioning
      badge: 'Software Studio',
      title1: 'We Turn Ideas Into',
      titleHighlight: 'Working Software',
      title2: '',
      subtitle: 'Products we own. Apps we build for clients. Websites that convert. From consultation to delivery—we turn operational chaos into software that works.',
      cta1: 'See Our Work',
      cta2: 'Start a Project',
      card1: 'Products',
      card2: 'Apps',
      card3: 'Websites',
      // How We Work section
      processBadge: 'How We Work',
      processTitle: 'From Problem to Product',
      processSubtitle: 'A structured approach that delivers results, not surprises',
      processStep1Title: 'Consultation',
      processStep1Desc: 'We listen. You tell us the problem, the dream, or the pain point. We scope the work and set expectations.',
      processStep2Title: 'Demo & Design',
      processStep2Desc: 'We show you what\'s possible. Prototypes, mockups, and architecture conversations before a single line of production code.',
      processStep3Title: 'Architecture',
      processStep3Desc: 'Industry best practices. Scalable foundations. We design systems that grow with you, not against you.',
      processStep4Title: 'Delivery',
      processStep4Desc: 'Working software in your hands. Training, handoff, and support included. We\'re not done until you\'re operational.',
      // Our Products section (what we own)
      productsBadge: 'Our Products',
      productsTitle: 'Software We Built & Own',
      productsSubtitle: 'Live products serving operators in construction, healthcare, and real estate',
      suiviproName: 'SuiviPro',
      suiviproTagline: 'Construction Budget Intelligence',
      suiviproDesc: 'Track materials, control budgets, eliminate leakage. Live and serving contractors across DRC.',
      suiviproUrl: 'suivipro.app',
      homehavenName: 'HomeHaven',
      homehavenTagline: 'Long-Term Rental Marketplace',
      homehavenDesc: 'Connecting landlords with quality tenants. Payments, messaging, and property management.',
      homehavenUrl: 'Coming Soon',
      viewProduct: 'Visit Site',
      requestDemo: 'Request Demo',
      learnMore: 'Learn More',
      comingSoon: 'Coming Soon',
      live: 'Live',
      // Client Work section
      clientsBadge: 'Client Projects',
      clientsTitle: 'Software We Build for Others',
      clientsSubtitle: 'Websites, apps, and custom solutions—your problem, our engineering',
      clientPrimetoxdxName: 'PrimeToxDx',
      clientPrimetoxdxType: 'Web Application',
      clientPrimetoxdxDesc: 'Medical diagnostics platform with patient records and workflow automation for healthcare providers.',
      clientProject1Name: 'Buisson Consulting',
      clientProject1Type: 'Website',
      clientProject1Desc: 'Professional consulting firm website with modern design and lead generation.',
      clientProject1Status: 'In Development',
      clientCustomTitle: 'Your Project Here',
      clientCustomDesc: 'Have a problem that needs solving? An app idea? A business that needs a digital presence? Let\'s talk.',
      clientCustomCta: 'Start a Conversation',
      // What We Deliver section
      deliverBadge: 'What We Deliver',
      deliverTitle: 'From Concept to Launch',
      deliverSubtitle: 'Full-stack capabilities for any digital challenge',
      deliverWebsites: 'Websites',
      deliverWebsitesDesc: 'Marketing sites, portfolios, landing pages. Fast, responsive, SEO-optimized.',
      deliverWebApps: 'Web Applications',
      deliverWebAppsDesc: 'Dashboards, portals, SaaS products. Complex logic, beautiful interfaces.',
      deliverMobileApps: 'Mobile Apps',
      deliverMobileAppsDesc: 'iOS, Android, cross-platform. Offline-first when you need it.',
      deliverCustom: 'Custom Solutions',
      deliverCustomDesc: 'APIs, integrations, automation. Whatever your operations need.',
      // Why Us section
      whyBadge: 'Why FASS',
      whyTitle: 'Built for Real Conditions',
      whySubtitle: 'We design for constraints, not around them',
      whyOffline: 'Offline-First',
      whyOfflineDesc: 'Full functionality without constant internet. Sync when connected.',
      whyMobile: 'Mobile-Native',
      whyMobileDesc: 'Designed for phones first, because that\'s how operators work.',
      whyLocal: 'Local Expertise',
      whyLocalDesc: 'USA engineering + DRC operations. We understand emerging markets.',
      whyAudit: 'Production-Grade',
      whyAuditDesc: 'Not prototypes. Real software with testing, monitoring, and support.',
      // CTA section
      ctaTitle1: 'Ready to Build',
      ctaTitleHighlight: 'Something',
      ctaText: 'Whether it\'s your own product, an app for your business, or a website that converts—let\'s talk about what you need.',
      ctaBtn1: 'Start a Project',
      ctaBtn2: 'See Our Work'
    },
    about: {
      badge: 'Our Story',
      title: 'About',
      titleHighlight: 'FASS Services',
      subtitle: 'A software studio that builds products and solves client problems.',
      journeyTitle: 'Engineers Who',
      journeyHighlight: 'Ship',
      journeyLead: 'FASS Services is a software studio founded by engineers who build things that work.',
      journeyText1: 'Headquartered in the USA with operations in the',
      journeyCountry: 'Democratic Republic of Congo',
      journeyText2: ', we build software for operators who need results, not features.',
      journeyText3: 'Some of what we build, we own—products like SuiviPro that serve real customers. Some of what we build, we deliver to clients who come to us with a problem or a dream. Either way, we ship.',
      imagePlaceholder: 'FASS Team',
      locationTagline: 'Engineering from two continents',
      mvBadge: 'What We Do',
      mvTitle: 'Products + Client Work',
      missionTitle: 'Our Products',
      missionText: 'We build and maintain our own software products—SuiviPro and HomeHaven. These aren\'t side projects. They\'re live, serving real operators, and constantly improving.',
      visionTitle: 'Client Projects',
      visionText: 'We also build for clients. Websites, apps, custom software. You bring the problem, we bring the engineering. From consultation to delivery, we handle it.',
      focusBadge: 'Our Edge',
      focusTitle: 'Why Teams Choose Us',
      focusSubtitle: 'What makes FASS different',
      focusIntro: 'We\'re not a body shop selling hours. We\'re a studio that delivers',
      focusOpportunities: 'outcomes',
      focusIntro2: '—working software that solves your problem.',
      focusDigital: 'Full-Stack Capability',
      focusDigitalDesc: 'Frontend, backend, mobile, infrastructure. One team, complete solutions.',
      focusEducation: 'Emerging Market Expertise',
      focusEducationDesc: 'We build for offline, low-bandwidth, and local payment rails. Real conditions.',
      focusInfra: 'Delivery Focus',
      focusInfraDesc: 'Consultation, demo, architecture, delivery. A process that works, every time.'
    },
    products: {
      badge: 'Our Work',
      title: 'What We\'ve',
      titleHighlight: 'Built',
      subtitle: 'Products we own and projects we\'ve delivered.',
      suivipro: {
        badge: 'Construction',
        name: 'SuiviPro',
        tagline: 'Construction Budget & Materials Intelligence',
        heroDesc: 'Track every material, control every budget, and eliminate leakage across all your construction sites.',
        forWho: 'For contractors, project managers, and construction firms managing multi-site projects.',
        problem: 'Material leakage, budget overruns, and zero visibility into where money actually goes.',
        outcome: 'Predictable budgets, accountable teams, and audit-ready documentation.',
        url: 'suivipro.app',
        features: [
          'Real-time materials tracking',
          'Budget variance alerts',
          'Multi-site dashboard',
          'Offline-first mobile app',
          'Audit trail for every transaction',
          'Inspector workflows'
        ],
        cta: 'Visit SuiviPro'
      },
      homehaven: {
        badge: 'Real Estate',
        name: 'HomeHaven',
        tagline: 'Long-Term Rental Marketplace',
        heroDesc: 'Connect quality tenants with verified landlords. Payments, messaging, and property management in one platform.',
        forWho: 'For landlords, property managers, and tenants seeking long-term rentals.',
        problem: 'Fragmented rental market, payment collection challenges, and no tenant verification.',
        outcome: 'Higher occupancy, reliable payments, and verified tenant profiles.',
        url: '',
        features: [
          'Property listings with verification',
          'In-app messaging',
          'Integrated payments',
          'Tenant screening',
          'Lease management',
          'Maintenance requests'
        ],
        cta: 'Coming Soon'
      },
    },
    industries: {
      badge: 'Industries',
      title: 'Industries',
      titleHighlight: 'We Serve',
      subtitle: 'Deep expertise in construction, healthcare, and real estate.',
      construction: {
        name: 'Construction',
        desc: 'Budget tracking, materials management, and accountability for contractors.',
        product: 'SuiviPro',
        link: '/products/suivipro'
      },
      healthcare: {
        name: 'Healthcare',
        desc: 'Diagnostic workflows and patient management for clinics.',
        product: 'PrimeToxDx (Client)',
        link: '/contact'
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
      subtitle: 'Engineers and operators who ship software that works.',
      joinBadge: 'Work With Us',
      joinTitle: 'Start a Project',
      joinText: 'Have a problem that needs solving? An app idea? A business that needs software? Let\'s talk about what you need.',
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
      badge: 'Start a Project',
      title: 'Let\'s Build',
      titleHighlight: 'Together',
      subtitle: 'Tell us about your project, problem, or idea.',
      infoTitle: 'Get in Touch',
      infoText: 'Whether you have a specific project in mind or just want to explore what\'s possible—we\'re here to help.',
      email: 'Email',
      locations: 'Locations',
      locationValue: 'USA & Democratic Republic of Congo',
      formTitle: 'Tell Us About Your Project',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      nameError: 'Name is required.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@company.com',
      emailError: 'Please enter a valid email address.',
      messageLabel: 'Your Project',
      messagePlaceholder: 'Tell us about your problem, idea, or project...',
      messageError: 'Message must be at least 10 characters long.',
      sendBtn: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successText: 'We\'ll get back to you within 24 hours.',
      sendAnother: 'Send Another',
      errorText: 'Something went wrong. Please try again.'
    },
    footer: {
      tagline: 'Software studio building products and solving client problems. USA + DRC.',
      location: 'USA & Democratic Republic of Congo',
      navigate: 'Navigate',
      products: 'Our Work',
      industries: 'Industries',
      connect: 'Connect',
      emailUs: 'Email Us',
      copyright: 'FASS Services. All rights reserved.',
      builtWith: 'Products we own. Software we build for you.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      products: 'Nos Réalisations',
      industries: 'Industries',
      team: 'Équipe',
      contact: 'Démarrer un Projet'
    },
    home: {
      // Hero - Software Studio positioning
      badge: 'Studio Logiciel',
      title1: 'Nous Transformons les Idées en',
      titleHighlight: 'Logiciels Fonctionnels',
      title2: '',
      subtitle: 'Produits que nous possédons. Applications que nous créons pour nos clients. Sites web qui convertissent. De la consultation à la livraison—nous transformons le chaos opérationnel en logiciel qui fonctionne.',
      cta1: 'Voir Nos Réalisations',
      cta2: 'Démarrer un Projet',
      card1: 'Produits',
      card2: 'Applications',
      card3: 'Sites Web',
      // How We Work section
      processBadge: 'Notre Méthode',
      processTitle: 'Du Problème au Produit',
      processSubtitle: 'Une approche structurée qui livre des résultats, pas des surprises',
      processStep1Title: 'Consultation',
      processStep1Desc: 'Nous écoutons. Vous nous parlez du problème, du rêve ou du point de douleur. Nous cadrons le travail et fixons les attentes.',
      processStep2Title: 'Démo & Design',
      processStep2Desc: 'Nous vous montrons ce qui est possible. Prototypes, maquettes et conversations d\'architecture avant une seule ligne de code de production.',
      processStep3Title: 'Architecture',
      processStep3Desc: 'Meilleures pratiques de l\'industrie. Fondations scalables. Nous concevons des systèmes qui grandissent avec vous, pas contre vous.',
      processStep4Title: 'Livraison',
      processStep4Desc: 'Logiciel fonctionnel entre vos mains. Formation, transfert et support inclus. Nous n\'avons pas fini tant que vous n\'êtes pas opérationnel.',
      // Our Products section
      productsBadge: 'Nos Produits',
      productsTitle: 'Logiciels Que Nous Avons Créés',
      productsSubtitle: 'Produits en production servant des opérateurs dans la construction, la santé et l\'immobilier',
      suiviproName: 'SuiviPro',
      suiviproTagline: 'Intelligence Budgétaire Construction',
      suiviproDesc: 'Suivez les matériaux, contrôlez les budgets, éliminez les pertes. En production et servant des entrepreneurs en RDC.',
      suiviproUrl: 'suivipro.app',
      homehavenName: 'HomeHaven',
      homehavenTagline: 'Plateforme de Location Longue Durée',
      homehavenDesc: 'Connecter propriétaires et locataires de qualité. Paiements, messagerie et gestion immobilière.',
      homehavenUrl: 'Bientôt Disponible',
      viewProduct: 'Visiter le Site',
      requestDemo: 'Demander une Démo',
      learnMore: 'En Savoir Plus',
      comingSoon: 'Bientôt',
      live: 'En Ligne',
      // Client Work section
      clientsBadge: 'Projets Clients',
      clientsTitle: 'Logiciels Que Nous Créons pour les Autres',
      clientsSubtitle: 'Sites web, applications et solutions sur mesure—votre problème, notre ingénierie',
      clientPrimetoxdxName: 'PrimeToxDx',
      clientPrimetoxdxType: 'Application Web',
      clientPrimetoxdxDesc: 'Plateforme de diagnostic médical avec dossiers patients et automatisation des workflows pour les prestataires de santé.',
      clientProject1Name: 'Buisson Consulting',
      clientProject1Type: 'Site Web',
      clientProject1Desc: 'Site web de cabinet de conseil professionnel avec design moderne et génération de leads.',
      clientProject1Status: 'En Développement',
      clientCustomTitle: 'Votre Projet Ici',
      clientCustomDesc: 'Vous avez un problème à résoudre? Une idée d\'application? Une entreprise qui a besoin d\'une présence digitale? Parlons-en.',
      clientCustomCta: 'Démarrer une Conversation',
      // What We Deliver section
      deliverBadge: 'Ce Que Nous Livrons',
      deliverTitle: 'Du Concept au Lancement',
      deliverSubtitle: 'Capacités full-stack pour tout défi digital',
      deliverWebsites: 'Sites Web',
      deliverWebsitesDesc: 'Sites marketing, portfolios, landing pages. Rapides, responsives, optimisés SEO.',
      deliverWebApps: 'Applications Web',
      deliverWebAppsDesc: 'Tableaux de bord, portails, produits SaaS. Logique complexe, interfaces belles.',
      deliverMobileApps: 'Applications Mobiles',
      deliverMobileAppsDesc: 'iOS, Android, cross-platform. Hors-ligne d\'abord quand nécessaire.',
      deliverCustom: 'Solutions Sur Mesure',
      deliverCustomDesc: 'APIs, intégrations, automatisation. Tout ce dont vos opérations ont besoin.',
      // Why Us section
      whyBadge: 'Pourquoi FASS',
      whyTitle: 'Conçu pour les Conditions Réelles',
      whySubtitle: 'Nous concevons pour les contraintes, pas autour',
      whyOffline: 'Hors-Ligne d\'Abord',
      whyOfflineDesc: 'Fonctionnalité complète sans internet constant. Sync quand connecté.',
      whyMobile: 'Mobile Natif',
      whyMobileDesc: 'Conçu pour téléphone d\'abord, car c\'est ainsi que travaillent les opérateurs.',
      whyLocal: 'Expertise Locale',
      whyLocalDesc: 'Ingénierie USA + opérations RDC. Nous comprenons les marchés émergents.',
      whyAudit: 'Qualité Production',
      whyAuditDesc: 'Pas des prototypes. Vrais logiciels avec tests, monitoring et support.',
      // CTA section
      ctaTitle1: 'Prêt à Construire',
      ctaTitleHighlight: 'Quelque Chose',
      ctaText: 'Que ce soit votre propre produit, une app pour votre entreprise, ou un site web qui convertit—parlons de ce dont vous avez besoin.',
      ctaBtn1: 'Démarrer un Projet',
      ctaBtn2: 'Voir Nos Réalisations'
    },
    about: {
      badge: 'Notre Histoire',
      title: 'À Propos de',
      titleHighlight: 'FASS Services',
      subtitle: 'Un studio logiciel qui crée des produits et résout les problèmes des clients.',
      journeyTitle: 'Des Ingénieurs Qui',
      journeyHighlight: 'Livrent',
      journeyLead: 'FASS Services est un studio logiciel fondé par des ingénieurs qui créent des choses qui fonctionnent.',
      journeyText1: 'Basés aux États-Unis avec des opérations en',
      journeyCountry: 'République Démocratique du Congo',
      journeyText2: ', nous créons des logiciels pour des opérateurs qui veulent des résultats, pas des fonctionnalités.',
      journeyText3: 'Une partie de ce que nous créons, nous le possédons—des produits comme SuiviPro qui servent de vrais clients. Une autre partie, nous la livrons à des clients qui viennent à nous avec un problème ou un rêve. Dans tous les cas, nous livrons.',
      imagePlaceholder: 'Équipe FASS',
      locationTagline: 'Ingénierie de deux continents',
      mvBadge: 'Ce Que Nous Faisons',
      mvTitle: 'Produits + Travail Client',
      missionTitle: 'Nos Produits',
      missionText: 'Nous créons et maintenons nos propres produits logiciels—SuiviPro et HomeHaven. Ce ne sont pas des projets secondaires. Ils sont en production, servent de vrais opérateurs, et s\'améliorent constamment.',
      visionTitle: 'Projets Clients',
      visionText: 'Nous créons aussi pour les clients. Sites web, applications, logiciels sur mesure. Vous apportez le problème, nous apportons l\'ingénierie. De la consultation à la livraison, nous gérons.',
      focusBadge: 'Notre Avantage',
      focusTitle: 'Pourquoi les Équipes Nous Choisissent',
      focusSubtitle: 'Ce qui rend FASS différent',
      focusIntro: 'Nous ne sommes pas une agence qui vend des heures. Nous sommes un studio qui livre des',
      focusOpportunities: 'résultats',
      focusIntro2: '—des logiciels fonctionnels qui résolvent votre problème.',
      focusDigital: 'Capacité Full-Stack',
      focusDigitalDesc: 'Frontend, backend, mobile, infrastructure. Une équipe, solutions complètes.',
      focusEducation: 'Expertise Marchés Émergents',
      focusEducationDesc: 'Nous créons pour le hors-ligne, faible bande passante, et paiements locaux. Conditions réelles.',
      focusInfra: 'Focus Livraison',
      focusInfraDesc: 'Consultation, démo, architecture, livraison. Un processus qui fonctionne, à chaque fois.'
    },
    products: {
      badge: 'Nos Réalisations',
      title: 'Ce Que Nous Avons',
      titleHighlight: 'Construit',
      subtitle: 'Produits que nous possédons et projets que nous avons livrés.',
      suivipro: {
        badge: 'Construction',
        name: 'SuiviPro',
        tagline: 'Intelligence Budgétaire & Matériaux Construction',
        heroDesc: 'Suivez chaque matériau, contrôlez chaque budget et éliminez les pertes sur tous vos chantiers.',
        forWho: 'Pour les entrepreneurs, chefs de projet et entreprises de construction gérant des projets multi-sites.',
        problem: 'Pertes de matériaux, dépassements budgétaires et zéro visibilité sur où va l\'argent.',
        outcome: 'Budgets prévisibles, équipes responsables et documentation prête pour l\'audit.',
        url: 'suivipro.app',
        features: [
          'Suivi des matériaux en temps réel',
          'Alertes d\'écart budgétaire',
          'Tableau de bord multi-sites',
          'Application mobile hors-ligne',
          'Traçabilité de chaque transaction',
          'Workflows inspecteurs'
        ],
        cta: 'Visiter SuiviPro'
      },
      homehaven: {
        badge: 'Immobilier',
        name: 'HomeHaven',
        tagline: 'Plateforme de Location Longue Durée',
        heroDesc: 'Connectez locataires de qualité et propriétaires vérifiés. Paiements, messagerie et gestion en une seule plateforme.',
        forWho: 'Pour les propriétaires, gestionnaires et locataires cherchant des locations longue durée.',
        problem: 'Marché locatif fragmenté, difficultés de recouvrement et pas de vérification des locataires.',
        outcome: 'Meilleur taux d\'occupation, paiements fiables et profils locataires vérifiés.',
        url: '',
        features: [
          'Annonces avec vérification',
          'Messagerie intégrée',
          'Paiements intégrés',
          'Screening locataires',
          'Gestion des baux',
          'Demandes de maintenance'
        ],
        cta: 'Bientôt Disponible'
      },
    },
    industries: {
      badge: 'Industries',
      title: 'Industries',
      titleHighlight: 'Que Nous Servons',
      subtitle: 'Expertise approfondie en construction, santé et immobilier.',
      construction: {
        name: 'Construction',
        desc: 'Suivi budgétaire, gestion des matériaux et responsabilité pour les entrepreneurs.',
        product: 'SuiviPro',
        link: '/products/suivipro'
      },
      healthcare: {
        name: 'Santé',
        desc: 'Workflows de diagnostic et gestion des patients pour les cliniques.',
        product: 'PrimeToxDx (Client)',
        link: '/contact'
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
      subtitle: 'Ingénieurs et opérateurs qui livrent des logiciels qui fonctionnent.',
      joinBadge: 'Travaillez Avec Nous',
      joinTitle: 'Démarrer un Projet',
      joinText: 'Vous avez un problème à résoudre? Une idée d\'application? Une entreprise qui a besoin de logiciel? Parlons de ce dont vous avez besoin.',
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
          bio: 'Ingénieur principal créant des produits scalables et hors-ligne pour les conditions réelles.'
        }
      }
    },
    contact: {
      badge: 'Démarrer un Projet',
      title: 'Construisons',
      titleHighlight: 'Ensemble',
      subtitle: 'Parlez-nous de votre projet, problème ou idée.',
      infoTitle: 'Contactez-Nous',
      infoText: 'Que vous ayez un projet spécifique en tête ou que vous vouliez simplement explorer ce qui est possible—nous sommes là pour aider.',
      email: 'Email',
      locations: 'Localisations',
      locationValue: 'États-Unis & République Démocratique du Congo',
      formTitle: 'Parlez-Nous de Votre Projet',
      nameLabel: 'Nom Complet',
      namePlaceholder: 'Votre nom',
      nameError: 'Le nom est requis.',
      emailLabel: 'Adresse Email',
      emailPlaceholder: 'vous@entreprise.com',
      emailError: 'Veuillez entrer une adresse email valide.',
      messageLabel: 'Votre Projet',
      messagePlaceholder: 'Parlez-nous de votre problème, idée ou projet...',
      messageError: 'Le message doit comporter au moins 10 caractères.',
      sendBtn: 'Envoyer',
      sending: 'Envoi...',
      successTitle: 'Message Envoyé!',
      successText: 'Nous vous répondrons sous 24 heures.',
      sendAnother: 'Envoyer un Autre',
      errorText: 'Une erreur s\'est produite. Veuillez réessayer.'
    },
    footer: {
      tagline: 'Studio logiciel créant des produits et résolvant les problèmes des clients. USA + RDC.',
      location: 'États-Unis & République Démocratique du Congo',
      navigate: 'Navigation',
      products: 'Nos Réalisations',
      industries: 'Industries',
      connect: 'Contact',
      emailUs: 'Écrivez-nous',
      copyright: 'FASS Services. Tous droits réservés.',
      builtWith: 'Produits que nous possédons. Logiciels que nous créons pour vous.'
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
