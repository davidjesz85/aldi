import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { MatTableModule } from '@angular/material/table';
import { ShoppingCartItem } from '../../types/shopping-cart.type';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, MatTableModule, NgOptimizedImage],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ShoppingCartComponent {
  shoppingCartService = inject(ShoppingCartService);

  displayedColumns: string[] = ['name', 'amount', 'price'];
  tableData: ShoppingCartItem[] = this.shoppingCartService.shoppingCart();
}
