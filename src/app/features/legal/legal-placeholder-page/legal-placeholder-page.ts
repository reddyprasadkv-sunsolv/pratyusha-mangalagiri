import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { LocaleService } from '../../../core/i18n/locale.service';
import { SupportedLanguage } from '../../public-site/content/public-content.model';

export type PolicyKey =
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'refund-cancellation-policy'
  | 'disclaimer'
  | 'cookie-policy';

export interface PolicySection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly listItems?: readonly string[];
}

const POLICY_TITLES: Readonly<Record<PolicyKey, Readonly<Record<SupportedLanguage, string>>>> = {
  'privacy-policy': { en: 'Privacy Policy', te: 'గోప్యతా విధానం' },
  'terms-and-conditions': { en: 'Terms & Conditions', te: 'నిబంధనలు మరియు షరతులు' },
  'refund-cancellation-policy': {
    en: 'Refund & Return Policy',
    te: 'రిఫండ్ మరియు వాపసు విధానం',
  },
  disclaimer: { en: 'Disclaimer', te: 'నిరాకరణ ప్రకటన' },
  'cookie-policy': { en: 'Cookie Policy', te: 'కుకీ విధానం' },
};

const POLICY_CONTENT: Readonly<Record<PolicyKey, Readonly<Record<SupportedLanguage, readonly PolicySection[]>>>> = {
  'privacy-policy': {
    en: [
      {
        heading: '1. Introduction & Overview',
        paragraphs: [
          'Pratyusha Mangalagiri ("we", "us", or "our") operates crystals.healbypratyusha.com. We respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, process, and safeguard your data when you visit our website, submit inquiries, purchase crystal bracelets, or engage with our advertisements on digital platforms including Meta (Facebook & Instagram), LinkedIn, and YouTube / Google Ads.',
        ],
      },
      {
        heading: '2. Information We Collect',
        paragraphs: [
          'We collect personal details that you voluntarily provide to us when placing orders, booking 21-day guidance sessions, or filling enquiry forms. This includes:',
        ],
        listItems: [
          'Contact Information: Full Name, Phone Number, WhatsApp Number, and Email Address.',
          'Shipping & Billing Details: Physical Delivery Address, City, State, and Postal Code.',
          'Guidance & Order Preferences: Specific crystal requirements, intention goals, and consultation notes.',
          'Technical & Usage Data: IP address, browser type, device information, and page interaction metrics.',
        ],
      },
      {
        heading: '3. Advertising, Cookies & Third-Party Tracking Pixels',
        paragraphs: [
          'To measure advertising effectiveness and deliver relevant content, our website incorporates tracking technologies and tags from trusted advertising partners, including Meta Pixel (Facebook & Instagram Ads), LinkedIn Insight Tag, Google / YouTube Ads Conversion Tracking, and Google Analytics.',
          'These third-party platforms may place cookies or use web beacons to gather information regarding your browsing activity on our website to optimize ad delivery and conversion reporting. You can control or opt out of personalized ad tracking through your browser settings or platform privacy settings (such as Meta Ad Preferences or Google Ad Settings).',
        ],
      },
      {
        heading: '4. How We Use Your Information',
        paragraphs: ['We utilize your personal information exclusively for legitimate business purposes:'],
        listItems: [
          'Fulfilling and dispatching your crystal bracelet orders.',
          'Scheduling and delivering 21-day intention guidance sessions.',
          'Sending transaction confirmations, order updates, and customer support via WhatsApp or Email.',
          'Optimizing ad performance and user experience across Meta, LinkedIn, and YouTube campaigns.',
          'Complying with applicable statutory, tax, and legal obligations.',
        ],
      },
      {
        heading: '5. Data Protection & Security',
        paragraphs: [
          'We maintain strict administrative, technical, and physical security measures to protect your personal information against unauthorized access, loss, or misuse.',
          'We do not sell, rent, or trade your personal information to third parties. Data is shared only with trusted service providers necessary for business operations (such as logistics partners and secure payment gateways).',
        ],
      },
      {
        heading: '6. Your Rights & Contact Information',
        paragraphs: [
          'You have the right to access, update, or request the deletion of your personal data held by us. For any privacy inquiries, data requests, or compliance questions, please contact us:',
          'Email: admin@pratyusha.in | support@healbypratyusha.com',
          'Website: https://crystals.healbypratyusha.com/',
        ],
      },
    ],
    te: [
      {
        heading: '1. పరిచయం',
        paragraphs: [
          'ప్రత్యూష మంగళగిరి ("మేము", "మా") crystals.healbypratyusha.com ను నిర్వహిస్తోంది. మీ గోప్యతను గౌరవించడం మరియు రక్షించడం మా ముఖ్య ఉద్దేశం. మెటా (ఫేస్‌బుక్ & ఇన్‌స్టాగ్రామ్), లింక్డ్‌ఇన్, యూట్యూబ్ / గూగుల్ యాడ్స్ ద్వారా వచ్చిన సందర్శకుల సమాచారాన్ని మేము ఎలా సేకరిస్తామో ఈ గోప్యతా విధానం వివరిస్తుంది.',
        ],
      },
      {
        heading: '2. మేము సేకరించే సమాచారం',
        paragraphs: [
          'మీరు ఆర్డర్లు చేసినప్పుడు లేదా సంప్రదింపు ఫారమ్‌లు నింపినప్పుడు మీ స్వచ్ఛందంగా అందించిన వివరాలను మేము సేకరిస్తాము:',
        ],
        listItems: [
          'సంప్రదింపు వివరాలు: పూర్తి పేరు, ఫోన్ నంబర్, వాట్సాప్ నంబర్, ఇమెయిల్ చిరునామా.',
          'షిప్పింగ్ వివరాలు: డెలివరీ చిరునామా, నగరం, రాష్ట్రం, పిన్ కోడ్.',
          'సాంకేతిక వివరాలు: IP చిరునామా, బ్రౌజర్ రకం మరియు కుకీ డేటా.',
        ],
      },
      {
        heading: '3. అడ్వర్టైజింగ్ మరియు కుకీలు (Meta, LinkedIn, YouTube Ads)',
        paragraphs: [
          'మా ప్రకటనల పనితీరును అంచనా వేయడానికి మేము మెటా పిక్సెల్ (Meta Pixel), లింక్డ్‌ఇన్ ఇన్‌సైట్ ట్యాగ్ (LinkedIn Insight Tag) మరియు గూగుల్ / యూట్యూబ్ యాడ్స్ ట్రాకింగ్ ట్యాగ్‌లను ఉపయోగిస్తాము. ఇవి అనధికారిక బ్రౌజింగ్ డేటాను విశ్లేషించి ప్రకటనల నాణ్యతను పెంచడానికి ఉపయోగపడతాయి.',
        ],
      },
      {
        heading: '4. సంప్రదింపులు',
        paragraphs: [
          'మీ గోప్యతా వివరాల కొరకు మాకు ఇమెయిల్ చేయండి: admin@pratyusha.in | support@healbypratyusha.com',
        ],
      },
    ],
  },
  'refund-cancellation-policy': {
    en: [
      {
        heading: '1. Strict No Return & No Refund Policy',
        paragraphs: [
          'Products once sold cannot be taken back, returned, exchanged, or refunded under any circumstances.',
          'All sales of crystal bracelets, energetic products, 21-day guidance programs, and personalized consultation sessions are final upon order placement and payment confirmation.',
        ],
      },
      {
        heading: '2. Rationale & Personalized Items',
        paragraphs: [
          'Each crystal bracelet is selected, cleansed, and prepared specifically for the individual customer and their personal energetic intention. Because of the personal and spiritual nature of these products and practitioner guidance time, returns or exchanges cannot be accepted.',
        ],
      },
      {
        heading: '3. Order Cancellations',
        paragraphs: [
          'Orders cannot be cancelled once they have been confirmed or processed for dispatch. Please review your selected items carefully prior to completing your purchase.',
        ],
      },
      {
        heading: '4. Damaged or Defective Items in Transit',
        paragraphs: [
          'In the rare event that a physical product arrives physically broken or damaged during transit, you must notify us within 24 hours of package delivery at admin@pratyusha.in.',
          'Notification must include continuous, unedited unboxing video proof clearly showing the sealed courier package being opened and the damage to the item. Upon verification, eligible items will be processed for a replacement. Cash refunds will not be issued.',
        ],
      },
    ],
    te: [
      {
        heading: '1. రద్దు మరియు వాపసు విధానం (No Refund Policy)',
        paragraphs: [
          'ఒకసారి విక్రయించిన వస్తువులు/ఉత్పత్తులు ఎట్టి పరిస్థితుల్లోనూ తిరిగి తీసుకోబడవు, మార్చబడవు లేదా రిఫండ్ చేయబడవు (Product once sold cannot be taken back).',
          'క్రిస్టల్ బ్రేస్‌లెట్లు, సాధన గైడెన్స్ మరియు వ్యక్తిగత సంప్రదింపులు అన్నీ ఖచ్చితమైన నిర్ణయాత్మక అమ్మకాలు.',
        ],
      },
      {
        heading: '2. ఆర్డర్ రద్దులు',
        paragraphs: ['ఆర్డర్ ప్రాసెస్ చేసిన తర్వాత రద్దు చేయడం కుదరదు.'],
      },
      {
        heading: '3. డెలివరీలో దెబ్బతిన్న వస్తువులు',
        paragraphs: [
          'ట్రాన్సిట్‌లో వస్తువు పగిలితే, డెలివరీ అయిన 24 గంటల్లోపు అన్‌బాక్సింగ్ వీడియో సాక్ష్యంతో admin@pratyusha.in కు తెలియజేయాలి.',
        ],
      },
    ],
  },
  'terms-and-conditions': {
    en: [
      {
        heading: '1. Agreement to Terms',
        paragraphs: [
          'By accessing crystals.healbypratyusha.com or purchasing crystal bracelets and guidance services, you agree to comply with and be bound by these Terms and Conditions.',
        ],
      },
      {
        heading: '2. Product & Outcome Disclaimer (No Guarantees Promised)',
        paragraphs: [
          'All crystal bracelets, natural stone accessories, 21-day guidance sessions, and ritual practices offered on this website are spiritual, mindfulness, and holistic reflection tools.',
          'We do not promise, guarantee, or warrant any specific medical, health, financial, career, relationship, or personal outcomes or results through the wearing or use of crystal bracelets. Individual experiences and results vary naturally.',
        ],
      },
      {
        heading: '3. Non-Medical & Professional Advisory Disclaimer',
        paragraphs: [
          'Crystal products and energy guidance are not intended to diagnose, treat, cure, or prevent any medical or psychological condition, nor do they replace certified medical treatment, professional financial counsel, or legal advice.',
        ],
      },
      {
        heading: '4. Intellectual Property',
        paragraphs: [
          'All content, images, designs, logos, text, and graphics on crystals.healbypratyusha.com are protected by copyright laws and remain the exclusive intellectual property of Pratyusha Mangalagiri.',
        ],
      },
    ],
    te: [
      {
        heading: '1. నిబంధనలు మరియు షరతులు',
        paragraphs: [
          'crystals.healbypratyusha.com ను ఉపయోగించడం ద్వారా మీరు ఈ నిబంధనలకు కట్టుబడి ఉండటానికి అంగీకరిస్తున్నారు.',
        ],
      },
      {
        heading: '2. ఉత్పత్తుల ఫలితాల నిరాకరణ (No Promised Outcomes)',
        paragraphs: [
          'క్రిస్టల్ బ్రేస్‌లెట్లు మరియు 21 రోజుల మార్గదర్శకత్వం కేవలం ఆధ్యాత్మిక మరియు ఆలోచనాత్మక సాధనాలు మాత్రమే. క్రిస్టల్ బ్రేస్‌లెట్ల వినియోగం ద్వారా నిర్దిష్ట ఆరోగ్య, ఆర్థిక లేదా వ్యక్తిగత ఫలితాలు లభిస్తాయని మేము ఏ హామీ లేదా ప్రామిస్ ఇవ్వడం లేదు (We are not promising any results).',
        ],
      },
    ],
  },
  'disclaimer': {
    en: [
      {
        heading: '1. General Spiritual Wellness Disclaimer',
        paragraphs: [
          'The products and guidance services presented on crystals.healbypratyusha.com are rooted in traditional holistic wellness and personal spiritual reflection.',
          'No promises, warranties, or guarantees of outcome—whether health-related, financial, professional, or personal—are made regarding any crystal bracelet or ritual service.',
        ],
      },
      {
        heading: '2. Medical & Professional Advisory Notice',
        paragraphs: [
          'Crystal therapy and energy wellness do not constitute medical, psychological, financial, or legal advice. Always consult qualified healthcare professionals or legal/financial advisors regarding medical conditions or professional decisions.',
        ],
      },
    ],
    te: [
      {
        heading: '1. నిరాకరణ ప్రకటన',
        paragraphs: [
          'మా ఉత్పత్తులు మరియు సేవలు కేవలం ఆధ్యాత్మిక మరియు హోలిస్టిక్ వెల్‌నెస్ కోసం మాత్రమే. ఇవి వైద్య సలహాకు ప్రత్యామ్నాయం కావు.',
        ],
      },
    ],
  },
  'cookie-policy': {
    en: [
      {
        heading: '1. Cookie Usage Notice',
        paragraphs: [
          'We use cookies, web beacons, and tracking pixels (including Meta Pixel, LinkedIn Tag, and Google Tag) to optimize site functionality, evaluate visitor interactions, and manage digital advertising campaigns across Meta, LinkedIn, and YouTube.',
          'You may adjust your browser cookie settings at any time to block or delete cookies.',
        ],
      },
    ],
    te: [
      {
        heading: '1. కుకీ విధానం',
        paragraphs: [
          'వెబ్‌సైట్ పనితీరును మెరుగుపరచడానికి మరియు సురక్షితమైన వినియోగానికి మేము కుకీలను ఉపయోగిస్తాము.',
        ],
      },
    ],
  },
};

@Component({
  selector: 'app-legal-placeholder-page',
  standalone: true,
  templateUrl: './legal-placeholder-page.html',
  styleUrl: './legal-placeholder-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPlaceholderPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly localeService = inject(LocaleService);
  protected readonly policy = signal<PolicyKey>('privacy-policy');

  protected readonly title = computed(
    () => POLICY_TITLES[this.policy()][this.localeService.language()],
  );
  protected readonly currentPolicySections = computed(
    () => POLICY_CONTENT[this.policy()][this.localeService.language()] || POLICY_CONTENT[this.policy()]['en'],
  );
  protected readonly copy = computed(() =>
    this.localeService.isTelugu()
      ? {
          eyebrow: 'చట్టపరమైన సమాచారం',
          notice: 'ఈ పేజీ ప్రత్యూష మంగళగిరి అధికారిక విధాన పత్రం.',
          home: 'హోమ్‌కు తిరిగి వెళ్లండి',
          lastUpdated: 'చివరిగా నవీకరించబడింది: ఆగస్టు 2026',
        }
      : {
          eyebrow: 'LEGAL INFORMATION',
          notice: 'Official compliance document for Pratyusha Mangalagiri.',
          home: 'Return to home',
          lastUpdated: 'Last updated: August 2026',
        },
  );

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const language: SupportedLanguage = params.get('language') === 'te' ? 'te' : 'en';
      const policyParam = params.get('policy') as PolicyKey | null;
      this.localeService.setLanguageFromRoute(language);
      if (policyParam && policyParam in POLICY_TITLES) {
        this.policy.set(policyParam);
      }
    });

    this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      const policyData = data['policy'] as PolicyKey | undefined;
      if (policyData && policyData in POLICY_TITLES) {
        this.policy.set(policyData);
      }
    });
  }
}
