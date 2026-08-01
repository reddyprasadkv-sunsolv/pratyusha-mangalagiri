import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PUBLIC_CONTENT } from '../content/public-content.data';
import { publicHomeMatcher, publicLegalMatcher } from '../../../app.routes';
import { UrlSegment } from '@angular/router';

describe('Public sales page configuration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('contains approved English and Telugu homepage content', () => {
    expect(PUBLIC_CONTENT.en.heroLine1).toBe('Give your idea');
    expect(PUBLIC_CONTENT.te.heroLine1).toBe('మీ ఆలోచనకు');
    expect(PUBLIC_CONTENT.en.form.name).toBe('Full Name');
    expect(PUBLIC_CONTENT.te.form.name).toBe('పూర్తి పేరు');
  });

  it('matches English, Telugu, and bilingual legal routes', () => {
    expect(publicHomeMatcher([])?.posParams?.['language'].path).toBe('en');
    expect(publicHomeMatcher([new UrlSegment('te', {})])?.posParams?.['language'].path).toBe('te');
    expect(publicLegalMatcher([new UrlSegment('privacy-policy', {})])).toBeTruthy();
    expect(
      publicLegalMatcher([new UrlSegment('te', {}), new UrlSegment('privacy-policy', {})]),
    ).toBeTruthy();
  });

  it('uses only the approved portrait and exposes no appointment or PDF content', () => {
    const serialized = JSON.stringify(PUBLIC_CONTENT).toLowerCase();
    expect(PUBLIC_CONTENT.en.heroAlt).toContain('traditional saree');
    expect(serialized).not.toContain('appointment booking');
    expect(serialized).not.toContain('pdf download');
  });
});
