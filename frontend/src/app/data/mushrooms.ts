export interface MushroomOffer {
  id: string;
  store_id: string;
  sku: string;
  name: string;
  description: string;
  variety: string;
  price: number;
  currency: string;
  packGrams: number;
  harvestWindow: string;
  grownOn: string;
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

export const FALLBACK_MUSHROOMS: MushroomOffer[] = [
  {
    id: 'mush-oyster-250',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-OYST-250',
    name: 'Fresh oyster mushrooms — 250 g',
    description:
      'Picked the morning of dispatch. Soft grey caps from paddy-straw rooms you can watch on camera. Cook the same day; they do not like the fridge for long.',
    variety: 'Oyster (Pleurotus)',
    price: 89,
    currency: 'INR',
    packGrams: 250,
    harvestWindow: 'Picked at dawn from Bay C when the veil is still tight.',
    grownOn: 'Pasteurised paddy straw + wheat bran',
    stock_quantity: 40,
  },
  {
    id: 'mush-milky-250',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-MILK-250',
    name: 'Fresh milky mushrooms — 250 g',
    description:
      'Calocybe indica, the heat-loving Indian white. Firmer than oyster, good for gravy. Harvested from the monsoon room.',
    variety: 'Milky (Calocybe indica)',
    price: 99,
    currency: 'INR',
    packGrams: 250,
    harvestWindow: 'Two to three picks a week while the flush is on.',
    grownOn: 'Paddy straw, high-temperature strain',
    stock_quantity: 24,
  },
  {
    id: 'mush-button-250',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-BUTT-250',
    name: 'Fresh button mushrooms — 250 g',
    description:
      'Agaricus from the cool room. Closed caps, no slime. We only list them when the camera shows a real flush.',
    variety: 'Button (Agaricus bisporus)',
    price: 79,
    currency: 'INR',
    packGrams: 250,
    harvestWindow: 'Cool-room harvest; listed only in fruiting weeks.',
    grownOn: 'Composted manure + casing',
    stock_quantity: 12,
  },
  {
    id: 'mush-mix-500',
    store_id: 'jearth-mushroom-farm',
    sku: 'JER-MIX-500',
    name: 'Mixed farm box — 500 g',
    description:
      'Whatever Bay C and the milky room gave this morning, packed as a half-kilo mix. Straw-grown protein, not a kit for your balcony.',
    variety: 'Farm mix',
    price: 159,
    currency: 'INR',
    packGrams: 500,
    harvestWindow: 'Same-day mix from rooms that are actually fruiting.',
    grownOn: 'Straw and compost rooms, pasteurised residue',
    stock_quantity: 18,
  },
];

export const FARM_CAMERAS: FarmCamera[] = [
  {
    id: 'cam-a',
    title: 'Inoculation bay',
    bay: 'Bay A · 24°C',
    stage: 'Spawn run',
    note: 'White mycelium should look like frost through straw, not green mould. Green is contamination — that crop is compost, not dinner.',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cam-b',
    title: 'Pinning room',
    bay: 'Bay B · 90% RH',
    stage: 'Pins forming',
    note: 'Tiny primordia at the cut slots. This is when misting matters. Direct sun will leather the caps you would have eaten.',
    image:
      'https://images.unsplash.com/photo-1504545102780-735bb8c61c73?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cam-c',
    title: 'Harvest aisle',
    bay: 'Bay C · fruiting',
    stage: 'Ready to pick',
    note: 'This is the shelf you are booking. We twist clusters at this stage, weigh, and pack. You are buying the mushrooms, not the substrate.',
    image:
      'https://images.unsplash.com/photo-1510629954389-c1e0da782a9f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cam-d',
    title: 'Straw yard',
    bay: 'Yard · substrate',
    stage: 'Pasteurising',
    note: 'Paddy straw from fields that would otherwise be burned. Agricultural residue becomes the protein on the order form.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
];
