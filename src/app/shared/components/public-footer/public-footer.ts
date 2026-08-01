import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FooterLinkGroup } from '../../models/public-site.models';

@Component({
  selector: 'app-public-footer',
  standalone: true,
  templateUrl: './public-footer.html',
  styleUrl: './public-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicFooter {
  readonly statement = input.required<string>();
  readonly groups = input.required<readonly FooterLinkGroup[]>();
  readonly note = input.required<string>();
  readonly backToTop = input.required<string>();
}
