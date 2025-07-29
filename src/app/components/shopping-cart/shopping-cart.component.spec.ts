import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ShoppingCartItem } from '../../types/shopping-cart.type';

describe('ShoppingCartComponent', () => {
  const mockCartItems: ShoppingCartItem[] = [
    { id: '1', name: 'Item A', totalPrice: 100, totalAmount: 2 },
    { id: '2', name: 'Item B', totalPrice: 200, totalAmount: 1 },
  ];

  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // prevent console noise during test
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  async function createComponent({
    shoppingCartOverride = {},
  }: {
    shoppingCartOverride?: Record<string, any>;
  }) {
    const shoppingCartServiceMock = {
      shoppingCart: vi.fn(() => mockCartItems),
      ...shoppingCartOverride,
    };

    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ShoppingCartComponent);
    const component = fixture.componentInstance;

    return { fixture, component, shoppingCartServiceMock };
  }

  it('should create the component', async () => {
    const { component } = await createComponent({});
    expect(component).toBeTruthy();
  });

  it('should initialize tableData with shopping cart items', async () => {
    const { component } = await createComponent({});
    expect(component.tableData).toEqual(mockCartItems);
  });
});
