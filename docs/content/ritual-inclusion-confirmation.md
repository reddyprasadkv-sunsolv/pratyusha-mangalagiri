# 21-Day Crystal Ritual — Inclusion Confirmation

- **Content Version:** 1.0
- **Status:** CLIENT CONFIRMATION REQUIRED
- **Date:** 1 August 2026
- **Public-use rule:** Only rows marked CONFIRMED may appear as included

Allowed final statuses are **CONFIRMED**, **CLIENT CONFIRMATION REQUIRED**, and **REMOVE**. No inclusion has been confirmed in the repository. No downloadable PDF delivery is proposed or permitted.

## Inclusion table

| Inclusion                             | Customer-facing wording                                                      | Delivery method                                                                                                              | Frequency                                            | Duration                                                  | Confirmed status             | Client input required                                                                      |
| ------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| Crystal cleansing guidance            | Simple guidance for caring for and cleansing your bracelet                   | [CLIENT INPUT REQUIRED: WhatsApp text, WhatsApp audio, recorded video, email, live online group session, or private session] | [CLIENT INPUT REQUIRED: Frequency]                   | [CLIENT INPUT REQUIRED: Duration/access]                  | CLIENT CONFIRMATION REQUIRED | Confirm content, terminology, channel, timing, and whether it is included                  |
| Daily intention-setting practice      | A short daily practice to choose and remember your intention                 | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Daily or another frequency]  | [CLIENT INPUT REQUIRED: Number of days/access]            | CLIENT CONFIRMATION REQUIRED | Confirm exact activity, delivery, schedule, and inclusion                                  |
| Guided affirmations                   | Guided affirmations intended to support a consistent personal practice       | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Frequency]                   | [CLIENT INPUT REQUIRED: Duration/access]                  | CLIENT CONFIRMATION REQUIRED | Confirm wording, format, delivery, and inclusion                                           |
| Energy-alignment practices            | Proposed wording withheld until “energy alignment” is defined and reviewed   | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Frequency]                   | [CLIENT INPUT REQUIRED: Duration/access]                  | CLIENT CONFIRMATION REQUIRED | Define the practice; complete wellness/legal review; confirm or REMOVE                     |
| Manifestation journaling prompts      | Guided reflection and journaling prompts                                     | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Frequency]                   | [CLIENT INPUT REQUIRED: Duration/access]                  | CLIENT CONFIRMATION REQUIRED | Approve “guided reflection” or “manifestation” wording; confirm delivery and inclusion     |
| Gratitude rituals                     | Simple gratitude prompts for a regular reflective practice                   | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Frequency]                   | [CLIENT INPUT REQUIRED: Duration/access]                  | CLIENT CONFIRMATION REQUIRED | Confirm activity, delivery, schedule, and inclusion                                        |
| Crystal activation guidance           | Proposed wording withheld until “crystal activation” is defined and reviewed | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Frequency]                   | [CLIENT INPUT REQUIRED: Duration/access]                  | CLIENT CONFIRMATION REQUIRED | Define the practice; complete wellness/legal review; confirm or REMOVE                     |
| Weekly live group guidance            | A live online group session for confirmed guidance topics                    | [CLIENT INPUT REQUIRED: Live platform or REMOVE]                                                                             | [CLIENT INPUT REQUIRED: Weekly schedule]             | [CLIENT INPUT REQUIRED: Session length and access period] | CLIENT CONFIRMATION REQUIRED | Confirm whether included, platform, time, group size, recording, privacy, and facilitation |
| Ongoing motivation and accountability | Agreed reminders or check-ins to support consistency during the 21 days      | [CLIENT INPUT REQUIRED: Delivery method]                                                                                     | [CLIENT INPUT REQUIRED: Frequency and support hours] | [CLIENT INPUT REQUIRED: 21 days or another period]        | CLIENT CONFIRMATION REQUIRED | Define channel, response expectation, boundaries, privacy, and inclusion                   |

## Overall ritual decisions

- [CLIENT INPUT REQUIRED: Final public name — “21-Day Crystal Ritual” or another approved name]
- [CLIENT INPUT REQUIRED: Confirm whether “complimentary” is accurate]
- [CLIENT INPUT REQUIRED: Confirm eligible products]
- [CLIENT INPUT REQUIRED: Confirm whether every eligible customer receives the same programme]
- [CLIENT INPUT REQUIRED: Confirm start date/process]
- [CLIENT INPUT REQUIRED: Confirm whether days are consecutive]
- [CLIENT INPUT REQUIRED: Confirm whether content is automated, live, or manually delivered]
- [CLIENT INPUT REQUIRED: Confirm primary delivery channel]
- [CLIENT INPUT REQUIRED: Confirm access period]
- [CLIENT INPUT REQUIRED: Confirm support days and hours]
- [CLIENT INPUT REQUIRED: Confirm response-time expectations]
- [CLIENT INPUT REQUIRED: Confirm group/community access, visibility, moderation, and privacy]
- [CLIENT INPUT REQUIRED: Confirm whether private sessions are included]
- [CLIENT INPUT REQUIRED: Confirm missed-day and late-start handling]
- [CLIENT INPUT REQUIRED: Confirm age or participation restrictions]

## Customer-facing publication rule

1. Change a row to **CONFIRMED** only after the client supplies all delivery, frequency, duration, and scope details.
2. Change a row to **REMOVE** when the inclusion is not offered.
3. Remove internal markers before publication.
4. Keep customer-facing English and Telugu wording aligned.
5. Do not publish “if applicable.”
6. Do not describe PDF delivery, generation, preview, export, download, or website document delivery.
7. Do not imply that any ritual activity guarantees a health, financial, career, relationship, business, protection, or personal outcome.

## Angular and future data mapping

Each inclusion can later map to a `RitualContent` child record with:

- `id`
- `label_en`
- `label_te`
- `description_en`
- `description_te`
- `delivery_method`
- `frequency`
- `duration`
- `status`
- `published`
- `display_order`
- `client_approved_at`
- `wellness_approved_at`
- `legal_approved_at`

Records with a status other than **CONFIRMED** must remain unpublished.
