import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NavigationItem } from '../../models/public-site.models';

@Component({
  selector: 'app-desktop-navigation',
  standalone: true,
  templateUrl: './desktop-navigation.html',
  styleUrl: './desktop-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopNavigation {
  readonly label = input.required<string>();
  readonly links = input.required<readonly NavigationItem[]>();
}
