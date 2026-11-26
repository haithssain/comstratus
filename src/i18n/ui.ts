// Pour ajouter une langue : ajouter son code dans `languages`,
// puis copier un bloc ci-dessous et le traduire.
export const languages = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

export const ui = {
  fr: {
    siteName: 'Comstratus',
    nav: { home: 'Accueil', services: 'Services', about: 'À propos', contact: 'Contact' },
    langLabel: 'Langue',
    navLabel: 'Navigation principale',
    home: {
      title: 'Comstratus | Conseils en technologies de l’information et IA',
      description:
        'Comstratus accompagne les organisations en conseil TI et en digitalisation grâce à l’intelligence artificielle.',
      heroTitle: 'La technologie au service de votre croissance',
      heroText:
        'Nous accompagnons les organisations dans leurs choix technologiques et dans leur transformation numérique, avec l’intelligence artificielle comme levier concret de performance.',
      ctaPrimary: 'Discutons de votre projet',
      ctaSecondary: 'Voir nos services',
      servicesTitle: 'Ce que nous faisons',
      ctaTitle: 'Un projet en tête ?',
      ctaText: 'Parlons-en. Un premier échange est sans engagement.',
    },
    services: {
      title: 'Services | Comstratus',
      description: 'Conseil en technologies de l’information, IA et digitalisation, et services associés.',
      heading: 'Nos services',
      intro: 'Des services adaptés à la réalité de votre organisation, de l’analyse à la mise en œuvre.',
      items: [
        {
          title: 'Conseil en technologies de l’information',
          text: 'Évaluation de votre environnement TI, choix de solutions, architecture, feuille de route technologique et accompagnement des décisions.',
        },
        {
          title: 'IA et digitalisation',
          text: 'Identification des cas d’usage de l’intelligence artificielle, automatisation des processus et numérisation de vos opérations.',
        },
        {
          title: 'Services associés',
          text: 'Gestion de projet, formation et accompagnement du changement, et soutien à la mise en œuvre de vos solutions.',
        },
      ],
    },
    about: {
      title: 'À propos | Comstratus',
      description: 'Découvrez Comstratus et notre approche du conseil en technologies de l’information.',
      heading: 'À propos de Comstratus',
      paragraphs: [
        'Comstratus est une entreprise de conseil en technologies de l’information. Notre mission : aider les organisations à tirer parti du numérique et de l’intelligence artificielle de façon pragmatique et responsable.',
        'Notre approche repose sur l’écoute, la clarté et des résultats mesurables. Nous privilégions des solutions adaptées à vos besoins plutôt que des technologies à la mode.',
      ],
      valuesTitle: 'Nos valeurs',
      values: [
        { title: 'Clarté', text: 'Des recommandations compréhensibles et des décisions bien éclairées.' },
        { title: 'Pragmatisme', text: 'Des solutions concrètes, adaptées à votre contexte et à votre budget.' },
        { title: 'Confiance', text: 'Une relation transparente, dans le respect de la confidentialité de vos données.' },
      ],
    },
    contact: {
      title: 'Contact | Comstratus',
      description: 'Contactez Comstratus pour discuter de votre projet.',
      heading: 'Contactez-nous',
      intro: 'Décrivez-nous votre projet ou vos besoins, nous vous répondrons rapidement.',
      emailLabel: 'Courriel',
      email: 'info@comstratus.com',
      button: 'Nous écrire',
      note: 'Un formulaire de contact sera ajouté à une prochaine étape.',
    },
    footer: { rights: 'Tous droits réservés.' },
  },
  en: {
    siteName: 'Comstratus',
    nav: { home: 'Home', services: 'Services', about: 'About', contact: 'Contact' },
    langLabel: 'Language',
    navLabel: 'Main navigation',
    home: {
      title: 'Comstratus | IT Consulting and AI',
      description:
        'Comstratus helps organizations with IT consulting and AI-powered digital transformation.',
      heroTitle: 'Technology that serves your growth',
      heroText:
        'We support organizations in their technology choices and digital transformation, using artificial intelligence as a practical lever for performance.',
      ctaPrimary: 'Let’s discuss your project',
      ctaSecondary: 'See our services',
      servicesTitle: 'What we do',
      ctaTitle: 'Have a project in mind?',
      ctaText: 'Let’s talk. An initial conversation is free of charge.',
    },
    services: {
      title: 'Services | Comstratus',
      description: 'IT consulting, AI and digitalization, and related services.',
      heading: 'Our services',
      intro: 'Services tailored to your organization, from analysis through implementation.',
      items: [
        {
          title: 'IT consulting',
          text: 'Assessment of your IT environment, solution selection, architecture, technology roadmap and decision support.',
        },
        {
          title: 'AI and digitalization',
          text: 'Identifying AI use cases, automating processes and digitizing your operations.',
        },
        {
          title: 'Related services',
          text: 'Project management, training and change management, and support for implementing your solutions.',
        },
      ],
    },
    about: {
      title: 'About | Comstratus',
      description: 'Learn about Comstratus Inc. and our approach to IT consulting.',
      heading: 'About Comstratus Inc.',
      paragraphs: [
        'Comstratus is an information technology consulting firm. Our mission is to help organizations make the most of digital technology and artificial intelligence in a pragmatic and responsible way.',
        'Our approach is built on listening, clarity and measurable results. We favour solutions that fit your needs over fashionable technology.',
      ],
      valuesTitle: 'Our values',
      values: [
        { title: 'Clarity', text: 'Understandable recommendations and well-informed decisions.' },
        { title: 'Pragmatism', text: 'Practical solutions suited to your context and budget.' },
        { title: 'Trust', text: 'A transparent relationship that respects the confidentiality of your data.' },
      ],
    },
    contact: {
      title: 'Contact | Comstratus',
      description: 'Contact Comstratus to discuss your project.',
      heading: 'Contact us',
      intro: 'Tell us about your project or needs and we will get back to you quickly.',
      emailLabel: 'Email',
      email: 'info@comstratus.com',
      button: 'Write to us',
      note: 'A contact form will be added in a later step.',
    },
    footer: { rights: 'All rights reserved.' },
  },
  ar: {
    siteName: 'Comstratus',
    nav: { home: 'الرئيسية', services: 'الخدمات', about: 'من نحن', contact: 'اتصل بنا' },
    langLabel: 'اللغة',
    navLabel: 'التنقل الرئيسي',
    home: {
      title: 'Comstratus | استشارات تقنية المعلومات والذكاء الاصطناعي',
      description:
        'تدعم Comstratus المؤسسات في استشارات تقنية المعلومات والتحول الرقمي بالاستفادة من الذكاء الاصطناعي.',
      heroTitle: 'التقنية في خدمة نموّكم',
      heroText:
        'نرافق المؤسسات في اختيار التقنيات وتحولها الرقمي، ونجعل الذكاء الاصطناعي أداة عملية لتحسين الأداء.',
      ctaPrimary: 'لنتحدث عن مشروعكم',
      ctaSecondary: 'استكشفوا خدماتنا',
      servicesTitle: 'ما نقدّمه',
      ctaTitle: 'هل لديكم مشروع؟',
      ctaText: 'يسعدنا التحدث معكم؛ اللقاء الأول دون أي التزام.',
    },
    services: {
      title: 'الخدمات | Comstratus',
      description: 'استشارات تقنية المعلومات والذكاء الاصطناعي والتحول الرقمي والخدمات ذات الصلة.',
      heading: 'خدماتنا',
      intro: 'خدمات تناسب احتياجات مؤسستكم، من التحليل إلى التنفيذ.',
      items: [
        {
          title: 'استشارات تقنية المعلومات',
          text: 'تقييم بيئة تقنية المعلومات لديكم، واختيار الحلول، وتصميم البنية التقنية، ووضع خارطة طريق، ودعم اتخاذ القرار.',
        },
        {
          title: 'الذكاء الاصطناعي والتحول الرقمي',
          text: 'تحديد حالات استخدام الذكاء الاصطناعي، وأتمتة العمليات، ورقمنة أعمالكم.',
        },
        {
          title: 'خدمات مساندة',
          text: 'إدارة المشاريع والتدريب ومواكبة التغيير، ودعم تنفيذ حلولكم.',
        },
      ],
    },
    about: {
      title: 'من نحن | Comstratus',
      description: 'تعرّفوا على Comstratus ونهجنا في استشارات تقنية المعلومات.',
      heading: 'عن Comstratus',
      paragraphs: [
        'Comstratus شركة استشارات في تقنية المعلومات. تتمثل رسالتنا في مساعدة المؤسسات على الاستفادة من التقنيات الرقمية والذكاء الاصطناعي بطريقة عملية ومسؤولة.',
        'يقوم نهجنا على الإصغاء والوضوح وتحقيق نتائج قابلة للقياس. ونفضّل الحلول المناسبة لاحتياجاتكم على التقنيات الرائجة لمجرد رواجها.',
      ],
      valuesTitle: 'قيمنا',
      values: [
        { title: 'الوضوح', text: 'توصيات مفهومة تساعد على اتخاذ قرارات مستنيرة.' },
        { title: 'العملية', text: 'حلول واقعية تناسب سياقكم وميزانيتكم.' },
        { title: 'الثقة', text: 'علاقة شفافة تحترم سرية بياناتكم.' },
      ],
    },
    contact: {
      title: 'اتصل بنا | Comstratus',
      description: 'تواصلوا مع Comstratus لمناقشة مشروعكم.',
      heading: 'تواصلوا معنا',
      intro: 'أخبرونا عن مشروعكم أو احتياجاتكم وسنعاود التواصل معكم قريبًا.',
      emailLabel: 'البريد الإلكتروني',
      email: 'info@comstratus.com',
      button: 'أرسلوا لنا رسالة',
      note: 'ستُضاف استمارة للتواصل في مرحلة لاحقة.',
    },
    footer: { rights: 'جميع الحقوق محفوظة.' },
  },
} as const;
