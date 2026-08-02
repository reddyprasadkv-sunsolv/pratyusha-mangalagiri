-- Structural local seed only. No administrator, PII, contact, price, stock,
-- testimonial, credential, legal, ritual, or publication claims are inserted.

insert into public.site_settings (
  site_key,
  default_language,
  is_maintenance_mode,
  is_published
)
values ('primary', 'en', false, false)
on conflict (site_key) do nothing;

insert into public.products (
  product_key,
  slug,
  name_en,
  name_te,
  display_order,
  is_visible,
  status
)
values
  ('success-bracelet', 'success-bracelet', 'Success Bracelet', 'సక్సెస్ బ్రేస్‌లెట్', 10, false, 'draft'),
  (
    'evil-eye-protection-bracelet',
    'evil-eye-protection-bracelet',
    'Evil Eye Protection Bracelet',
    'ఈవిల్ ఐ ప్రొటెక్షన్ బ్రేస్‌లెట్',
    20,
    false,
    'draft'
  ),
  (
    'money-magnet-bracelet',
    'money-magnet-bracelet',
    'Money Magnet Bracelet',
    'మనీ మ్యాగ్నెట్ బ్రేస్‌లెట్',
    30,
    false,
    'draft'
  ),
  ('pyrite-bracelet', 'pyrite-bracelet', 'Pyrite Bracelet', 'పైరైట్ బ్రేస్‌లెట్', 40, false, 'draft')
on conflict (product_key) do nothing;
