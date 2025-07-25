import { computed, Injectable, signal } from '@angular/core';
import { ShoppingCartItem } from '../../types/shopping-cart.type';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart = signal<ShoppingCartItem[]>([]);

  calculateTotalPrice = computed(() => {
    return this.shoppingCart().reduce((sum, item) => sum + item.totalPrice, 0);
  });
}
