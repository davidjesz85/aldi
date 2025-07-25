import { Product } from './product.type';

export type ShoppingCartItem = Pick<Product, 'id' | 'name' | 'img'> & {
  totalAmount: number;
  totalPrice: number;
};
