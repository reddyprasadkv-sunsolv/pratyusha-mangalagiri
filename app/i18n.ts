export type Locale = "en" | "te";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://pratyusha-telugu-growth.reddyprasadkv.chatgpt.site";

export const localePath = (locale: Locale, path = "") => {
  const cleanPath = path === "/" ? "" : path;
  return locale === "te" ? `/te${cleanPath}` : cleanPath || "/";
};

const sharedServices = {
  en: [
    {
      number: "01",
      title: "Brand Clarity",
      text: "Define who your business serves, what makes it distinct, and how it should be remembered.",
      tag: "Brand Clarity",
    },
    {
      number: "02",
      title: "Digital Presence",
      text: "Build a website and digital experience that presents your value with confidence and care.",
      tag: "Digital Presence",
    },
    {
      number: "03",
      title: "Growth Strategy",
      text: "Create a practical growth plan aligned with your current stage, goals, and resources.",
      tag: "Growth Strategy",
    },
  ],
  te: [
    {
      number: "01",
      title: "బ్రాండ్ స్పష్టత",
      text: "మీ వ్యాపారం ఎవరి కోసం, ఎందుకు ప్రత్యేకం, ఎలా గుర్తుండాలి అనే విషయాలకు స్పష్టమైన దిశ.",
      tag: "Brand Clarity",
    },
    {
      number: "02",
      title: "డిజిటల్ ప్రెజెన్స్",
      text: "మీ విలువను నమ్మకంగా చూపించే వెబ్‌సైట్, కంటెంట్ మరియు డిజిటల్ అనుభవానికి పునాది.",
      tag: "Digital Presence",
    },
    {
      number: "03",
      title: "గ్రోత్ వ్యూహం",
      text: "మీ ప్రస్తుత దశ, లక్ష్యం మరియు వనరులకు సరిపోయే ఆచరణాత్మక ఎదుగుదల ప్రణాళిక.",
      tag: "Growth Strategy",
    },
  ],
};

export const homeContent = {
  en: {
    locale: "en" as const,
    direction: "ltr",
    brandTagline: "CLARITY · PRESENCE · GROWTH",
    announcement: "A thoughtful first conversation about your business",
    announcementCta: "Start a conversation",
    navLabel: "Primary navigation",
    mobileNavLabel: "Mobile navigation",
    nav: [
      { label: "Home", href: "#home" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "FAQs", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    headerCta: "Let’s talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileNote:
      "Let’s turn your idea into a clear, credible, and memorable brand.",
    studioLabel: "BILINGUAL BUSINESS GROWTH STUDIO",
    heroLine1: "Give your idea",
    heroEmphasis1: "a clear expression.",
    heroLine2: "Give your business",
    heroEmphasis2: "room to grow.",
    heroLede:
      "A thoughtful partnership that understands your story and presents your brand with clarity, beauty, and confidence.",
    heroPrimary: "Begin a conversation",
    heroSecondary: "Discover our approach",
    heroAlt:
      "Professional portrait of the founder in an elegant traditional saree",
    heroNoteTitle: "Clarity before creativity.",
    heroNote:
      "Every memorable brand begins with a clear understanding of what it stands for.",
    scroll: "SCROLL TO DISCOVER",
    trustLabel: "What makes our approach different",
    trustItems: [
      { value: "01", label: "We begin by understanding your story" },
      { value: "02", label: "Clear bilingual communication" },
      { value: "03", label: "A strategy shaped around your goals" },
      { value: "04", label: "A partnership focused on meaningful progress" },
    ],
    problemEyebrow: "Does this feel familiar?",
    problemTitleBefore: "You know your business has potential.",
    problemTitleEmphasis: "But is the direction clear?",
    problemIntro:
      "A strong business needs more than a good idea. Its value must be communicated clearly to the right people.",
    problems: [
      "You have a strong idea, but struggle to express it clearly.",
      "Your online presence does not reflect the quality of your work.",
      "Your efforts are not consistently reaching the right customers.",
      "You are unsure what to prioritise now and what should come next.",
    ],
    problemBridge: "You do not need to figure out everything alone.",
    problemBridgeStrong:
      "You need a thoughtful partner who can help clarify the way forward.",
    solutionEyebrow: "Our perspective",
    solutionTitle: "It should not only look beautiful.",
    solutionEmphasis: "It should work with purpose.",
    solutionBody:
      "We bring together your business intent, your customers’ needs, and your distinct point of view to create a brand experience that builds trust.",
    solutionQuote:
      "Design without strategy is decoration. Design guided by clarity becomes a foundation for growth.",
    servicesEyebrow: "Support for your growth journey",
    servicesTitle: "Clear support for",
    servicesEmphasis: "every meaningful stage",
    servicesIntro:
      "No unnecessary complexity—only focused work that moves your business forward.",
    services: sharedServices.en,
    learnMore: "Learn more",
    benefitEyebrow: "What you gain",
    benefitTitle: "More than",
    benefitEmphasis: "a website.",
    benefitIntro:
      "Clarity behind every decision. Purpose behind every design. Your growth behind every step.",
    benefits: [
      {
        title: "A clear direction",
        text: "Confidence about what to prioritise, what to postpone, and why.",
      },
      {
        title: "A brand that earns trust",
        text: "A professional experience from the very first customer interaction.",
      },
      {
        title: "Connection with the right audience",
        text: "Communication that helps ideal customers understand your value.",
      },
      {
        title: "A foundation for steady growth",
        text: "A useful long-term system rather than a one-time promotional effort.",
      },
    ],
    processEyebrow: "How we work together",
    processTitle: "From uncertainty to",
    processEmphasis: "a clear next step.",
    process: [
      {
        step: "01",
        title: "Listen",
        text: "We understand your journey, present challenges, and the goal you want to reach.",
      },
      {
        step: "02",
        title: "Clarify",
        text: "We identify priorities and shape a direction that is right for your business.",
      },
      {
        step: "03",
        title: "Build",
        text: "We turn the strategy into a clear, beautiful, and useful digital experience.",
      },
      {
        step: "04",
        title: "Refine",
        text: "We observe results and improve what matters as your business moves forward.",
      },
    ],
    aboutAlt:
      "Professional portrait of the founder in an elegant traditional saree",
    aboutBadge: "YOUR GROWTH PARTNER",
    aboutEyebrow: "About Pratyusha",
    aboutTitle: "A partner who sees",
    aboutEmphasis: "your business as you do.",
    aboutBody1:
      "Every business begins with a personal story. We listen carefully, recognise the value within it, and help present it to the world with confidence.",
    aboutBody2:
      "We believe in thoughtful ideas and beautiful execution shaped around your reality—not grand promises or one-size-fits-all solutions.",
    aboutValues: ["Care", "Clarity", "Integrity", "Quality"],
    testimonialsEyebrow: "Stories of progress",
    testimonialsTitle: "Meaningful changes",
    testimonialsEmphasis: "that began with trust",
    testimonials: [
      {
        quote:
          "They understood our idea with remarkable clarity and presented it more beautifully than we imagined. We can now introduce our brand with confidence.",
        name: "Soumya Reddy",
        role: "Founder, handcrafted brand",
      },
      {
        quote:
          "We received more than design. We gained clarity about what to say, who to say it to, and how to move forward.",
        name: "Anil Kumar",
        role: "Small business owner",
      },
    ],
    testimonialDisclaimer:
      "Note: Testimonials are sample content for this private design preview.",
    faqEyebrow: "Frequently asked questions",
    faqTitle: "Helpful answers to",
    faqEmphasis: "the questions on your mind",
    faqPrompt: "Still have a question?",
    faqLink: "Talk to us directly.",
    faqs: [
      {
        question: "Who is this service for?",
        answer:
          "It is designed for new founders, established small businesses improving their digital presence, and business owners who want a clearer brand direction.",
      },
      {
        question: "How long does the process take?",
        answer:
          "Timing depends on the scope and your needs. After the initial conversation, we share clear stages, an estimated timeline, and what is required from both sides.",
      },
      {
        question: "Can we communicate in Telugu?",
        answer:
          "Yes. We can work in Telugu, English, or a comfortable combination of both.",
      },
      {
        question: "What happens in the first conversation?",
        answer:
          "We discuss your present situation, primary challenge, and goal. You leave with clarity about whether we are a good fit and the most useful next step.",
      },
      {
        question: "How is pricing decided?",
        answer:
          "One package cannot serve every business. Once we understand the work you genuinely need, we share a transparent proposal and cost.",
      },
    ],
    conversionEyebrow: "Your next step",
    conversionTitle: "Let’s talk about your idea.",
    conversionEmphasis: "And see where it can go.",
    conversionBody:
      "A relaxed first conversation to understand your situation and identify a useful next step—without pressure.",
    conversionCta: "Start the conversation",
    contactEyebrow: "Contact",
    contactTitle: "We are ready",
    contactEmphasis: "to hear your story.",
    contactBody:
      "Share a few details below. We will understand your requirement and usually respond within one or two working days.",
    emailLabel: "EMAIL",
    locationLabel: "BASED IN",
    location: "Hyderabad · Serving Worldwide",
    contactNote:
      "Contact details will be updated after receiving final client information.",
    formHeading: "Your details",
    form: {
      name: "Full Name",
      namePlaceholder: "Your full name",
      mobile: "Mobile Number",
      email: "Email Address",
      city: "City",
      cityPlaceholder: "Your city",
      requirement: "Requirement",
      requirementPlaceholder: "Choose an option",
      requirementOptions: [
        ["brand", "Brand clarity"],
        ["website", "Website / digital presence"],
        ["growth", "Growth strategy"],
        ["other", "Other requirement"],
      ],
      message: "Message",
      messagePlaceholder:
        "Tell us briefly about your business, current challenge, and goal...",
      consent:
        "I agree that my details may be used to respond to this enquiry.",
      submit: "Submit enquiry",
      successTitle: "Your bilingual form preview is working.",
      successBody:
        "Secure lead storage will activate after the Supabase project is connected.",
      privacy: "Your information stays private. We do not send spam.",
      required: "Please complete this required field.",
    },
    footerStatement:
      "Clarity for your idea. Distinction for your brand. Growth for your business.",
    footerNav: "Navigation",
    footerLegal: "Legal",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    footerNote: "Thoughtfully designed for Indian businesses.",
    backToTop: "Back to top",
    legalLinks: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms-and-conditions"],
      ["Refund Policy", "/refund-cancellation-policy"],
      ["Disclaimer", "/disclaimer"],
      ["Cookie Policy", "/cookie-policy"],
    ],
  },
  te: {
    locale: "te" as const,
    direction: "ltr",
    brandTagline: "CLARITY · PRESENCE · GROWTH",
    announcement: "మీ వ్యాపారం గురించి శ్రద్ధతో కూడిన తొలి సంభాషణ",
    announcementCta: "సంభాషణ ప్రారంభించండి",
    navLabel: "ప్రధాన నావిగేషన్",
    mobileNavLabel: "మొబైల్ నావిగేషన్",
    nav: [
      { label: "హోమ్", href: "#home" },
      { label: "మా సేవలు", href: "#services" },
      { label: "మా గురించి", href: "#about" },
      { label: "ప్రశ్నలు", href: "#faq" },
      { label: "సంప్రదించండి", href: "#contact" },
    ],
    headerCta: "మాట్లాడదాం",
    openMenu: "మెనూ తెరవండి",
    closeMenu: "మెనూ మూసివేయండి",
    mobileNote:
      "మీ ఆలోచనను అందమైన, నమ్మకమైన బ్రాండ్‌గా మార్చుకుందాం.",
    studioLabel: "TELUGU BUSINESS GROWTH STUDIO",
    heroLine1: "మీ ఆలోచనకు",
    heroEmphasis1: "సరైన రూపం.",
    heroLine2: "మీ వ్యాపారానికి",
    heroEmphasis2: "స్థిరమైన ఎదుగుదల.",
    heroLede:
      "మీ కథను అర్థం చేసుకుని, మీ బ్రాండ్‌ను స్పష్టంగా, అందంగా, నమ్మకంగా ప్రపంచానికి పరిచయం చేసే భాగస్వామ్యం.",
    heroPrimary: "సంభాషణ ప్రారంభిద్దాం",
    heroSecondary: "మా విధానం తెలుసుకోండి",
    heroAlt: "సాంప్రదాయ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం",
    heroNoteTitle: "Clarity before creativity.",
    heroNote:
      "ప్రతి అందమైన బ్రాండ్ వెనుక ఒక స్పష్టమైన ఆలోచన ఉంటుంది.",
    scroll: "SCROLL TO DISCOVER",
    trustLabel: "మా ప్రత్యేకతలు",
    trustItems: [
      { value: "01", label: "మీ కథను అర్థం చేసుకునే విధానం" },
      { value: "02", label: "తెలుగులో స్పష్టమైన కమ్యూనికేషన్" },
      { value: "03", label: "మీ లక్ష్యానికి సరిపోయే వ్యూహం" },
      { value: "04", label: "ఫలితాలపై దృష్టి పెట్టే భాగస్వామ్యం" },
    ],
    problemEyebrow: "ఇది మీకు పరిచయంగా అనిపిస్తుందా?",
    problemTitleBefore: "మీలో సామర్థ్యం ఉంది.",
    problemTitleEmphasis: "కానీ స్పష్టత లేదా?",
    problemIntro:
      "మంచి వ్యాపారం ఉండటం ఒక్కటే సరిపోదు. దాని విలువను సరైన వ్యక్తులకు సరైన విధంగా చూపించగలగాలి.",
    problems: [
      "మంచి ఆలోచన ఉన్నా, దాన్ని స్పష్టంగా ఎలా చెప్పాలో తెలియకపోవడం",
      "ఆన్‌లైన్‌లో మీ వ్యాపారం ప్రొఫెషనల్‌గా కనిపించకపోవడం",
      "ఎన్నో ప్రయత్నాలు చేసినా సరైన కస్టమర్లను చేరుకోలేకపోవడం",
      "ఎక్కడ మొదలు పెట్టాలి, తర్వాత ఏం చేయాలి అనే గందరగోళం",
    ],
    problemBridge: "మీరు ఒంటరిగా అన్నీ తెలుసుకోవాల్సిన అవసరం లేదు.",
    problemBridgeStrong:
      "మీకు కావాల్సింది—సరైన దిశ చూపించే భాగస్వామి.",
    solutionEyebrow: "మా దృక్పథం",
    solutionTitle: "అందంగా కనిపించడం మాత్రమే కాదు.",
    solutionEmphasis: "అర్థవంతంగా పనిచేయాలి.",
    solutionBody:
      "మీ వ్యాపారం వెనుక ఉన్న ఉద్దేశాన్ని, మీ కస్టమర్ల అవసరాన్ని, మార్కెట్‌లో మీ ప్రత్యేకతను కలిపి—నమ్మకాన్ని పెంచే బ్రాండ్ అనుభవాన్ని నిర్మిస్తాం.",
    solutionQuote:
      "వ్యూహం లేని డిజైన్ అలంకరణ మాత్రమే. స్పష్టతతో కూడిన డిజైన్ ఎదుగుదలకు పునాది.",
    servicesEyebrow: "మీ ఎదుగుదల ప్రయాణంలో",
    servicesTitle: "ప్రతి దశకు",
    servicesEmphasis: "స్పష్టమైన సహకారం",
    servicesIntro:
      "మీకు అవసరం లేని సంక్లిష్టత లేకుండా, అవసరమైన దానిపై దృష్టి.",
    services: sharedServices.te,
    learnMore: "మరింత తెలుసుకోండి",
    benefitEyebrow: "మీరు పొందేది",
    benefitTitle: "ఒక వెబ్‌సైట్ కంటే",
    benefitEmphasis: "ఎక్కువ.",
    benefitIntro:
      "ప్రతి నిర్ణయం వెనుక స్పష్టత. ప్రతి డిజైన్ వెనుక ఉద్దేశం. ప్రతి అడుగు వెనుక మీ ఎదుగుదల.",
    benefits: [
      {
        title: "స్పష్టమైన దిశ",
        text: "ఏది ముందుగా చేయాలో, ఏది వేచి ఉండాలో నిర్ణయించగల ఆత్మవిశ్వాసం.",
      },
      {
        title: "నమ్మకం కలిగించే బ్రాండ్",
        text: "మీ కస్టమర్లు చూసిన మొదటి క్షణం నుంచే ప్రొఫెషనల్ అనుభూతి.",
      },
      {
        title: "సరైన కస్టమర్లతో అనుసంధానం",
        text: "మీ సేవ విలువను అర్థం చేసుకునే వ్యక్తులను చేరుకునే కమ్యూనికేషన్.",
      },
      {
        title: "స్థిరంగా ఎదిగే వ్యవస్థ",
        text: "ఒక్కసారి చేసే ప్రచారం కాకుండా, దీర్ఘకాలానికి ఉపయోగపడే పునాది.",
      },
    ],
    processEyebrow: "మనం కలిసి ఎలా పనిచేస్తాం",
    processTitle: "గందరగోళం నుంచి",
    processEmphasis: "స్పష్టమైన ముందడుగుకు.",
    process: [
      {
        step: "01",
        title: "వింటాం",
        text: "మీ ప్రయాణం, ప్రస్తుతం ఉన్న సవాళ్లు, మీరు చేరాలనుకునే లక్ష్యాన్ని అర్థం చేసుకుంటాం.",
      },
      {
        step: "02",
        title: "స్పష్టం చేస్తాం",
        text: "అవసరమైన ప్రాధాన్యతలను గుర్తించి, మీకు సరిపోయే దిశను రూపొందిస్తాం.",
      },
      {
        step: "03",
        title: "నిర్మిస్తాం",
        text: "వ్యూహాన్ని అందమైన, సులభమైన మరియు ఉపయోగకరమైన డిజిటల్ అనుభవంగా మారుస్తాం.",
      },
      {
        step: "04",
        title: "మెరుగుపరుస్తాం",
        text: "ఫలితాలను గమనించి, అవసరమైన చోట మెరుగుపరుస్తూ ముందుకు సాగుతాం.",
      },
    ],
    aboutAlt: "సాంప్రదాయ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం",
    aboutBadge: "YOUR GROWTH PARTNER",
    aboutEyebrow: "Pratyusha గురించి",
    aboutTitle: "మీ వ్యాపారాన్ని",
    aboutEmphasis: "మీలా చూసే భాగస్వామి.",
    aboutBody1:
      "ప్రతి వ్యాపారం వెనుక ఒక వ్యక్తిగత కథ ఉంటుంది. ఆ కథను శ్రద్ధగా విని, అందులోని విలువను గుర్తించి, ప్రపంచానికి నమ్మకంగా చూపించడమే మా పని.",
    aboutBody2:
      "పెద్ద మాటలు, ఒకేలా ఉండే పరిష్కారాలకంటే—మీ పరిస్థితికి సరిపోయే స్పష్టమైన ఆలోచనలను, అందమైన అమలును మేము నమ్ముతాం.",
    aboutValues: ["శ్రద్ధ", "స్పష్టత", "నిజాయితీ", "నాణ్యత"],
    testimonialsEyebrow: "కలిసి ఎదిగిన కథలు",
    testimonialsTitle: "నమ్మకం నుంచి మొదలైన",
    testimonialsEmphasis: "అందమైన మార్పులు",
    testimonials: [
      {
        quote:
          "మా ఆలోచనను చాలా స్పష్టంగా అర్థం చేసుకుని, మేము ఊహించిన దానికంటే అందంగా చూపించారు. ఇప్పుడు మా బ్రాండ్‌ను నమ్మకంగా పరిచయం చేయగలుగుతున్నాం.",
        name: "సౌమ్య రెడ్డి",
        role: "ఫౌండర్, హ్యాండ్‌క్రాఫ్ట్ బ్రాండ్",
      },
      {
        quote:
          "మాకు కేవలం డిజైన్ కాదు—ఏం చెప్పాలి, ఎవరికి చెప్పాలి, ఎలా ముందుకు వెళ్లాలి అన్న స్పష్టత వచ్చింది.",
        name: "అనిల్ కుమార్",
        role: "స్మాల్ బిజినెస్ ఓనర్",
      },
    ],
    testimonialDisclaimer:
      "గమనిక: పై టెస్టిమోనియల్స్ ప్రైవేట్ డిజైన్ ప్రివ్యూ కోసం నమూనా కంటెంట్.",
    faqEyebrow: "సాధారణ ప్రశ్నలు",
    faqTitle: "మీ మనసులో ఉన్న",
    faqEmphasis: "ప్రశ్నలకు సమాధానాలు",
    faqPrompt: "మీ ప్రశ్న ఇక్కడ కనిపించలేదా?",
    faqLink: "మాతో నేరుగా మాట్లాడండి.",
    faqs: [
      {
        question: "ఈ సేవ ఎవరికీ సరిపోతుంది?",
        answer:
          "కొత్తగా వ్యాపారం మొదలు పెడుతున్నవారు, ఇప్పటికే వ్యాపారం ఉన్నా ఆన్‌లైన్ ప్రెజెన్స్‌ను మెరుగుపరచాలనుకునేవారు, తమ బ్రాండ్‌కు స్పష్టమైన దిశ కావాలనుకునేవారికి ఈ సేవ ఉపయోగపడుతుంది.",
      },
      {
        question: "ప్రక్రియ ఎంత సమయం పడుతుంది?",
        answer:
          "మీ అవసరాలు, పనివ్యాప్తిని బట్టి సమయం మారుతుంది. ప్రారంభ సంభాషణ తర్వాత దశలు, అంచనా సమయం, అవసరమైన వివరాలను పారదర్శకంగా పంచుకుంటాం.",
      },
      {
        question: "తెలుగులోనే మొత్తం చర్చించవచ్చా?",
        answer:
          "అవును. మీకు సౌకర్యమైన విధంగా తెలుగులో లేదా అవసరాన్ని బట్టి తెలుగు–English కలిపి కమ్యూనికేట్ చేయవచ్చు.",
      },
      {
        question: "మొదటి సంభాషణలో ఏమి జరుగుతుంది?",
        answer:
          "మీ ప్రస్తుత పరిస్థితి, ప్రధాన సవాలు, లక్ష్యం గురించి మాట్లాడుతాం. కలిసి పనిచేయడం సరిపోతుందా, తదుపరి సరైన అడుగు ఏంటి అనే స్పష్టతతో ముగిస్తాం.",
      },
      {
        question: "ధరలు ఎలా నిర్ణయిస్తారు?",
        answer:
          "ఒకే ప్యాకేజ్ అందరికీ సరిపోదు. మీకు నిజంగా అవసరమైన పనిని అర్థం చేసుకున్న తర్వాత స్పష్టమైన ప్రతిపాదన మరియు ఖర్చును ముందుగానే అందిస్తాం.",
      },
    ],
    conversionEyebrow: "మీ తదుపరి అడుగు",
    conversionTitle: "మీ ఆలోచన గురించి మాట్లాడదాం.",
    conversionEmphasis: "అది ఎక్కడికి వెళ్లగలదో చూద్దాం.",
    conversionBody:
      "ఎలాంటి ఒత్తిడి లేదు. మీ ప్రస్తుత పరిస్థితిని అర్థం చేసుకుని, తదుపరి సరైన అడుగును కలిసి గుర్తించే పరిచయ సంభాషణ.",
    conversionCta: "సంభాషణ ప్రారంభిద్దాం",
    contactEyebrow: "సంప్రదించండి",
    contactTitle: "మీ కథను",
    contactEmphasis: "వినడానికి సిద్ధంగా ఉన్నాం.",
    contactBody:
      "ఈ చిన్న ఫారమ్‌లో వివరాలు పంచుకోండి. మీ అవసరాన్ని అర్థం చేసుకుని, సాధారణంగా 1–2 పనిదినాల్లో స్పందిస్తాం.",
    emailLabel: "EMAIL",
    locationLabel: "BASED IN",
    location: "Hyderabad · Serving Worldwide",
    contactNote:
      "సంప్రదింపు వివరాలు క్లయింట్ నుంచి వచ్చిన తర్వాత అప్‌డేట్ అవుతాయి.",
    formHeading: "మీ వివరాలు",
    form: {
      name: "పూర్తి పేరు",
      namePlaceholder: "మీ పూర్తి పేరు",
      mobile: "మొబైల్ నంబర్",
      email: "ఇమెయిల్ చిరునామా",
      city: "నగరం",
      cityPlaceholder: "మీ నగరం",
      requirement: "మీ అవసరం",
      requirementPlaceholder: "ఒక ఎంపికను ఎంచుకోండి",
      requirementOptions: [
        ["brand", "బ్రాండ్ స్పష్టత"],
        ["website", "వెబ్‌సైట్ / డిజిటల్ ప్రెజెన్స్"],
        ["growth", "గ్రోత్ వ్యూహం"],
        ["other", "ఇతర అవసరం"],
      ],
      message: "సందేశం",
      messagePlaceholder: "మీ వ్యాపారం, ప్రస్తుత సవాలు, మీ లక్ష్యం...",
      consent:
        "నా వివరాలను ఈ విచారణకు స్పందించేందుకు ఉపయోగించడానికి అంగీకరిస్తున్నాను.",
      submit: "విచారణను పంపండి",
      successTitle: "బైలింగ్వల్ ఫారమ్ ప్రివ్యూ పనిచేస్తోంది.",
      successBody:
        "Supabase ప్రాజెక్ట్ కనెక్ట్ అయిన తర్వాత లీడ్ సురక్షితంగా సేవ్ అవుతుంది.",
      privacy: "మీ సమాచారం గోప్యంగా ఉంటుంది. స్పామ్ చేయము.",
      required: "దయచేసి ఈ తప్పనిసరి వివరాన్ని నమోదు చేయండి.",
    },
    footerStatement:
      "మీ ఆలోచనకు స్పష్టత. మీ బ్రాండ్‌కు ప్రత్యేకత. మీ వ్యాపారానికి ఎదుగుదల.",
    footerNav: "నావిగేషన్",
    footerLegal: "చట్టపరమైనవి",
    footerContact: "సంప్రదించండి",
    footerRights: "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
    footerNote: "తెలుగు వ్యాపారాల ఎదుగుదల కోసం శ్రద్ధతో రూపొందించబడింది.",
    backToTop: "పేజీ పైకి వెళ్లండి",
    legalLinks: [
      ["గోప్యతా విధానం", "/privacy-policy"],
      ["నిబంధనలు & షరతులు", "/terms-and-conditions"],
      ["రిఫండ్ విధానం", "/refund-cancellation-policy"],
      ["నిరాకరణ", "/disclaimer"],
      ["కుకీ విధానం", "/cookie-policy"],
    ],
  },
} as const;

export type PolicyKey =
  | "privacy-policy"
  | "terms-and-conditions"
  | "refund-cancellation-policy"
  | "disclaimer"
  | "cookie-policy";

type PolicyCopy = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const policyContent: Record<Locale, Record<PolicyKey, PolicyCopy>> = {
  en: {
    "privacy-policy": {
      title: "Privacy Policy",
      eyebrow: "YOUR PRIVACY",
      intro:
        "We are committed to handling the personal information you share with care and only for clear, necessary purposes.",
      sections: [
        {
          heading: "Information we collect",
          body: "We may collect your name, mobile number, email address, city, service requirement, and any message you voluntarily submit.",
        },
        {
          heading: "How information is used",
          body: "Information is used to respond to your enquiry, provide relevant service details, protect the website, and improve the visitor experience.",
        },
        {
          heading: "Data security",
          body: "Appropriate technical and organisational safeguards are used to reduce the risk of unauthorised access, alteration, or misuse.",
        },
      ],
    },
    "terms-and-conditions": {
      title: "Terms & Conditions",
      eyebrow: "WEBSITE TERMS",
      intro:
        "By using this website, you acknowledge that you have read and understood these terms.",
      sections: [
        {
          heading: "Website use",
          body: "Website information is provided for general awareness. The website must not be used for unlawful, harmful, or disruptive purposes.",
        },
        {
          heading: "Intellectual property",
          body: "Website content, brand elements, and design rights belong to their respective owners unless stated otherwise.",
        },
        {
          heading: "Service scope",
          body: "Each project’s scope, payment terms, timeline, and deliverables are defined in a separate proposal or agreement.",
        },
      ],
    },
    "refund-cancellation-policy": {
      title: "Refund & Cancellation Policy",
      eyebrow: "CANCELLATIONS",
      intro:
        "Because every engagement is different, cancellation and refund terms are confirmed in writing before work begins.",
      sections: [
        {
          heading: "Cancellation requests",
          body: "Cancellation requests should be submitted in writing within the period specified in the applicable proposal or agreement.",
        },
        {
          heading: "Work already completed",
          body: "Fees for completed work, committed resources, and third-party costs are generally not refundable.",
        },
        {
          heading: "Eligible refunds",
          body: "When a refund is eligible, it is processed after applicable deductions through the agreed payment method within the stated working days.",
        },
      ],
    },
    disclaimer: {
      title: "Disclaimer",
      eyebrow: "IMPORTANT INFORMATION",
      intro:
        "Information on this website is general guidance and should not be treated as legal, financial, or other regulated professional advice.",
      sections: [
        {
          heading: "No guarantee of results",
          body: "Business outcomes depend on execution, market conditions, budget, and other factors. No specific result is guaranteed.",
        },
        {
          heading: "Accuracy of information",
          body: "Reasonable efforts are made to keep information useful and current, but completeness or uninterrupted availability cannot be guaranteed.",
        },
        {
          heading: "External links",
          body: "We are not responsible for the content, security, or policies of third-party websites or services.",
        },
      ],
    },
    "cookie-policy": {
      title: "Cookie Policy",
      eyebrow: "COOKIE USE",
      intro:
        "Limited cookies may be used to keep the website secure, functional, and understandable.",
      sections: [
        {
          heading: "Essential cookies",
          body: "Essential cookies may support secure navigation, form protection, language preference, and core website operation.",
        },
        {
          heading: "Analytics cookies",
          body: "With consent, privacy-respecting analytics may be used to understand website usage in aggregate.",
        },
        {
          heading: "Your choice",
          body: "You may control non-essential cookies through browser settings. Disabling some cookies may affect certain features.",
        },
      ],
    },
  },
  te: {
    "privacy-policy": {
      title: "గోప్యతా విధానం",
      eyebrow: "PRIVACY POLICY",
      intro:
        "మీరు మాతో పంచుకునే వ్యక్తిగత సమాచారాన్ని గౌరవంగా, అవసరమైన మేరకు మాత్రమే వినియోగించేందుకు మేము కట్టుబడి ఉన్నాం.",
      sections: [
        {
          heading: "మేము సేకరించే సమాచారం",
          body: "మీ పేరు, మొబైల్ నంబర్, ఇమెయిల్ చిరునామా, నగరం, సేవకు సంబంధించిన అవసరం మరియు మీరు స్వచ్ఛందంగా పంపే సందేశాన్ని సేకరించవచ్చు.",
        },
        {
          heading: "సమాచారం ఎలా ఉపయోగిస్తాం",
          body: "మీ అభ్యర్థనకు స్పందించడానికి, సేవల గురించి వివరాలు అందించడానికి, వెబ్‌సైట్‌ను రక్షించడానికి మరియు అనుభవాన్ని మెరుగుపరచడానికి సమాచారాన్ని ఉపయోగిస్తాం.",
        },
        {
          heading: "డేటా భద్రత",
          body: "అనధికార ప్రాప్తి, మార్పు లేదా దుర్వినియోగం నుంచి సమాచారాన్ని రక్షించేందుకు తగిన సాంకేతిక మరియు నిర్వహణ చర్యలు తీసుకుంటాం.",
        },
      ],
    },
    "terms-and-conditions": {
      title: "నిబంధనలు మరియు షరతులు",
      eyebrow: "TERMS & CONDITIONS",
      intro:
        "ఈ వెబ్‌సైట్‌ను ఉపయోగించడం ద్వారా క్రింది నిబంధనలను చదివి, అర్థం చేసుకున్నట్లు భావించబడుతుంది.",
      sections: [
        {
          heading: "వెబ్‌సైట్ వినియోగం",
          body: "ఈ వెబ్‌సైట్‌లోని సమాచారం సాధారణ అవగాహన కోసం. చట్టవిరుద్ధమైన లేదా హానికరమైన ప్రయోజనాలకు వెబ్‌సైట్‌ను ఉపయోగించరాదు.",
        },
        {
          heading: "మేధో సంపత్తి",
          body: "వెబ్‌సైట్‌లోని కంటెంట్, బ్రాండ్ అంశాలు మరియు డిజైన్ సంబంధిత హక్కులు సంబంధిత యజమానులకు చెందుతాయి.",
        },
        {
          heading: "సేవల పరిధి",
          body: "ప్రతి ప్రాజెక్ట్ పరిధి, చెల్లింపులు, కాలపరిమితి మరియు డెలివరబుల్స్ ప్రత్యేక ప్రతిపాదన లేదా ఒప్పందంలో స్పష్టంగా పేర్కొనబడతాయి.",
        },
      ],
    },
    "refund-cancellation-policy": {
      title: "రిఫండ్ మరియు రద్దు విధానం",
      eyebrow: "REFUND & CANCELLATION",
      intro:
        "ప్రతి సేవ స్వభావం భిన్నంగా ఉండటం వల్ల, రద్దు మరియు రిఫండ్ నిబంధనలు పనిపరిధి ఆధారంగా ముందుగానే తెలియజేయబడతాయి.",
      sections: [
        {
          heading: "రద్దు అభ్యర్థనలు",
          body: "సేవను రద్దు చేయాలనుకుంటే ఒప్పందంలో పేర్కొన్న కాలపరిమితిలో లిఖితపూర్వకంగా తెలియజేయాలి.",
        },
        {
          heading: "పూర్తయిన పని",
          body: "ఇప్పటికే పూర్తయిన పని, వినియోగించిన వనరులు మరియు మూడవ పక్ష ఖర్చులకు సంబంధించిన మొత్తం సాధారణంగా రిఫండ్‌కు అర్హం కాదు.",
        },
        {
          heading: "అర్హమైన రిఫండ్",
          body: "రిఫండ్‌కు అర్హత ఉన్నప్పుడు, వర్తించే తగ్గింపుల తర్వాత ఒప్పుకున్న చెల్లింపు పద్ధతికి నిర్ణీత పనిదినాల్లో ప్రాసెస్ చేయబడుతుంది.",
        },
      ],
    },
    disclaimer: {
      title: "నిరాకరణ ప్రకటన",
      eyebrow: "DISCLAIMER",
      intro:
        "ఈ వెబ్‌సైట్‌లోని సమాచారం సాధారణ మార్గదర్శకత్వం కోసం మాత్రమే; ప్రత్యేక చట్టపరమైన, ఆర్థిక లేదా వృత్తిపరమైన సలహాగా పరిగణించరాదు.",
      sections: [
        {
          heading: "ఫలితాలపై హామీ",
          body: "వ్యాపార ఫలితాలు మార్కెట్, అమలు, బడ్జెట్ మరియు ఇతర అంశాలపై ఆధారపడతాయి. నిర్దిష్ట ఫలితాలకు హామీ ఇవ్వబడదు.",
        },
        {
          heading: "సమాచార ఖచ్చితత్వం",
          body: "సమాచారాన్ని తాజా మరియు ఉపయోగకరంగా ఉంచేందుకు ప్రయత్నిస్తాం. అయినప్పటికీ సంపూర్ణత లేదా నిరంతర లభ్యతకు హామీ ఇవ్వలేం.",
        },
        {
          heading: "బాహ్య లింకులు",
          body: "మూడవ పక్ష వెబ్‌సైట్లు లేదా సేవలకు ఉన్న లింకుల కంటెంట్, భద్రత లేదా విధానాలకు మేము బాధ్యత వహించము.",
        },
      ],
    },
    "cookie-policy": {
      title: "కుకీ విధానం",
      eyebrow: "COOKIE POLICY",
      intro:
        "వెబ్‌సైట్ సక్రమంగా పనిచేయడానికి, భాష ఎంపికను గుర్తుంచుకోవడానికి మరియు అనుభవాన్ని అర్థం చేసుకోవడానికి అవసరమైన పరిమిత కుకీలను ఉపయోగించవచ్చు.",
      sections: [
        {
          heading: "అవసరమైన కుకీలు",
          body: "సురక్షిత నావిగేషన్, ఫారమ్ రక్షణ, భాష ఎంపిక మరియు ప్రాథమిక వెబ్‌సైట్ పనితీరుకు అవసరమైన కుకీలు ఉపయోగించబడవచ్చు.",
        },
        {
          heading: "విశ్లేషణ కుకీలు",
          body: "మీ సమ్మతితో, వెబ్‌సైట్ వినియోగాన్ని సమగ్రంగా అర్థం చేసుకునేందుకు గోప్యతను గౌరవించే విశ్లేషణ సాధనాలు ఉపయోగించవచ్చు.",
        },
        {
          heading: "మీ ఎంపిక",
          body: "బ్రౌజర్ సెట్టింగ్స్ ద్వారా అవసరం కాని కుకీలను నియంత్రించవచ్చు. కొన్ని కుకీలను నిలిపివేస్తే కొన్ని ఫీచర్లు ప్రభావితం కావచ్చు.",
        },
      ],
    },
  },
};

export const localeLabels = {
  en: {
    switchLabel: "Switch website language to Telugu",
    activeLabel: "English selected",
    alternate: "తెలుగు",
    backHome: "Back to home",
    draft: "Draft content for client and legal review",
    lastUpdated: "Last updated: 30 July 2026",
    questions: "Questions: hello@pratyusha.example",
  },
  te: {
    switchLabel: "వెబ్‌సైట్ భాషను ఆంగ్లంలోకి మార్చండి",
    activeLabel: "తెలుగు ఎంపిక చేయబడింది",
    alternate: "English",
    backHome: "హోమ్‌కు తిరిగి వెళ్లండి",
    draft: "క్లయింట్ మరియు న్యాయ సమీక్షకు డ్రాఫ్ట్ కంటెంట్",
    lastUpdated: "చివరి నవీకరణ: 30 జూలై 2026",
    questions: "ప్రశ్నలు: hello@pratyusha.example",
  },
} as const;
