# React reference inventory

This inventory records the visual, content, and functional source material for the future Angular implementation. The reference was inspected read-only at:

- Repository: `reddyprasadkv-sunsolv/pratyusha-mangalagiri`
- Branch: `feature/bilingual-premium-sales-page`
- Commit: `a1f1675f60572c12950cf94f072bb54d1ece6252`
- Canonical content: `app/i18n.ts`
- Page composition: `app/components/HomeExperience.tsx`
- Visual tokens: `app/globals.css`

No React source or runtime is copied into the Angular scaffold. The immutable commit above remains the exact source of truth for every approved paragraph, list item, FAQ, testimonial disclaimer, form message, and legal-policy section.

## Page sections

The public page composition is:

1. announcement bar
2. sticky header, primary navigation, language switcher, mobile navigation, and header CTA
3. hero with founder portrait, primary and secondary CTAs, and clarity note
4. four-item trust strip
5. familiar-problem section
6. perspective/solution statement
7. three service cards
8. four business benefits
9. four-step working process
10. About Pratyusha/founder section using the same portrait
11. two sample testimonials with an explicit private-preview disclaimer
12. five FAQs
13. conversion CTA
14. contact details and lead form
15. footer navigation, legal links, contact area, and back-to-top action

## Approved bilingual content map

The following principal copy identifies each approved section. Supporting body copy, arrays, accessibility labels, placeholders, validation messages, footer copy, and legal text are preserved verbatim in `app/i18n.ts` at the reference commit.

| Area         | English                                                                                                            | Telugu                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Announcement | A thoughtful first conversation about your business                                                                | మీ వ్యాపారం గురించి శ్రద్ధతో కూడిన తొలి సంభాషణ                                                         |
| Studio label | BILINGUAL BUSINESS GROWTH STUDIO                                                                                   | TELUGU BUSINESS GROWTH STUDIO                                                                          |
| Hero         | Give your idea — a clear expression. Give your business — room to grow.                                            | మీ ఆలోచనకు — సరైన రూపం. మీ వ్యాపారానికి — స్థిరమైన ఎదుగుదల.                                            |
| Hero support | A thoughtful partnership that understands your story and presents your brand with clarity, beauty, and confidence. | మీ కథను అర్థం చేసుకుని, మీ బ్రాండ్‌ను స్పష్టంగా, అందంగా, నమ్మకంగా ప్రపంచానికి పరిచయం చేసే భాగస్వామ్యం. |
| Problem      | You know your business has potential. But is the direction clear?                                                  | మీలో సామర్థ్యం ఉంది. కానీ స్పష్టత లేదా?                                                                |
| Perspective  | It should not only look beautiful. It should work with purpose.                                                    | అందంగా కనిపించడం మాత్రమే కాదు. అర్థవంతంగా పనిచేయాలి.                                                   |
| Services     | Clear support for every meaningful stage                                                                           | ప్రతి దశకు స్పష్టమైన సహకారం                                                                            |
| Benefits     | More than a website.                                                                                               | ఒక వెబ్‌సైట్ కంటే ఎక్కువ.                                                                              |
| Process      | From uncertainty to a clear next step.                                                                             | గందరగోళం నుంచి స్పష్టమైన ముందడుగుకు.                                                                   |
| About        | A partner who sees your business as you do.                                                                        | మీ వ్యాపారాన్ని మీలా చూసే భాగస్వామి.                                                                   |
| Testimonials | Meaningful changes that began with trust                                                                           | నమ్మకం నుంచి మొదలైన అందమైన మార్పులు                                                                    |
| FAQ          | Helpful answers to the questions on your mind                                                                      | మీ మనసులో ఉన్న ప్రశ్నలకు సమాధానాలు                                                                     |
| Conversion   | Let’s talk about your idea. And see where it can go.                                                               | మీ ఆలోచన గురించి మాట్లాడదాం. అది ఎక్కడికి వెళ్లగలదో చూద్దాం.                                           |
| Contact      | We are ready to hear your story.                                                                                   | మీ కథను వినడానికి సిద్ధంగా ఉన్నాం.                                                                     |

Approved service names and intent:

- Brand Clarity / బ్రాండ్ స్పష్టత — audience, distinction, and brand memory
- Digital Presence / డిజిటల్ ప్రెజెన్స్ — website and digital experience
- Growth Strategy / గ్రోత్ వ్యూహం — a practical plan aligned to stage, goals, and resources

Approved process labels are Listen, Clarify, Build, Refine / వింటాం, స్పష్టం చేస్తాం, నిర్మిస్తాం, మెరుగుపరుస్తాం. The English values are Care, Clarity, Integrity, Quality; Telugu uses శ్రద్ధ, స్పష్టత, నిజాయితీ, నాణ్యత.

The two testimonials are explicitly sample preview content in both languages and must not be presented as verified customer endorsements until the client replaces or approves them.

## Images and portrait references

Reference public assets are:

- `public/images/client-traditional-saree.webp` — approved client portrait in a pink traditional saree; used in both the hero and About sections
- `public/og.jpg` — social sharing image
- `public/favicon.svg`, `public/file.svg`, `public/globe.svg`, and `public/window.svg` — existing public utility assets

Approved portrait alternative text:

- English: “Professional portrait of the founder in an elegant traditional saree”
- Telugu: “సాంప్రదాయ చీరలో సంస్థ వ్యవస్థాపకురాలి వృత్తిపరమైన చిత్రం”

The earlier `public/pratyusha-hero.webp` was removed on the reference branch and is not the approved portrait.

## Colours and fonts

Approved CSS tokens from `app/globals.css`:

| Token      | Value     |
| ---------- | --------- |
| Ivory      | `#f8f3ea` |
| Paper      | `#fffdf8` |
| Plum       | `#4b2238` |
| Deep plum  | `#321526` |
| Soft plum  | `#7b4f63` |
| Gold       | `#b89456` |
| Light gold | `#d7bd8a` |
| Ink        | `#251a1f` |
| Muted      | `#6f6267` |

Approved font families and weights:

- Manrope 400/500/600/700 for English sans-serif copy
- Georgia/Times New Roman for English display headings
- Noto Sans Telugu 400/500/600/700 for Telugu body and interface copy
- Noto Serif Telugu 600/700 for Telugu display copy

## Lead form

The reference form contains:

- required full name
- required mobile number
- optional email address
- optional city
- required requirement selector: Brand clarity, Website / digital presence, Growth strategy, or Other requirement
- optional message
- required consent checkbox
- hidden source URL and UTM attribution fields in the submitted draft payload

The reference implementation is preview-only: it stores a draft in session storage and displays a bilingual success notice stating that secure storage will activate when Supabase is connected. The Angular implementation must later validate and persist leads through a trusted server boundary; Step 1 adds no lead submission behavior.

## Legal pages

Five bilingual legal routes exist in English and Telugu:

- Privacy Policy / గోప్యతా విధానం
- Terms & Conditions / నిబంధనలు మరియు షరతులు
- Refund & Cancellation Policy / రిఫండ్ మరియు రద్దు విధానం
- Disclaimer / నిరాకరణ ప్రకటన
- Cookie Policy / కుకీ విధానం

All five are marked as draft content for client and legal review, with a reference last-updated date of 30 July 2026 and placeholder contact `hello@pratyusha.example`. They must remain draft until the client supplies final contact details and legal approval.
