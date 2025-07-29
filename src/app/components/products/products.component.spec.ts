import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi } from 'vitest';
import { ProductsComponent } from './products.component';
import { ProductsService } from '../../services/products/products.service';
import { LoadingService } from '../../shared/services/loading/loading.service';

describe('ProductsComponent', () => {
  const mockProducts = [
    { id: '1', name: 'Item A', totalPrice: 100, amount: 1 },
    { id: '2', name: 'Item B', totalPrice: 200, amount: 1 },
  ];

  vi.stubGlobal('alert', vi.fn());
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  vi.spyOn(console, 'error').mockImplementation(() => {});

  async function createComponent({
    productsServiceOverrides = {},
    loadingServiceOverrides = {},
  }: {
    productsServiceOverrides?: Record<string, any>;
    loadingServiceOverrides?: Record<string, any>;
  }) {
    const productsServiceMock = {
      fetchProducts: vi.fn().mockResolvedValue(mockProducts),
      remapFetchedProducts: vi.fn(),
      ...productsServiceOverrides,
    };

    const loadingServiceMock = {
      loadingOn: vi.fn(),
      loadingOff: vi.fn(),
      ...loadingServiceOverrides,
    };

    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: LoadingService, useValue: loadingServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductsComponent);
    const component = fixture.componentInstance;

    return { fixture, component, productsServiceMock, loadingServiceMock };
  }

  it('should create the component', async () => {
    const { component } = await createComponent({});
    expect(component).toBeTruthy();
  });

  it('should call fetchAllProducts on init and remap fetched products', async () => {
    const { productsServiceMock, loadingServiceMock } = await createComponent(
      {}
    );

    // Wait for async constructor logic
    await Promise.resolve();

    expect(loadingServiceMock.loadingOn).toHaveBeenCalled();
    expect(productsServiceMock.fetchProducts).toHaveBeenCalled();
    expect(productsServiceMock.remapFetchedProducts).toHaveBeenCalledWith([
      { id: '1', name: 'Item A', totalPrice: 100, amount: 1 },
      { id: '2', name: 'Item B', totalPrice: 200, amount: 1 },
    ]);
    expect(loadingServiceMock.loadingOff).toHaveBeenCalled();
  });

  it('should handle fetchProducts error gracefully', async () => {
    const error = new Error('Failed to fetch');

    const fetchProducts = vi.fn().mockRejectedValue(error);
    const remapFetchedProducts = vi.fn();

    const { component, loadingServiceMock } = await createComponent({
      productsServiceOverrides: { fetchProducts, remapFetchedProducts },
    });

    // Avoid unhandled rejection error
    await expect(component.fetchAllProducts()).resolves.not.toThrow();

    expect(fetchProducts).toHaveBeenCalled();
    expect(remapFetchedProducts).not.toHaveBeenCalled();
    expect(loadingServiceMock.loadingOn).toHaveBeenCalled();
    expect(loadingServiceMock.loadingOff).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('Error fetching products')
    );
  });
});
