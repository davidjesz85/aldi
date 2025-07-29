export type Product = {
  availableAmount: number;
  id: string;
  img?: string;
  isFirst?: boolean; // For optimizing ngSrc "priority" property
  minOrderAmount: number;
  name: string;
  price: number;
};
