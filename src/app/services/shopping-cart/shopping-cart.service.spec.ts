import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartItem } from '../../types/shopping-cart.type';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartService],
    });
    service = TestBed.inject(ShoppingCartService);
  });

  it('should initialize with empty shopping cart', () => {
    expect(service.shoppingCart()).toEqual([]);
    expect(service.calculateTotalPrice()).toBe(0);
  });

  it('should correctly calculate total price', () => {
    const mockItems: ShoppingCartItem[] = [
      { id: '1', name: 'Item A', totalPrice: 100, totalAmount: 1 },
      { id: '2', name: 'Item B', totalPrice: 200, totalAmount: 2 },
    ];

    service.shoppingCart.set(mockItems);

    expect(service.calculateTotalPrice()).toBe(300);
  });

  it('should update total price when shopping cart changes', () => {
    service.shoppingCart.set([
      { id: '1', name: 'Item A', totalPrice: 150, totalAmount: 1 },
    ]);
    expect(service.calculateTotalPrice()).toBe(150);

    // Update the cart
    service.shoppingCart.set([
      { id: '1', name: 'Item A', totalPrice: 150, totalAmount: 1 },
      { id: '2', name: 'Item B', totalPrice: 250, totalAmount: 1 },
    ]);
    expect(service.calculateTotalPrice()).toBe(400);
  });
});
