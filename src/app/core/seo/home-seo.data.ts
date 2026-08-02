import { BilingualSeoContent, SupabaseSeoFields } from './seo.model';

export const SEO_SITE_NAME = 'Pratyusha';

export const HOME_SEO_CONTENT: BilingualSeoContent = {
  title: {
    en: 'Crystal Bracelets with 21-Day Guidance | Pratyusha',
    te: '21-Day మార్గదర్శనంతో క్రిస్టల్ బ్రేస్‌లెట్లు | Pratyusha',
  },
  description: {
    en: 'Explore intention-led crystal bracelets with personal guidance from Pratyusha and a proposed complimentary 21-day mindfulness, affirmation, and personal-action ritual. Offer details are subject to confirmation.',
    te: 'Pratyusha వ్యక్తిగత మార్గదర్శనంతో ఉద్దేశాన్ని గుర్తు చేసే క్రిస్టల్ బ్రేస్‌లెట్లు చూడండి. అదనపు ఫీజు లేకుండా అందించేందుకు ప్రతిపాదించిన 21 రోజుల మైండ్‌ఫుల్‌నెస్, అఫర్మేషన్ మరియు వ్యక్తిగత చర్యల సాధన వివరాలు నిర్ధారణకు లోబడి ఉంటాయి.',
  },
  ogTitle: {
    en: 'Crystal Bracelets with Personal 21-Day Guidance',
    te: 'వ్యక్తిగత 21-Day మార్గదర్శనంతో క్రిస్టల్ బ్రేస్‌లెట్లు',
  },
  ogDescription: {
    en: 'Discover four intention-led crystal bracelets with Pratyusha’s proposed 21-day mindfulness, affirmation, and personal-action practice.',
    te: 'Pratyusha ప్రతిపాదిత 21 రోజుల మైండ్‌ఫుల్‌నెస్, అఫర్మేషన్ మరియు వ్యక్తిగత చర్యల సాధనతో నాలుగు క్రిస్టల్ బ్రేస్‌లెట్లు చూడండి.',
  },
  ogImageUrl: null,
  ogImageAlt: {
    en: 'Pratyusha with the Success, Evil Eye Protection, Money Magnet, and Pyrite bracelet collection.',
    te: 'Success, Evil Eye Protection, Money Magnet, Pyrite బ్రేస్‌లెట్ కలెక్షన్‌తో Pratyusha.',
  },
  canonicalPath: { en: '/', te: '/te' },
  robots: 'index, follow',
  isIndexable: true,
  isPublished: true,
  approvalStatus: 'CLIENT REVIEW DRAFT',
};

export const HOME_SEO_SUPABASE_FIELDS: SupabaseSeoFields = {
  meta_title_en: HOME_SEO_CONTENT.title.en,
  meta_title_te: HOME_SEO_CONTENT.title.te,
  meta_description_en: HOME_SEO_CONTENT.description.en,
  meta_description_te: HOME_SEO_CONTENT.description.te,
  og_title_en: HOME_SEO_CONTENT.ogTitle.en,
  og_title_te: HOME_SEO_CONTENT.ogTitle.te,
  og_description_en: HOME_SEO_CONTENT.ogDescription.en,
  og_description_te: HOME_SEO_CONTENT.ogDescription.te,
  og_image_url: HOME_SEO_CONTENT.ogImageUrl,
  og_image_alt_en: HOME_SEO_CONTENT.ogImageAlt.en,
  og_image_alt_te: HOME_SEO_CONTENT.ogImageAlt.te,
  canonical_path_en: HOME_SEO_CONTENT.canonicalPath.en,
  canonical_path_te: HOME_SEO_CONTENT.canonicalPath.te,
  robots_directive: HOME_SEO_CONTENT.robots,
  is_indexable: HOME_SEO_CONTENT.isIndexable,
  is_published: HOME_SEO_CONTENT.isPublished,
};
