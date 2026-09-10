import { Product } from '../models/catalog.model';
import { resolveApiBaseUrl } from './api.config';

export function resolveProductImageSource(product: Product): string | null {
  const cdn = product.image?.cdn?.trim() || product.image_cdn?.trim() || product.image_url?.trim();
  if (cdn?.startsWith('http')) {
    return cdn;
  }
  const stored = product.image?.stored_image_id?.trim();
  if (stored) {
    const base = resolveApiBaseUrl().replace(/\/$/, '');
    return `${base}/products/images/${stored}`;
  }
  return cdn || null;
}
