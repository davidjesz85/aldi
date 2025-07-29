import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading.component';
import { MainNavigationComponent } from './shared/components/main-navigation/main-navigation.component';

@Component({
  imports: [LoadingComponent, RouterModule, MainNavigationComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'Aldi E-Commerce Demo';
}
