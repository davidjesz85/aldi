import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardList } from '../../shared/components/product-card-list/product-card-list';
import { ProductsService } from '../../services/products/products.service';
import { LoadingService } from '../../shared/services/loading/loading.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCardList],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductsComponent {
  loadingService = inject(LoadingService);
  productsService = inject(ProductsService);

  constructor() {
    void this.fetchAllProducts();
  }

  products = signal([]);

  async fetchAllProducts() {
    try {
      this.loadingService.loadingOn();
      const products = await this.productsService.fetchProducts();

      if (products) {
        this.productsService.remapFetchedProducts(products);
      }
    } catch (error) {
      alert(`Error fetching products: ${error}`);
      console.error(error);
    } finally {
      console.log('Products fetch FINISHED');
      this.loadingService.loadingOff();
    }
  }
}
