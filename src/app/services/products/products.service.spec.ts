import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Product } from '../../types/product.type';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the remapDuplicateIds utility
vi.mock('../../utils/remapDuplicateIds', async () => {
  return {
    remapDuplicateIds: (products: Product[]) =>
      products.map((p) => ({ ...p, id: p.id + '_remapped' })),
  };
});

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Apple',
      price: 100,
      availableAmount: 5,
      minOrderAmount: 20,
    },
    {
      id: '2',
      name: 'Banana',
      price: 50,
      availableAmount: 10,
      minOrderAmount: 15,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should not fetch if products are already loaded', async () => {
    service.products.set(mockProducts);

    const result = await service.fetchProducts();

    expect(result).toBeUndefined();
    httpMock.expectNone(environment.apiProducts);
  });

  it('should fetch products if not already loaded', async () => {
    const fetchPromise = service.fetchProducts();

    const req = httpMock.expectOne(environment.apiProducts);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    const result = await fetchPromise;
    expect(result).toEqual(mockProducts);
  });

  it('should remap and set products', () => {
    service.remapFetchedProducts(mockProducts);

    const remapped = mockProducts.map((p) => ({
      ...p,
      id: p.id + '_remapped',
    }));
    expect(service.products()).toEqual(remapped);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no unexpected HTTP requests
  });
});
