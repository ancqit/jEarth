export interface GrowBag {
  id: string;
  store_id: string;
  sku: string;
  name: string;
  description: string;
  variety: string;
  price: number;
  currency: string;
  expectedYieldKg: [number, number];
  daysToFirstPick: number;
  flushes: number;
  substrate: string;
  stock_quantity: number;
  image?: string | null;
}

export interface FarmCamera {
  id: string;
  title: string;
  bay: string;
  stage: string;
  note: string;
  image: string;
}

export const FALLBACK_BAGS: GrowBag[] = [
  {
    id: 'bag-oyster-milky',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-OYST-01',
    name: 'Oyster grow bag — 4 kg substrate',
    description:
      'Pasteurised paddy-straw bag inoculated with oyster mycelium. Hang in shade, mist twice a day, first pins in about two weeks.',
    variety: 'Oyster (Pleurotus)',
    price: 349,
    currency: 'INR',
    expectedYieldKg: [0.8, 1.4],
    daysToFirstPick: 14,
    flushes: 3,
    substrate: 'Pasteurised paddy straw + wheat bran',
    stock_quantity: 40,
  },
  {
    id: 'bag-milky',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-MILK-01',
    name: 'Milky mushroom bag — monsoon special',
    description:
      'Calocybe indica on paddy straw. Loves Indian heat more than button mushrooms. Heavier fruit bodies, fewer but thicker harvests.',
    variety: 'Milky (Calocybe indica)',
    price: 399,
    currency: 'INR',
    expectedYieldKg: [0.7, 1.2],
    daysToFirstPick: 21,
    flushes: 2,
    substrate: 'Paddy straw, high-temperature strain',
    stock_quantity: 24,
  },
  {
    id: 'bag-button-kit',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-BUTT-01',
    name: 'Button mushroom tray kit',
    description:
      'Composted substrate with casing soil. Needs 16–20°C. We tell you honestly if your city is too hot without a cool room.',
    variety: 'Button (Agaricus bisporus)',
    price: 549,
    currency: 'INR',
    expectedYieldKg: [0.6, 1.0],
    daysToFirstPick: 18,
    flushes: 3,
    substrate: 'Composted manure + casing',
    stock_quantity: 12,
  },
  {
    id: 'bag-coffee-oyster',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-COF-01',
    name: 'Coffee-ground oyster bag',
    description:
      'Spent café grounds blended with straw. A demonstration that wet-adjacent agricultural residue can become protein when it is clean and pasteurised — not mixed household wet waste.',
    variety: 'Oyster on coffee grounds',
    price: 379,
    currency: 'INR',
    expectedYieldKg: [0.5, 0.9],
    daysToFirstPick: 12,
    flushes: 2,
    substrate: 'Spent coffee + straw',
    stock_quantity: 18,
  },
];

export const FARM_CAMERAS: FarmCamera[] = [
  {
    id: 'cam-a',
    title: 'Inoculation bay',
    bay: 'Bay A · 24°C',
    stage: 'Spawn run',
    note: 'White mycelium should look like frost through straw, not green mould. Green is contamination — that bag is compost, not dinner.',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cam-b',
    title: 'Pinning room',
    bay: 'Bay B · 90% RH',
    stage: 'Pins forming',
    note: 'Tiny primordia at the cut slots. This is when misting matters. Direct sun will leather the caps.',
    image:
      'https://images.unsplash.com/photo-1504545102780-735bb8c61c73?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cam-c',
    title: 'Harvest aisle',
    bay: 'Bay C · fruiting',
    stage: 'Ready to pick',
    note: 'Twist, do not cut into the plastic if you can help it. Leave the root patch clean for the next flush.',
    image:
      'https://images.unsplash.com/photo-1510629954389-c1e0da782a9f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cam-d',
    title: 'Straw yard',
    bay: 'Yard · substrate',
    stage: 'Pasteurising',
    note: 'Paddy straw from fields that would otherwise be burned. This is the waste-hero move: agricultural residue as food infrastructure.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
];
