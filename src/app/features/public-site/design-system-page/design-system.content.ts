import { FaqItem } from '../../../shared/models/public-site.models';

interface ServiceContent {
  readonly number: string;
  readonly title: string;
  readonly body: string;
  readonly tag: string;
}

interface DesignSystemContent {
  readonly studioLabel: string;
  readonly heroLine1: string;
  readonly heroEmphasis1: string;
  readonly heroLine2: string;
  readonly heroEmphasis2: string;
  readonly heroBody: string;
  readonly heroPrimary: string;
  readonly heroSecondary: string;
  readonly heroAlt: string;
  readonly heroBadge: string;
  readonly trustItems: readonly string[];
  readonly servicesEyebrow: string;
  readonly servicesTitle: string;
  readonly servicesEmphasis: string;
  readonly servicesBody: string;
  readonly services: readonly ServiceContent[];
  readonly typographyEyebrow: string;
  readonly typographyTitle: string;
  readonly typographyEmphasis: string;
  readonly typographyBody: string;
  readonly quote: string;
  readonly testimonialEyebrow: string;
  readonly testimonialTitle: string;
  readonly testimonialEmphasis: string;
  readonly testimonialQuote: string;
  readonly testimonialName: string;
  readonly testimonialRole: string;
  readonly sampleLabel: string;
  readonly faqEyebrow: string;
  readonly faqTitle: string;
  readonly faqEmphasis: string;
  readonly faqs: readonly FaqItem[];
  readonly formEyebrow: string;
  readonly formTitle: string;
  readonly formEmphasis: string;
  readonly formBody: string;
  readonly fullName: string;
  readonly namePlaceholder: string;
  readonly email: string;
  readonly optional: string;
  readonly requirement: string;
  readonly requirementPlaceholder: string;
  readonly requirementOptions: readonly string[];
  readonly message: string;
  readonly messagePlaceholder: string;
  readonly consent: string;
  readonly previewAction: string;
  readonly formNote: string;
  readonly statesEyebrow: string;
  readonly statesTitle: string;
  readonly statesEmphasis: string;
  readonly loading: string;
  readonly emptyTitle: string;
  readonly emptyBody: string;
  readonly errorTitle: string;
  readonly errorBody: string;
  readonly retry: string;
  readonly ctaEyebrow: string;
  readonly ctaTitle: string;
  readonly ctaBody: string;
  readonly ctaAction: string;
}

export const designSystemContent: Record<'en' | 'te', DesignSystemContent> = {
  en: {
    studioLabel: 'BILINGUAL BUSINESS GROWTH STUDIO',
    heroLine1: 'Give your idea',
    heroEmphasis1: 'a clear expression.',
    heroLine2: 'Give your business',
    heroEmphasis2: 'room to grow.',
    heroBody:
      'A thoughtful partnership that understands your story and presents your brand with clarity, beauty, and confidence.',
    heroPrimary: 'Begin a conversation',
    heroSecondary: 'Discover our approach',
    heroAlt: 'Professional portrait of the founder in an elegant traditional pink saree',
    heroBadge: 'YOUR GROWTH PARTNER',
    trustItems: [
      'We begin by understanding your story',
      'Clear bilingual communication',
      'A strategy shaped around your goals',
      'A partnership focused on progress',
    ],
    servicesEyebrow: 'Support for your growth journey',
    servicesTitle: 'Clear support for',
    servicesEmphasis: 'every meaningful stage',
    servicesBody: 'No unnecessary complexity—only focused work that moves your business forward.',
    services: [
      {
        number: '01',
        title: 'Brand Clarity',
        body: 'Define who your business serves, what makes it distinct, and how it should be remembered.',
        tag: 'Clarity',
      },
      {
        number: '02',
        title: 'Digital Presence',
        body: 'Build a website and digital experience that presents your value with confidence and care.',
        tag: 'Presence',
      },
      {
        number: '03',
        title: 'Growth Strategy',
        body: 'Create a practical growth plan aligned with your current stage, goals, and resources.',
        tag: 'Growth',
      },
    ],
    typographyEyebrow: 'Bilingual typography',
    typographyTitle: 'Designed to feel natural',
    typographyEmphasis: 'in every language',
    typographyBody:
      'Generous line height, balanced measure, and carefully selected typefaces keep both English and Telugu calm, clear, and premium.',
    quote:
      'Clarity before creativity. Every memorable brand begins with a clear understanding of what it stands for.',
    testimonialEyebrow: 'A trusted visual language',
    testimonialTitle: 'Warm details that create',
    testimonialEmphasis: 'quiet confidence',
    testimonialQuote:
      'They understood our idea with remarkable clarity and presented it more beautifully than we imagined.',
    testimonialName: 'Soumya Reddy',
    testimonialRole: 'Founder, handcrafted brand',
    sampleLabel: 'Sample preview',
    faqEyebrow: 'Accessible interaction',
    faqTitle: 'Helpful answers without',
    faqEmphasis: 'visual clutter',
    faqs: [
      {
        question: 'Who is this service for?',
        answer:
          'It is designed for new founders, established small businesses improving their digital presence, and owners who want a clearer brand direction.',
      },
      {
        question: 'Can we communicate in Telugu?',
        answer: 'Yes. We can work in Telugu, English, or a comfortable combination of both.',
      },
      {
        question: 'What happens in the first conversation?',
        answer:
          'We discuss your present situation, primary challenge, and goal so the most useful next step becomes clear.',
      },
    ],
    formEyebrow: 'Form system',
    formTitle: 'Clear controls with',
    formEmphasis: 'no surprises',
    formBody:
      'This visual form shell demonstrates accessible labels, hints, selections, and consent. It does not send or store information.',
    fullName: 'Full name',
    namePlaceholder: 'Your full name',
    email: 'Email address',
    optional: 'Optional',
    requirement: 'Requirement',
    requirementPlaceholder: 'Choose an option',
    requirementOptions: ['Brand clarity', 'Website / digital presence', 'Growth strategy'],
    message: 'Message',
    messagePlaceholder: 'Tell us briefly about your business and goal…',
    consent: 'I understand this Step 2 form is a non-submitting design preview.',
    previewAction: 'Preview only',
    formNote: 'Backend submission will be introduced in a later approved step.',
    statesEyebrow: 'System feedback',
    statesTitle: 'Calm states for',
    statesEmphasis: 'every moment',
    loading: 'Preparing your experience…',
    emptyTitle: 'Nothing here yet',
    emptyBody: 'New content will appear here when it becomes available.',
    errorTitle: 'Something needs attention',
    errorBody: 'Please try again when you are ready.',
    retry: 'Try again',
    ctaEyebrow: 'Your next step',
    ctaTitle: 'Let’s talk about your idea—and see where it can go.',
    ctaBody: 'A relaxed first conversation to understand your situation, without pressure.',
    ctaAction: 'Start the conversation',
  },
  te: {
    studioLabel: 'TELUGU BUSINESS GROWTH STUDIO',
    heroLine1: 'మీ ఆలోచనకు',
    heroEmphasis1: 'సరైన రూపం.',
    heroLine2: 'మీ వ్యాపారానికి',
    heroEmphasis2: 'స్థిరమైన ఎదుగుదల.',
    heroBody:
      'మీ కథను అర్థం చేసుకుని, మీ బ్రాండ్‌ను స్పష్టంగా, అందంగా, నమ్మకంగా ప్రపంచానికి పరిచయం చేసే భాగస్వామ్యం.',
    heroPrimary: 'సంభాషణ ప్రారంభిద్దాం',
    heroSecondary: 'మా విధానం తెలుసుకోండి',
    heroAlt: 'సాంప్రదాయ గులాబీ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం',
    heroBadge: 'మీ ఎదుగుదల భాగస్వామి',
    trustItems: [
      'మీ కథను అర్థం చేసుకునే విధానం',
      'తెలుగులో స్పష్టమైన కమ్యూనికేషన్',
      'మీ లక్ష్యానికి సరిపోయే వ్యూహం',
      'ఎదుగుదలపై దృష్టి పెట్టే భాగస్వామ్యం',
    ],
    servicesEyebrow: 'మీ ఎదుగుదల ప్రయాణంలో',
    servicesTitle: 'ప్రతి దశకు',
    servicesEmphasis: 'స్పష్టమైన సహకారం',
    servicesBody: 'మీకు అవసరం లేని సంక్లిష్టత లేకుండా, అవసరమైన దానిపై దృష్టి.',
    services: [
      {
        number: '01',
        title: 'బ్రాండ్ స్పష్టత',
        body: 'మీ వ్యాపారం ఎవరి కోసం, ఎందుకు ప్రత్యేకం, ఎలా గుర్తుండాలి అనే విషయాలకు స్పష్టమైన దిశ.',
        tag: 'స్పష్టత',
      },
      {
        number: '02',
        title: 'డిజిటల్ ప్రెజెన్స్',
        body: 'మీ విలువను నమ్మకంగా చూపించే వెబ్‌సైట్, కంటెంట్ మరియు డిజిటల్ అనుభవానికి పునాది.',
        tag: 'ప్రెజెన్స్',
      },
      {
        number: '03',
        title: 'గ్రోత్ వ్యూహం',
        body: 'మీ ప్రస్తుత దశ, లక్ష్యం మరియు వనరులకు సరిపోయే ఆచరణాత్మక ఎదుగుదల ప్రణాళిక.',
        tag: 'ఎదుగుదల',
      },
    ],
    typographyEyebrow: 'ద్విభాషా టైపోగ్రఫీ',
    typographyTitle: 'ప్రతి భాషలో',
    typographyEmphasis: 'సహజమైన అనుభూతి',
    typographyBody:
      'సరైన లైన్ హైట్, చదవడానికి అనుకూలమైన వెడల్పు, జాగ్రత్తగా ఎంపిక చేసిన ఫాంట్లు—తెలుగు, English రెండింటినీ స్పష్టంగా చూపిస్తాయి.',
    quote:
      'సృజనాత్మకతకు ముందు స్పష్టత. ప్రతి గుర్తుండిపోయే బ్రాండ్ వెనుక అది దేనికి నిలబడుతుందో అనే అవగాహన ఉంటుంది.',
    testimonialEyebrow: 'నమ్మకమైన దృశ్య భాష',
    testimonialTitle: 'ఆత్మవిశ్వాసాన్ని పెంచే',
    testimonialEmphasis: 'ఆప్యాయమైన వివరాలు',
    testimonialQuote:
      'మా ఆలోచనను చాలా స్పష్టంగా అర్థం చేసుకుని, మేము ఊహించిన దానికంటే అందంగా చూపించారు.',
    testimonialName: 'సౌమ్య రెడ్డి',
    testimonialRole: 'ఫౌండర్, హ్యాండ్‌క్రాఫ్ట్ బ్రాండ్',
    sampleLabel: 'నమూనా ప్రివ్యూ',
    faqEyebrow: 'అందరికీ అందుబాటులో ఉండే ఇంటరాక్షన్',
    faqTitle: 'అనవసరమైన గందరగోళం లేకుండా',
    faqEmphasis: 'సహాయక సమాధానాలు',
    faqs: [
      {
        question: 'ఈ సేవ ఎవరికీ సరిపోతుంది?',
        answer:
          'కొత్తగా వ్యాపారం మొదలు పెడుతున్నవారు, ఆన్‌లైన్ ప్రెజెన్స్‌ను మెరుగుపరచాలనుకునేవారు, బ్రాండ్‌కు స్పష్టమైన దిశ కావాలనుకునేవారికి ఈ సేవ ఉపయోగపడుతుంది.',
      },
      {
        question: 'తెలుగులోనే మొత్తం చర్చించవచ్చా?',
        answer:
          'అవును. మీకు సౌకర్యమైన విధంగా తెలుగులో, Englishలో లేదా రెండింటినీ కలిపి మాట్లాడవచ్చు.',
      },
      {
        question: 'మొదటి సంభాషణలో ఏమి జరుగుతుంది?',
        answer:
          'మీ ప్రస్తుత పరిస్థితి, ప్రధాన సవాలు, లక్ష్యం గురించి మాట్లాడి తదుపరి సరైన అడుగును గుర్తిస్తాం.',
      },
    ],
    formEyebrow: 'ఫారమ్ సిస్టమ్',
    formTitle: 'స్పష్టమైన కంట్రోల్స్,',
    formEmphasis: 'ఎలాంటి సందేహం లేకుండా',
    formBody:
      'ఈ ఫారమ్ షెల్ లేబుల్స్, సూచనలు, ఎంపికలు, సమ్మతిని చూపించే డిజైన్ ప్రివ్యూ మాత్రమే. సమాచారం పంపబడదు లేదా సేవ్ చేయబడదు.',
    fullName: 'పూర్తి పేరు',
    namePlaceholder: 'మీ పూర్తి పేరు',
    email: 'ఇమెయిల్ చిరునామా',
    optional: 'ఐచ్ఛికం',
    requirement: 'మీ అవసరం',
    requirementPlaceholder: 'ఒక ఎంపికను ఎంచుకోండి',
    requirementOptions: ['బ్రాండ్ స్పష్టత', 'వెబ్‌సైట్ / డిజిటల్ ప్రెజెన్స్', 'గ్రోత్ వ్యూహం'],
    message: 'సందేశం',
    messagePlaceholder: 'మీ వ్యాపారం మరియు మీ లక్ష్యం గురించి క్లుప్తంగా చెప్పండి…',
    consent: 'ఈ Step 2 ఫారమ్ సమాచారం పంపని డిజైన్ ప్రివ్యూ మాత్రమే అని అర్థం చేసుకున్నాను.',
    previewAction: 'ప్రివ్యూ మాత్రమే',
    formNote: 'బ్యాక్‌ఎండ్ సమర్పణను తదుపరి ఆమోదించిన దశలో జోడిస్తాం.',
    statesEyebrow: 'సిస్టమ్ ఫీడ్‌బ్యాక్',
    statesTitle: 'ప్రతి సందర్భానికి',
    statesEmphasis: 'ప్రశాంతమైన స్టేట్స్',
    loading: 'మీ అనుభవాన్ని సిద్ధం చేస్తున్నాం…',
    emptyTitle: 'ఇక్కడ ఇంకా ఏమీ లేదు',
    emptyBody: 'కొత్త కంటెంట్ అందుబాటులోకి వచ్చినప్పుడు ఇక్కడ కనిపిస్తుంది.',
    errorTitle: 'కొంత శ్రద్ధ అవసరం',
    errorBody: 'మీరు సిద్ధంగా ఉన్నప్పుడు మళ్లీ ప్రయత్నించండి.',
    retry: 'మళ్లీ ప్రయత్నించండి',
    ctaEyebrow: 'మీ తదుపరి అడుగు',
    ctaTitle: 'మీ ఆలోచన గురించి మాట్లాడదాం—అది ఎక్కడికి వెళ్లగలదో చూద్దాం.',
    ctaBody: 'ఎలాంటి ఒత్తిడి లేకుండా, మీ పరిస్థితిని అర్థం చేసుకునే పరిచయ సంభాషణ.',
    ctaAction: 'సంభాషణ ప్రారంభిద్దాం',
  },
};
