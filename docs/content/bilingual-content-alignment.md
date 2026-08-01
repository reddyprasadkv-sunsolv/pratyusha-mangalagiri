# Bilingual Crystal Content Alignment

- **Content Version:** 1.0
- **Status:** CLIENT REVIEW DRAFT
- **Date:** 1 August 2026
- **English source:** `final-english-content-review-draft.md`
- **Telugu source:** `telugu-content-review-draft.md`

## Alignment rule

Every public content item uses one stable base key and separate language values. English and Telugu must never be combined in one database field.

For every section base key, the following mapped fields exist:

| Content role             | English field                    | Telugu field                     |
| ------------------------ | -------------------------------- | -------------------------------- |
| Section name             | `{baseKey}.name.en`              | `{baseKey}.name.te`              |
| Main heading             | `{baseKey}.heading.en`           | `{baseKey}.heading.te`           |
| Supporting heading       | `{baseKey}.supportingHeading.en` | `{baseKey}.supportingHeading.te` |
| Body                     | `{baseKey}.body.en`              | `{baseKey}.body.te`              |
| Bullet item              | `{baseKey}.bullets.{index}.en`   | `{baseKey}.bullets.{index}.te`   |
| Primary CTA              | `{baseKey}.primaryCta.en`        | `{baseKey}.primaryCta.te`        |
| Secondary CTA            | `{baseKey}.secondaryCta.en`      | `{baseKey}.secondaryCta.te`      |
| Image alt text           | `{baseKey}.imageAlt.en`          | `{baseKey}.imageAlt.te`          |
| Missing-information note | `{baseKey}.missingInfo.en`       | `{baseKey}.missingInfo.te`       |
| Approval note            | `{baseKey}.approvalNote.en`      | `{baseKey}.approvalNote.te`      |

Status, publication flags, stable IDs, image IDs, display order, price values, stock values, delivery methods, and approval metadata are language-neutral fields and must not be duplicated as translated text.

## Section registry

| Order | Base key               | English section                     | Telugu section                                                 | Alignment status                           |
| ----- | ---------------------- | ----------------------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| 1     | `announcement`         | Announcement bar                    | ప్రకటన బార్                                                    | ALIGNED — CLIENT REVIEW DRAFT              |
| 2     | `header`               | Header navigation                   | హెడ్డర్ నావిగేషన్                                              | ALIGNED — CLIENT REVIEW DRAFT              |
| 3     | `hero`                 | Hero section                        | హీరో సెక్షన్                                                   | ALIGNED — CLIENT REVIEW DRAFT              |
| 4     | `differentiators`      | Trust or differentiator strip       | ప్రత్యేకతల స్ట్రిప్                                            | ALIGNED — CLIENT REVIEW DRAFT              |
| 5     | `challenge`            | Customer challenge                  | కస్టమర్ సవాలు                                                  | ALIGNED — CLIENT REVIEW DRAFT              |
| 6     | `support`              | Crystal-practice support            | క్రిస్టల్ సాధన ఎలా తోడ్పడవచ్చు                                 | ALIGNED — CLIENT REVIEW DRAFT              |
| 7     | `collection`           | Signature crystal collection        | సిగ్నేచర్ క్రిస్టల్ కలెక్షన్                                   | ALIGNED — CLIENT REVIEW DRAFT              |
| 8     | `products.success`     | Success Bracelet                    | Success Bracelet / సక్సెస్ బ్రేస్‌లెట్                         | ALIGNED — CLIENT REVIEW DRAFT              |
| 9     | `products.evilEye`     | Evil Eye Protection Bracelet        | Evil Eye Protection Bracelet / ఈవిల్ ఐ ప్రొటెక్షన్ బ్రేస్‌లెట్ | ALIGNED — CLIENT REVIEW DRAFT              |
| 10    | `products.moneyMagnet` | Money Magnet Bracelet               | Money Magnet Bracelet / మనీ మ్యాగ్నెట్ బ్రేస్‌లెట్             | ALIGNED — CLIENT REVIEW DRAFT              |
| 11    | `products.pyrite`      | Pyrite Bracelet                     | Pyrite Bracelet / పైరైట్ బ్రేస్‌లెట్                           | ALIGNED — CLIENT REVIEW DRAFT              |
| 12    | `ritual.overview`      | Complimentary 21-Day Crystal Ritual | అదనపు ఫీజు లేకుండా అందించే 21-Day Crystal Ritual               | ALIGNED — CLIENT REVIEW DRAFT              |
| 13    | `ritual.inclusions`    | Ritual inclusions                   | రిచువల్‌లో ఉండే అంశాలు                                         | ALIGNED — CONFIRMATIONS PENDING            |
| 14    | `audience`             | Who this experience is for          | ఈ అనుభవం ఎవరి కోసం                                             | ALIGNED — CLIENT REVIEW DRAFT              |
| 15    | `experienceDifference` | What makes it different             | ఈ అనుభవం ప్రత్యేకత                                             | ALIGNED — CLIENT REVIEW DRAFT              |
| 16    | `process`              | Crystal journey process             | క్రిస్టల్ జర్నీ విధానం                                         | ALIGNED — OPERATIONS PENDING               |
| 17    | `founder`              | About Pratyusha                     | Pratyusha గురించి                                              | ALIGNED — CLIENT REVIEW DRAFT              |
| 18    | `credentials`          | Professional credentials            | వృత్తిపరమైన అర్హతలు                                            | ALIGNED — CONFIRMATION PENDING             |
| 19    | `testimonials`         | Testimonials                        | టెస్టిమోనియల్స్                                                | ALIGNED — KEEP HIDDEN                      |
| 20    | `faq`                  | Frequently asked questions          | సాధారణ ప్రశ్నలు                                                | ALIGNED — ANSWERS PARTLY PENDING           |
| 21    | `disclaimer`           | Wellness disclaimer                 | వెల్‌నెస్ డిస్క్లైమర్                                          | ALIGNED — LEGAL AND CLIENT REVIEW REQUIRED |
| 22    | `finalCta`             | Final CTA                           | చివరి కాల్ టు యాక్షన్                                          | ALIGNED — CLIENT REVIEW DRAFT              |
| 23    | `ordering`             | Enquiry/WhatsApp order              | ఎంక్వైరీ లేదా WhatsApp ఆర్డర్                                  | ALIGNED — OPERATIONS PENDING               |
| 24    | `contact`              | Contact                             | సంప్రదింపు                                                     | ALIGNED — CLIENT INPUT PENDING             |
| 25    | `footer`               | Footer description                  | ఫుటర్ వివరణ                                                    | ALIGNED — CLIENT REVIEW DRAFT              |
| 26    | `seo`                  | SEO content                         | SEO కంటెంట్                                                    | ALIGNED — CLIENT REVIEW DRAFT              |
| 27    | `socialSharing`        | Social-sharing content              | సోషల్ షేరింగ్ కంటెంట్                                          | ALIGNED — CLIENT REVIEW DRAFT              |

## Heading and CTA value alignment

| Base key               | English heading                                                              | Telugu heading                                                                            | English primary CTA                     | Telugu primary CTA                        |
| ---------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------- |
| `announcement`         | A complimentary 21-Day Crystal Ritual with every eligible bracelet purchase. | అర్హత ఉన్న ప్రతి బ్రేస్‌లెట్ కొనుగోలుతో అదనపు ఫీజు లేకుండా అందించే 21-Day Crystal Ritual. | Explore the Experience                  | ఈ అనుభవం గురించి తెలుసుకోండి              |
| `header`               | Client-approved brand name required                                          | క్లయింట్ ఆమోదించిన బ్రాండ్ పేరు అవసరం                                                     | Explore the Crystal Collection          | క్రిస్టల్ కలెక్షన్ చూడండి                 |
| `hero`                 | Transform Your Energy. Transform Your Life.                                  | మీ ఎనర్జీని మార్చుకోండి. మీ జీవితంలో మార్పుకు అడుగు వేయండి.                               | Explore the Crystal Collection          | క్రిస్టల్ కలెక్షన్ చూడండి                 |
| `differentiators`      | A More Personal Crystal Experience                                           | మరింత వ్యక్తిగతమైన క్రిస్టల్ అనుభవం                                                       | Not required                            | అవసరం లేదు                                |
| `challenge`            | When Your Intentions Are Clear but Consistency Feels Difficult               | మీ ఉద్దేశం స్పష్టంగా ఉన్నా, క్రమంగా కొనసాగించడం కష్టంగా అనిపిస్తుందా?                     | See How the Practice Works              | ఈ సాధన ఎలా పనిచేస్తుందో చూడండి            |
| `support`              | A Daily Reminder for Your Intentions                                         | మీ ఉద్దేశాన్ని గుర్తు చేసే రోజువారీ సహచరం                                                 | Choose an Intention                     | మీ ఉద్దేశాన్ని ఎంచుకోండి                  |
| `collection`           | The Signature Crystal Collection                                             | సిగ్నేచర్ క్రిస్టల్ కలెక్షన్                                                              | Choose Your Crystal                     | మీ క్రిస్టల్‌ను ఎంచుకోండి                 |
| `products.success`     | Success Bracelet                                                             | Success Bracelet / సక్సెస్ బ్రేస్‌లెట్                                                    | Enquire About the Success Bracelet      | Success Bracelet గురించి అడగండి           |
| `products.evilEye`     | Evil Eye Protection Bracelet                                                 | Evil Eye Protection Bracelet / ఈవిల్ ఐ ప్రొటెక్షన్ బ్రేస్‌లెట్                            | Enquire About the Evil Eye Bracelet     | Evil Eye Bracelet గురించి అడగండి          |
| `products.moneyMagnet` | Money Magnet Bracelet                                                        | Money Magnet Bracelet / మనీ మ్యాగ్నెట్ బ్రేస్‌లెట్                                        | Enquire About the Money Magnet Bracelet | Money Magnet Bracelet గురించి అడగండి      |
| `products.pyrite`      | Pyrite Bracelet                                                              | Pyrite Bracelet / పైరైట్ బ్రేస్‌లెట్                                                      | Enquire About the Pyrite Bracelet       | Pyrite Bracelet గురించి అడగండి            |
| `ritual.overview`      | Guidance Beyond the Bracelet                                                 | బ్రేస్‌లెట్‌తో పాటు మార్గదర్శనం                                                           | Learn About the 21-Day Ritual           | 21-Day Crystal Ritual గురించి తెలుసుకోండి |
| `ritual.inclusions`    | Your Proposed 21-Day Practice                                                | ప్రతిపాదిత 21 రోజుల సాధన                                                                  | Ask About the Ritual                    | రిచువల్ గురించి అడగండి                    |
| `audience`             | For People Who Want a More Intentional Daily Practice                        | మరింత ఉద్దేశ్యపూర్వకమైన రోజువారీ సాధన కోరుకునేవారి కోసం                                   | Explore the Collection                  | క్రిస్టల్ కలెక్షన్ చూడండి                 |
| `experienceDifference` | What Makes This Crystal Journey Different                                    | ఈ క్రిస్టల్ జర్నీ ప్రత్యేకత ఏమిటి?                                                        | Meet Pratyusha                          | Pratyusha గురించి తెలుసుకోండి             |
| `process`              | Your Crystal Journey                                                         | మీ క్రిస్టల్ జర్నీ                                                                        | Begin Your Crystal Journey              | మీ క్రిస్టల్ జర్నీని ప్రారంభించండి        |
| `founder`              | Personal Guidance from Pratyusha                                             | Pratyusha నుంచి వ్యక్తిగత మార్గదర్శనం                                                     | Discover the 21-Day Approach            | 21-Day విధానం గురించి తెలుసుకోండి         |
| `credentials`          | Professional Background                                                      | వృత్తిపరమైన నేపథ్యం                                                                       | Not required                            | అవసరం లేదు                                |
| `testimonials`         | Customer Experiences                                                         | కస్టమర్ అనుభవాలు                                                                          | Not required                            | అవసరం లేదు                                |
| `faq`                  | Frequently Asked Questions                                                   | సాధారణ ప్రశ్నలు                                                                           | Ask a Question                          | మీ ప్రశ్న అడగండి                          |
| `disclaimer`           | A Note About Crystal and Wellness Practices                                  | క్రిస్టల్ మరియు వెల్‌నెస్ సాధనల గురించి ఒక గమనిక                                          | Not required                            | అవసరం లేదు                                |
| `finalCta`             | Begin with One Intentional Step                                              | ఒక ఉద్దేశ్యపూర్వక అడుగుతో ప్రారంభించండి                                                   | Explore the Crystal Collection          | క్రిస్టల్ కలెక్షన్ చూడండి                 |
| `ordering`             | Ready to Ask About a Bracelet?                                               | బ్రేస్‌లెట్ గురించి అడగాలనుకుంటున్నారా?                                                   | Order Through WhatsApp                  | WhatsApp ద్వారా ఆర్డర్ చేయండి             |
| `contact`              | Contact Pratyusha                                                            | Pratyushaను సంప్రదించండి                                                                  | Send an Enquiry                         | వివరాలు పంపండి                            |
| `footer`               | Crystal bracelets, personal guidance, and a 21-day intention practice.       | క్రిస్టల్ బ్రేస్‌లెట్లు, వ్యక్తిగత మార్గదర్శనం, 21 రోజుల ఉద్దేశ సాధన.                     | Back to Top                             | పేజీ పైకి వెళ్లండి                        |
| `seo`                  | Transform Your Energy. Transform Your Life.                                  | మీ ఎనర్జీని మార్చుకోండి. మీ జీవితంలో మార్పుకు అడుగు వేయండి.                               | Not applicable                          | వర్తించదు                                 |
| `socialSharing`        | Begin Your Crystal Journey with Intention                                    | ఉద్దేశంతో మీ క్రిస్టల్ జర్నీని ప్రారంభించండి                                              | Explore the Crystal Collection          | క్రిస్టల్ కలెక్షన్ చూడండి                 |

## Stable array-item keys

### Differentiators

- `differentiators.bullets.0`: selected-with-care statement
- `differentiators.bullets.1`: personal guidance
- `differentiators.bullets.2`: complimentary 21-day practice
- `differentiators.bullets.3`: mindfulness, habits, and action

### Support points

- `support.bullets.0`: intention-setting support
- `support.bullets.1`: positive habits
- `support.bullets.2`: focus on selected goals
- `support.bullets.3`: complementary mindfulness/self-care use

### Products

Each product uses:

- `{productKey}.name.en` / `{productKey}.name.te`
- `{productKey}.positioning.en` / `{productKey}.positioning.te`
- `{productKey}.description.en` / `{productKey}.description.te`
- `{productKey}.benefits.{index}.en` / `{productKey}.benefits.{index}.te`
- `{productKey}.primaryCta.en` / `{productKey}.primaryCta.te`
- `{productKey}.secondaryCta.en` / `{productKey}.secondaryCta.te`
- `{productKey}.imageAlt.en` / `{productKey}.imageAlt.te`
- `{productKey}.disclaimer.en` / `{productKey}.disclaimer.te`

Stable product keys and benefit counts:

| Product key            | Official name                | Benefit keys              | Alignment            |
| ---------------------- | ---------------------------- | ------------------------- | -------------------- |
| `products.success`     | Success Bracelet             | `benefits.0`–`benefits.3` | 4 English / 4 Telugu |
| `products.evilEye`     | Evil Eye Protection Bracelet | `benefits.0`–`benefits.3` | 4 English / 4 Telugu |
| `products.moneyMagnet` | Money Magnet Bracelet        | `benefits.0`–`benefits.3` | 4 English / 4 Telugu |
| `products.pyrite`      | Pyrite Bracelet              | `benefits.0`–`benefits.3` | 4 English / 4 Telugu |

### Ritual inclusion keys

| Stable key                         | English label                    | Telugu label                         | Status                       |
| ---------------------------------- | -------------------------------- | ------------------------------------ | ---------------------------- |
| `ritual.inclusions.cleansing`      | Crystal cleansing guidance       | క్రిస్టల్ క్లీన్సింగ్ మార్గదర్శనం    | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.intention`      | Daily intention-setting practice | రోజువారీ ఉద్దేశం సాధన                | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.affirmations`   | Guided affirmations              | గైడెడ్ అఫర్మేషన్స్                   | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.alignment`      | Energy-alignment practices       | ఎనర్జీ-అలైన్‌మెంట్ సాధనలు            | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.journaling`     | Guided journaling prompts        | ఆలోచన కోసం గైడెడ్ జర్నలింగ్ ప్రశ్నలు | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.gratitude`      | Gratitude rituals                | కృతజ్ఞత సాధనలు                       | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.activation`     | Crystal activation guidance      | క్రిస్టల్ యాక్టివేషన్ మార్గదర్శనం    | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.liveGroup`      | Weekly live group guidance       | వారానికి ఒక లైవ్ గ్రూప్ మార్గదర్శనం  | CLIENT CONFIRMATION REQUIRED |
| `ritual.inclusions.accountability` | Motivation and accountability    | ప్రేరణ మరియు బాధ్యత గుర్తుచేయడం      | CLIENT CONFIRMATION REQUIRED |

### Audience keys

- `audience.bullets.0`: working professionals and business owners
- `audience.bullets.1`: entrepreneurs and students
- `audience.bullets.2`: homemakers
- `audience.bullets.3`: spiritual seekers
- `audience.bullets.4`: mindfulness/intention/personal-growth beginners

### Experience-difference keys

- `experienceDifference.bullets.0`: bracelet selected with care
- `experienceDifference.bullets.1`: personal guidance
- `experienceDifference.bullets.2`: complimentary 21-day practice
- `experienceDifference.bullets.3`: guided intention/affirmation activities
- `experienceDifference.bullets.4`: reflection plus practical action

### Process keys

Each step has `.title.en`, `.title.te`, `.description.en`, and `.description.te`:

- `process.steps.choose`
- `process.steps.confirm`
- `process.steps.receive`
- `process.steps.practise`
- `process.steps.continue`

### Credential keys

Credentials remain unpublished and unverified:

- `credentials.lawOfAttractionLifeCoach`
- `credentials.crystalHealer`
- `credentials.energyHealer`
- `credentials.tarotReader`
- `credentials.akashicPractitioner`
- `credentials.subconsciousMindCoach`

Each record requires `title_en`, `title_te`, `confirmationStatus`, `certificationStatus`, `publicDisplayApproved`, and `evidenceReference`. Telugu titles must not be finalised before the official English title is verified.

## FAQ key alignment

### Supported source questions

| Stable key                | English question                         | Telugu question                            | Answer status                           |
| ------------------------- | ---------------------------------------- | ------------------------------------------ | --------------------------------------- |
| `faq.naturalCrystals`     | Are these natural crystals?              | ఇవి సహజమైన క్రిస్టల్సా?                    | CLIENT INPUT REQUIRED                   |
| `faq.spiritualExperience` | Do I need previous spiritual experience? | ఇంతకు ముందు ఆధ్యాత్మిక సాధన అనుభవం అవసరమా? | CLIENT REVIEW DRAFT                     |
| `faq.dailyWear`           | Can I wear my bracelet every day?        | బ్రేస్‌లెట్‌ను ప్రతిరోజూ ధరించవచ్చా?       | CLIENT REVIEW DRAFT; care facts pending |
| `faq.ritualExperience`    | What happens during the 21-Day Ritual?   | 21-Day Ritualలో ఏమి జరుగుతుంది?            | CLIENT REVIEW DRAFT; inclusions pending |

Every FAQ record uses `.question.en`, `.question.te`, `.answer.en`, `.answer.te`, `status`, and `published`.

### Pending question keys

- `faq.selectBracelet`
- `faq.sizes`
- `faq.materials`
- `faq.treatments`
- `faq.cleaning`
- `faq.deliveryTimeline`
- `faq.cashOnDelivery`
- `faq.paymentMethods`
- `faq.returnsExchange`
- `faq.damagedDelivery`
- `faq.ritualOnline`
- `faq.weeklyLiveGuidance`

Pending questions have aligned English/Telugu questions but no publishable answer until client input is supplied.

## CTA key alignment

| Stable key              | English                        | Telugu                                    |
| ----------------------- | ------------------------------ | ----------------------------------------- |
| `cta.exploreCollection` | Explore the Crystal Collection | క్రిస్టల్ కలెక్షన్ చూడండి                 |
| `cta.chooseCrystal`     | Choose Your Crystal            | మీ క్రిస్టల్‌ను ఎంచుకోండి                 |
| `cta.beginJourney`      | Begin Your Crystal Journey     | మీ క్రిస్టల్ జర్నీని ప్రారంభించండి        |
| `cta.orderWhatsapp`     | Order Through WhatsApp         | WhatsApp ద్వారా ఆర్డర్ చేయండి             |
| `cta.sendEnquiry`       | Send an Enquiry                | వివరాలు పంపండి                            |
| `cta.learnRitual`       | Learn About the 21-Day Ritual  | 21-Day Crystal Ritual గురించి తెలుసుకోండి |

## SEO and social key alignment

| Base key               | English field                 | Telugu field                  | Status                                   |
| ---------------------- | ----------------------------- | ----------------------------- | ---------------------------------------- |
| Homepage title         | `seo.title.en`                | `seo.title.te`                | CLIENT REVIEW DRAFT                      |
| Meta description       | `seo.description.en`          | `seo.description.te`          | CLIENT REVIEW DRAFT                      |
| H1                     | `seo.h1.en`                   | `seo.h1.te`                   | CLIENT REVIEW DRAFT                      |
| Open Graph title       | `seo.openGraphTitle.en`       | `seo.openGraphTitle.te`       | CLIENT REVIEW DRAFT                      |
| Open Graph description | `seo.openGraphDescription.en` | `seo.openGraphDescription.te` | CLIENT REVIEW DRAFT                      |
| Social image alt       | `seo.socialImageAlt.en`       | `seo.socialImageAlt.te`       | CLIENT REVIEW DRAFT; asset facts pending |
| Share heading          | `socialSharing.heading.en`    | `socialSharing.heading.te`    | CLIENT REVIEW DRAFT                      |
| Share description      | `socialSharing.body.en`       | `socialSharing.body.te`       | CLIENT REVIEW DRAFT                      |

## Disclaimer alignment

- English: `disclaimer.body.en`
- Telugu: `disclaimer.body.te`
- Shared status: `LEGAL AND CLIENT REVIEW REQUIRED`
- Shared publication state: `false`

Both versions state that crystals complement mindfulness and personal-wellness practices, are not medical treatment or professional advice, do not guarantee outcomes, and should be combined with practical action and professional help where necessary.

## Missing-marker alignment

All unresolved operational facts use the exact internal form `[CLIENT INPUT REQUIRED: description]`. The marker must be removed from both languages only after the underlying fact is supplied, verified, and approved. Public components must never render a record containing this marker.

## Implementation field map

| Typed property | Supabase-ready fields              |
| -------------- | ---------------------------------- |
| Title          | `title_en`, `title_te`             |
| Description    | `description_en`, `description_te` |
| Button text    | `button_text_en`, `button_text_te` |
| Image alt      | `alt_text_en`, `alt_text_te`       |
| FAQ question   | `question_en`, `question_te`       |
| FAQ answer     | `answer_en`, `answer_te`           |
| Disclaimer     | `disclaimer_en`, `disclaimer_te`   |

Language-neutral fields include `id`, `status`, `published`, `display_order`, `asset_id`, `price`, `currency`, `stock_status`, `delivery_method`, `frequency`, `duration`, `client_approved_at`, `legal_approved_at`, and `wellness_approved_at`.

This contract allows future Supabase loading without redesigning Angular components. No database or Angular implementation is part of Step 3B.
