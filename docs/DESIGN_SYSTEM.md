# Premium Angular design system

## Visual direction

The system combines deep plum, warm ivory, muted gold, serif display typography, generous whitespace, restrained borders, and soft elevation. It is designed to feel traditional and trustworthy without resembling a ceremonial or bridal theme.

## Tokens

`src/styles/_tokens.scss` defines:

- brand, accent, surface, text, success, warning, error, and focus colours
- subtle and strong borders
- four shadow levels
- small through pill border radii
- spacing from 4px through 96px plus fluid section spacing
- four container widths and a responsive gutter
- English and Telugu font stacks
- responsive text sizes
- fast, base, and slow transitions
- base, sticky, overlay, modal, and toast z-index levels
- breakpoints from 320px through 1920px

## Typography

- English interface: Manrope 400–700
- English premium display: Georgia fallback stack
- Telugu interface and body: Noto Sans Telugu 400–700
- Selected Telugu headings and quotations: Noto Serif Telugu 600–700

Telugu styles use normal letter spacing, a larger line height, balanced text wrapping, and fluid sizes to prevent clipping and crowded vowel signs.

## Shared components

- announcement bar
- public header
- desktop navigation
- mobile navigation
- language switcher
- primary and secondary button
- section heading
- content card
- image card
- testimonial card
- FAQ accordion
- CTA section
- form field and global form controls
- loading, empty, and error states
- public footer
- cookie notice shell
- public layout

## Accessibility

- visible high-contrast focus treatment
- skip link and semantic page landmarks
- touch targets of at least 44px
- labelled navigation and mobile dialog
- mobile menu Escape handling and focus return
- `aria-expanded`, `aria-controls`, and labelled FAQ regions
- live status, alert, and busy semantics
- associated form labels and explicit non-submitting preview note
- reduced-motion support
- no colour-only critical feedback

## Responsive coverage

The layout is designed and checked at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, and 1920 pixels. Grids collapse progressively, Telugu line height is preserved, controls remain touch-friendly, and the root document must not create horizontal scrolling.
