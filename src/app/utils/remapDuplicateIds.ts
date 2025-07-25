import { Product } from '../types/product.type';
import { capitalizeWords } from '../shared/utils/camelCaseTransformer';

export function remapDuplicateIds(products: Product[]): Product[] {
  const seen = new Set<string>();
  const numericIds = products
    .map((item) => parseInt(item.id))
    .filter((n) => !isNaN(n));

  let nextId = numericIds.length ? Math.max(...numericIds) + 1 : 1;

  return products.map((item, i) => {
    const capitalizedName = item.name ? capitalizeWords(item.name) : item.name;
    const newItem = { ...item, name: capitalizedName };

    if (seen.has(item.id)) {
      while (seen.has(nextId.toString())) {
        nextId++;
      }
      newItem.id = nextId.toString();
    }

    seen.add(newItem.id);
    return { ...newItem, isFirst: i === 0 };
  });
}
