import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'fr';

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      initiatives: 'Initiatives',
      team: 'Team',
      contact: 'Get in Touch'
    },
    home: {
      badge: 'Technology for Impact',
      title1: 'Building',
      titleHighlight: "Tomorrow's",
      title2: 'Solutions Today',
      subtitle: 'FASS Services delivers innovative technology solutions that empower communities and transform businesses across Africa.',
      cta1: 'Explore Initiatives',
      cta2: 'Learn More',
      card1: 'Digital Transformation',
      card2: 'Global Impact',
      card3: 'Community First',
      aboutBadge: 'About Us',
      aboutTitle: 'Technology With Purpose',
      aboutSubtitle: 'Empowering communities through innovative solutions built for real-world impact',
      aboutLead: 'FASS Services is a forward-thinking technology company headquartered in the USA with a primary focus on the',
      aboutCountry: 'Democratic Republic of Congo',
      aboutText: "We believe technology should be accessible, impactful, and transformative. Our mission is to bridge the digital divide by delivering world-class solutions tailored to local needs.",
      statsCountries: 'Countries',
      statsProjects: 'Projects',
      statsCommitted: 'Committed',
      missionTitle: 'Our Mission',
      missionText: 'Delivering accessible, reliable, and innovative technology solutions that foster sustainable development.',
      fullStory: 'Our Full Story',
      initBadge: 'What We Do',
      initTitle: 'Our Initiatives',
      initSubtitle: 'Strategic programs designed to create lasting change',
      fassTech: 'FASS Tech',
      fassAcademy: 'FASS Academy',
      fassHealth: 'FASS Health',
      fassTechDesc: 'Cutting-edge software development, IT consulting, and digital transformation services tailored for emerging markets.',
      fassAcademyDesc: 'Training the next generation of African developers and tech professionals through structured educational programs.',
      fassHealthDesc: 'Leveraging technology to improve healthcare delivery and patient management in underserved regions.',
      learnMore: 'Learn More',
      comingSoon: 'Coming Soon',
      ctaTitle1: 'Ready to Build Something',
      ctaTitleHighlight: 'Meaningful',
      ctaText: 'Partner with FASS Services and leverage technology for sustainable growth and community impact.',
      ctaBtn1: 'Start a Conversation',
      ctaBtn2: 'Meet the Team'
    },
    about: {
      badge: 'Our Story',
      title: 'About',
      titleHighlight: 'FASS Services',
      subtitle: 'Innovating for a better tomorrow through technology that matters.',
      journeyTitle: 'Our',
      journeyHighlight: 'Journey',
      journeyLead: 'FASS Services was founded with a clear vision: to leverage the power of technology to solve everyday problems.',
      journeyText1: 'Based in the USA, our heart and primary focus lie in the',
      journeyCountry: 'Democratic Republic of Congo',
      journeyText2: ', a nation teeming with potential and opportunity.',
      journeyText3: 'We believe that technology is the great equalizer. By bringing world-class technological solutions to developing markets, we can accelerate growth, improve efficiency, and enhance the quality of life for millions.',
      imagePlaceholder: 'FASS Headquarters',
      mvBadge: 'Our Purpose',
      mvTitle: 'Mission & Vision',
      missionTitle: 'Our Mission',
      missionText: 'To provide accessible, reliable, and innovative technological solutions that address the unique challenges of our communities, fostering sustainable development and economic growth.',
      visionTitle: 'Our Vision',
      visionText: 'To be the leading technology partner in the Democratic Republic of Congo and beyond, known for our integrity, excellence, and transformative impact on society.',
      focusBadge: 'Our Focus',
      focusTitle: 'Why the DRC?',
      focusSubtitle: 'A nation of immense potential awaiting transformation',
      focusIntro: 'The Democratic Republic of Congo is a country of immense resources and resilient people. While it faces significant infrastructural and technological gaps, FASS Services sees these not just as challenges, but as',
      focusOpportunities: 'opportunities',
      focusIntro2: 'to make a real difference.',
      focusDigital: 'Digital Transformation',
      focusDigitalDesc: 'Modernizing businesses and government services for the digital age.',
      focusEducation: 'Education',
      focusEducationDesc: 'Providing tools for remote learning and professional skill development.',
      focusInfra: 'Infrastructure',
      focusInfraDesc: 'Smart solutions for urban planning and resource management.'
    },
    initiatives: {
      badge: 'What We Do',
      title: 'Our',
      titleHighlight: 'Initiatives',
      subtitle: 'Building the future, one project at a time.',
      flagshipBadge: 'Flagship Initiative',
      fassTechTitle: 'FASS Tech',
      fassTechSubtitle: 'Technology for Development',
      fassTechLead: 'is our flagship initiative, dedicated to providing top-tier technological solutions for emerging markets.',
      fassTechText: 'We understand that in a rapidly evolving world, staying ahead means embracing digital transformation. FASS Tech operates with a "local context, global standard" approach.',
      offering1: 'Custom Software Development',
      offering2: 'Web & Mobile Development',
      offering3: 'IT Consultancy & Strategy',
      offering4: 'Digital Infrastructure',
      active: 'Active',
      cardText: 'Building solutions relevant to local challenges while adhering to international best practices.',
      projects: 'Projects',
      markets: 'Markets',
      futureBadge: 'Coming Soon',
      futureTitle: 'Future Initiatives',
      futureSubtitle: 'Expanding our impact across sectors',
      academyTitle: 'FASS Academy',
      academyDesc: 'Training the next generation of Congolese developers and IT professionals through structured educational programs.',
      healthTitle: 'FASS Health',
      healthDesc: 'Leveraging technology to improve healthcare delivery and patient record management in underserved areas.',
      agriTitle: 'FASS Agri',
      agriDesc: 'Smart farming solutions to increase yield and supply chain efficiency for local farmers and cooperatives.',
      getNotified: 'Get Notified'
    },
    team: {
      badge: 'The People',
      title: 'Meet Our',
      titleHighlight: 'Team',
      subtitle: 'The minds behind FASS Services, united by a shared vision.',
      joinBadge: 'Opportunities',
      joinTitle: 'Join Our Mission',
      joinText: 'We are always looking for talented individuals who share our passion for technology and community development.',
      joinBtn: 'Get in Touch',
      members: {
        sebastien: {
          name: 'Sebastien Pambu',
          role: 'Co-Founder & Operations',
          bio: 'Visionary leader with a passion for technology and community development.'
        },
        archy: {
          name: 'Archy Ntabona',
          role: 'Co-Founder & Lead Engineer',
          bio: 'Strategic thinker ensuring operational excellence and project success.'
        }
      }
    },
    contact: {
      badge: 'Get in Touch',
      title: 'Contact',
      titleHighlight: 'Us',
      subtitle: "Have a question or want to collaborate? We'd love to hear from you.",
      infoTitle: "Let's Connect",
      infoText: "Have questions about our initiatives or want to partner with us? Reach out and let's start a conversation.",
      email: 'Email',
      locations: 'Locations',
      locationValue: 'USA & Democratic Republic of Congo',
      formTitle: 'Send a Message',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      nameError: 'Name is required.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      emailError: 'Please enter a valid email address.',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help you?',
      messageError: 'Message must be at least 10 characters long.',
      sendBtn: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Sent!',
      successText: "Thank you for reaching out. We'll get back to you soon.",
      sendAnother: 'Send Another',
      errorText: 'Something went wrong. Please try again.'
    },
    footer: {
      tagline: 'Providing technological solutions to everyday problems. Empowering communities through innovation.',
      location: 'USA & Democratic Republic of Congo',
      navigate: 'Navigate',
      connect: 'Connect',
      emailUs: 'Email Us',
      copyright: 'FASS Services. All rights reserved.',
      builtWith: 'Built with purpose. Driven by impact.'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      initiatives: 'Initiatives',
      team: 'Équipe',
      contact: 'Contactez-nous'
    },
    home: {
      badge: 'Technologie pour l\'Impact',
      title1: 'Construire les',
      titleHighlight: 'Solutions',
      title2: 'de Demain',
      subtitle: 'FASS Services offre des solutions technologiques innovantes qui autonomisent les communautés et transforment les entreprises à travers l\'Afrique.',
      cta1: 'Explorer nos Initiatives',
      cta2: 'En Savoir Plus',
      card1: 'Transformation Digitale',
      card2: 'Impact Global',
      card3: 'Communauté d\'Abord',
      aboutBadge: 'À Propos',
      aboutTitle: 'Technologie avec un But',
      aboutSubtitle: 'Autonomiser les communautés grâce à des solutions innovantes conçues pour un impact réel',
      aboutLead: 'FASS Services est une entreprise technologique visionnaire basée aux États-Unis avec un focus principal sur la',
      aboutCountry: 'République Démocratique du Congo',
      aboutText: 'Nous croyons que la technologie doit être accessible, impactante et transformatrice. Notre mission est de combler le fossé numérique en offrant des solutions de classe mondiale adaptées aux besoins locaux.',
      statsCountries: 'Pays',
      statsProjects: 'Projets',
      statsCommitted: 'Engagés',
      missionTitle: 'Notre Mission',
      missionText: 'Offrir des solutions technologiques accessibles, fiables et innovantes qui favorisent le développement durable.',
      fullStory: 'Notre Histoire Complète',
      initBadge: 'Ce que nous faisons',
      initTitle: 'Nos Initiatives',
      initSubtitle: 'Des programmes stratégiques conçus pour créer un changement durable',
      fassTech: 'FASS Tech',
      fassAcademy: 'FASS Academy',
      fassHealth: 'FASS Health',
      fassTechDesc: 'Développement logiciel de pointe, conseil IT et services de transformation digitale adaptés aux marchés émergents.',
      fassAcademyDesc: 'Former la prochaine génération de développeurs et professionnels IT africains à travers des programmes éducatifs structurés.',
      fassHealthDesc: 'Exploiter la technologie pour améliorer la prestation de soins de santé et la gestion des patients dans les régions mal desservies.',
      learnMore: 'En Savoir Plus',
      comingSoon: 'Bientôt Disponible',
      ctaTitle1: 'Prêt à Construire Quelque Chose de',
      ctaTitleHighlight: 'Significatif',
      ctaText: 'Associez-vous à FASS Services et exploitez la technologie pour une croissance durable et un impact communautaire.',
      ctaBtn1: 'Démarrer une Conversation',
      ctaBtn2: 'Rencontrer l\'Équipe'
    },
    about: {
      badge: 'Notre Histoire',
      title: 'À Propos de',
      titleHighlight: 'FASS Services',
      subtitle: 'Innover pour un meilleur avenir grâce à une technologie qui compte.',
      journeyTitle: 'Notre',
      journeyHighlight: 'Parcours',
      journeyLead: 'FASS Services a été fondé avec une vision claire: exploiter le pouvoir de la technologie pour résoudre les problèmes quotidiens.',
      journeyText1: 'Basés aux États-Unis, notre cœur et notre focus principal se trouvent en',
      journeyCountry: 'République Démocratique du Congo',
      journeyText2: ', une nation regorgeant de potentiel et d\'opportunités.',
      journeyText3: 'Nous croyons que la technologie est le grand égalisateur. En apportant des solutions technologiques de classe mondiale aux marchés en développement, nous pouvons accélérer la croissance, améliorer l\'efficacité et améliorer la qualité de vie de millions de personnes.',
      imagePlaceholder: 'Siège de FASS',
      mvBadge: 'Notre But',
      mvTitle: 'Mission & Vision',
      missionTitle: 'Notre Mission',
      missionText: 'Fournir des solutions technologiques accessibles, fiables et innovantes qui répondent aux défis uniques de nos communautés, favorisant le développement durable et la croissance économique.',
      visionTitle: 'Notre Vision',
      visionText: 'Être le partenaire technologique de premier plan en République Démocratique du Congo et au-delà, reconnu pour notre intégrité, notre excellence et notre impact transformateur sur la société.',
      focusBadge: 'Notre Focus',
      focusTitle: 'Pourquoi la RDC?',
      focusSubtitle: 'Une nation au potentiel immense en attente de transformation',
      focusIntro: 'La République Démocratique du Congo est un pays aux ressources immenses et aux peuples résilients. Bien qu\'elle fasse face à d\'importants défis infrastructurels et technologiques, FASS Services voit ceux-ci non seulement comme des défis, mais comme des',
      focusOpportunities: 'opportunités',
      focusIntro2: 'de faire une vraie différence.',
      focusDigital: 'Transformation Digitale',
      focusDigitalDesc: 'Moderniser les entreprises et les services gouvernementaux pour l\'ère numérique.',
      focusEducation: 'Éducation',
      focusEducationDesc: 'Fournir des outils pour l\'apprentissage à distance et le développement professionnel.',
      focusInfra: 'Infrastructure',
      focusInfraDesc: 'Solutions intelligentes pour la planification urbaine et la gestion des ressources.'
    },
    initiatives: {
      badge: 'Ce que nous faisons',
      title: 'Nos',
      titleHighlight: 'Initiatives',
      subtitle: 'Construire l\'avenir, un projet à la fois.',
      flagshipBadge: 'Initiative Phare',
      fassTechTitle: 'FASS Tech',
      fassTechSubtitle: 'Technologie pour le Développement',
      fassTechLead: 'est notre initiative phare, dédiée à fournir des solutions technologiques de premier plan pour les marchés émergents.',
      fassTechText: 'Nous comprenons que dans un monde en évolution rapide, rester en avance signifie adopter la transformation digitale. FASS Tech opère avec une approche "contexte local, standard global".',
      offering1: 'Développement Logiciel Sur Mesure',
      offering2: 'Développement Web & Mobile',
      offering3: 'Conseil IT & Stratégie',
      offering4: 'Infrastructure Digitale',
      active: 'Actif',
      cardText: 'Construire des solutions pertinentes aux défis locaux tout en respectant les meilleures pratiques internationales.',
      projects: 'Projets',
      markets: 'Marchés',
      futureBadge: 'Bientôt Disponible',
      futureTitle: 'Initiatives Futures',
      futureSubtitle: 'Étendre notre impact à travers les secteurs',
      academyTitle: 'FASS Academy',
      academyDesc: 'Former la prochaine génération de développeurs et professionnels IT congolais à travers des programmes éducatifs structurés.',
      healthTitle: 'FASS Health',
      healthDesc: 'Exploiter la technologie pour améliorer la prestation de soins de santé et la gestion des dossiers patients dans les zones mal desservies.',
      agriTitle: 'FASS Agri',
      agriDesc: 'Solutions agricoles intelligentes pour augmenter le rendement et l\'efficacité de la chaîne d\'approvisionnement pour les agriculteurs locaux.',
      getNotified: 'Être Notifié'
    },
    team: {
      badge: 'Les Personnes',
      title: 'Rencontrez Notre',
      titleHighlight: 'Équipe',
      subtitle: 'Les esprits derrière FASS Services, unis par une vision commune.',
      joinBadge: 'Opportunités',
      joinTitle: 'Rejoignez Notre Mission',
      joinText: 'Nous recherchons toujours des personnes talentueuses qui partagent notre passion pour la technologie et le développement communautaire.',
      joinBtn: 'Contactez-nous',
      members: {
        sebastien: {
          name: 'Sebastien Pambu',
          role: 'Co-Fondateur & Opérations',
          bio: 'Leader visionnaire passionné par la technologie et le développement communautaire.'
        },
        archy: {
          name: 'Archy Ntabona',
          role: 'Co-Fondateur & Ingénieur Principal',
          bio: 'Penseur stratégique assurant l\'excellence opérationnelle et le succès des projets.'
        }
      }
    },
    contact: {
      badge: 'Contactez-nous',
      title: 'Nous',
      titleHighlight: 'Contacter',
      subtitle: 'Une question ou envie de collaborer? Nous serions ravis de vous entendre.',
      infoTitle: 'Connectons-nous',
      infoText: 'Des questions sur nos initiatives ou envie de vous associer avec nous? Contactez-nous et commençons une conversation.',
      email: 'Email',
      locations: 'Localisations',
      locationValue: 'États-Unis & République Démocratique du Congo',
      formTitle: 'Envoyer un Message',
      nameLabel: 'Nom Complet',
      namePlaceholder: 'Votre nom',
      nameError: 'Le nom est requis.',
      emailLabel: 'Adresse Email',
      emailPlaceholder: 'vous@exemple.com',
      emailError: 'Veuillez entrer une adresse email valide.',
      messageLabel: 'Message',
      messagePlaceholder: 'Comment pouvons-nous vous aider?',
      messageError: 'Le message doit comporter au moins 10 caractères.',
      sendBtn: 'Envoyer le Message',
      sending: 'Envoi en cours...',
      successTitle: 'Message Envoyé!',
      successText: 'Merci de nous avoir contactés. Nous vous répondrons bientôt.',
      sendAnother: 'Envoyer un Autre',
      errorText: 'Une erreur s\'est produite. Veuillez réessayer.'
    },
    footer: {
      tagline: 'Fournir des solutions technologiques aux problèmes quotidiens. Autonomiser les communautés par l\'innovation.',
      location: 'États-Unis & République Démocratique du Congo',
      navigate: 'Navigation',
      connect: 'Contact',
      emailUs: 'Écrivez-nous',
      copyright: 'FASS Services. Tous droits réservés.',
      builtWith: 'Construit avec un but. Guidé par l\'impact.'
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
