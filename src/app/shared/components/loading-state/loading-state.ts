import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  templateUrl: './loading-state.html',
  styleUrl: './loading-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingState {
  readonly label = input('Loading');
}
