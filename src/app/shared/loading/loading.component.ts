import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoadingComponent {
  loadingService = inject(LoadingService);

  loading = this.loadingService.loading;
}
