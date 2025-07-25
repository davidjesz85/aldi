import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../types/product.type';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { remapDuplicateIds } from '../../utils/remapDuplicateIds';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  env = environment;

  http = inject(HttpClient);

  products = signal<Product[]>([]);

  async fetchProducts(): Promise<Product[]> {
    if (this.products().length > 0) {
      console.log('ALREADY FETCHED PRODUCTS');
      return;
    }

    const products$ = this.http.get<Product[]>(`${this.env.apiProducts}`);
    console.log('Fetching DONE');
    return await firstValueFrom(products$);
  }

  remapFetchedProducts(products: Product[]) {
    const remappedProducts = remapDuplicateIds(products);
    this.products.set(remappedProducts);
    console.log('Products loaded successfully :', this.products());
  }
}
