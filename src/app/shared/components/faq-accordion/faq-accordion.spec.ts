import { TestBed } from '@angular/core/testing';

import { FaqAccordion } from './faq-accordion';

describe('FaqAccordion', () => {
  it('connects controls to regions and toggles expanded state', async () => {
    await TestBed.configureTestingModule({ imports: [FaqAccordion] }).compileComponents();
    const fixture = TestBed.createComponent(FaqAccordion);
    fixture.componentRef.setInput('items', [
      { question: 'First question', answer: 'First answer' },
      { question: 'Second question', answer: 'Second answer' },
    ]);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    const panels = fixture.nativeElement.querySelectorAll(
      '[role="region"]',
    ) as NodeListOf<HTMLElement>;

    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[0].getAttribute('aria-controls')).toBe(panels[0].id);
    expect(panels[1].hidden).toBe(true);

    buttons[1].click();
    fixture.detectChanges();

    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(panels[1].hidden).toBe(false);
  });
});
