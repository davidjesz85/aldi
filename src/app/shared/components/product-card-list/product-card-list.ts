import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../types/product.type';
import { ProductsService } from '../../../services/products/products.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from '../../../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-card-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './product-card-list.html',
  styleUrl: './product-card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductCardList {
  shoppingCartService = inject(ShoppingCartService);
  productService = inject(ProductsService);

  products = input.required<Product[]>();

  quantityControls = computed(() => {
    if (this.productService.products().length) {
      this.products().forEach((product) => {
        return product.id;
      });
    }
  });

  getCartAmountSignal(productId: string) {
    return computed(() => {
      const product = this.shoppingCartService
        .shoppingCart()
        .find((p) => p.id === productId);

      return product?.totalAmount ?? 0;
    });
  }

  addToCart(
    productId: string,
    amount: number,
    price: number,
    name: string,
    img: string
  ) {
    this.productService.products.update((products) =>
      products.map((product) => {
        if (product.id === productId) {
          this.quantityControls[productId] = undefined;

          return {
            ...product,
            availableAmount: product.availableAmount - amount,
          };
        }

        return product;
      })
    );

    this.shoppingCartService.shoppingCart.update((cart) => {
      const existing = cart.find((p) => p.id === productId);

      if (existing) {
        return cart.map((product) =>
          product.id === productId
            ? {
                ...product,
                img: product.img,
                totalAmount: product.totalAmount + amount,
                totalPrice: product.totalPrice + amount * price,
              }
            : product
        );
      }

      return [
        ...cart,
        {
          id: productId,
          img: img,
          totalAmount: amount,
          totalPrice: price * amount,
          name,
        },
      ];
    });

    this.getCartAmountSignal(productId);
  }
}
