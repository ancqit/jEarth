import { GuideArticle } from '../models/guide.model';
import { DISPOSAL } from './disposal';
import { HOW_TO_CHECK } from './how-to-check';
import { COMPOST_DEEP, HOUSEHOLD_SOP, LAW_AND_COLOUR, PREVENTION, WORKPLACE } from './practice-articles';
import { WASTE_TYPES } from './waste-types';

export const GUIDE_ARTICLES: GuideArticle[] = [
  WASTE_TYPES,
  HOW_TO_CHECK,
  DISPOSAL,
  HOUSEHOLD_SOP,
  COMPOST_DEEP,
  PREVENTION,
  LAW_AND_COLOUR,
  WORKPLACE,
];

export function articleBySlug(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((article) => article.slug === slug);
}
