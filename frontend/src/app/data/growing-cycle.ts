export interface CycleStage {
  id: string;
  dayLabel: string;
  title: string;
  cameraId?: string;
  whatYouSee: string;
  farmDoes: string;
  climate: string;
  fail: string;
}

export interface MushroomCycle {
  id: string;
  name: string;
  latin: string;
  totalDays: string;
  flushes: string;
  summary: string;
  stages: CycleStage[];
}

export const MUSHROOM_CYCLES: MushroomCycle[] = [
  {
    id: 'oyster',
    name: 'Oyster',
    latin: 'Pleurotus ostreatus / P. florida',
    totalDays: '12–21 days to first pick; 4–6 weeks including later flushes',
    flushes: '2–3 harvests from one crop',
    summary:
      'The farm’s default. Straw that might have been burned becomes clusters you can eat. Fast, humid, and honest about contamination.',
    stages: [
      {
        id: 'straw',
        dayLabel: 'Day −2 to 0',
        title: 'Substrate',
        cameraId: 'cam-d',
        whatYouSee: 'Chopped paddy straw, sometimes spent coffee. No plastic packets, no kitchen wet waste.',
        farmDoes: 'Soak, drain, pasteurise at ~80°C or lime-bath, cool to skin temperature.',
        climate: 'Yard heat is fine. The straw must be moist like a wrung sponge, not a soup.',
        fail: 'Raw straw with field microbes, or oil/salt from mixed waste — the crop dies before it starts.',
      },
      {
        id: 'spawn',
        dayLabel: 'Day 0',
        title: 'Inoculation',
        cameraId: 'cam-a',
        whatYouSee: 'Grain spawn mixed through cooled straw, packed in bags or bottles with filter patches or slits later.',
        farmDoes: 'Work clean. Label the batch. Move into the spawn-run room the same hour.',
        climate: '24–28°C. No need for fruiting humidity yet.',
        fail: 'Hot straw cooks the spawn. Dirty hands paint green Trichoderma into the batch.',
      },
      {
        id: 'run',
        dayLabel: 'Day 1–12',
        title: 'Spawn run',
        cameraId: 'cam-a',
        whatYouSee: 'White mycelium creeps until the straw looks frosted. Soft sweet smell, not sour.',
        farmDoes: 'Leave them dark-ish and still. Do not cut fruiting slits until the block is white.',
        climate: '24–28°C, moderate air. CO₂ can be higher in this phase.',
        fail: 'Green, black, or orange patches; ammonia; slime. That block is compost, never dinner.',
      },
      {
        id: 'pins',
        dayLabel: 'Day 12–16',
        title: 'Pinning',
        cameraId: 'cam-b',
        whatYouSee: 'Tiny primordia at the slits — beads that will become clusters.',
        farmDoes: 'Cut slits, drop temperature a little, raise humidity, give indirect light and fresh air.',
        climate: '18–24°C, 85–95% RH, more oxygen than spawn run.',
        fail: 'Dry air abort the pins. Direct sun leathers them. Over-misting drowns the slit.',
      },
      {
        id: 'fruit',
        dayLabel: 'Day 14–21',
        title: 'Fruiting',
        cameraId: 'cam-c',
        whatYouSee: 'Caps flare. Edges still slightly inrolled when they are perfect to pick.',
        farmDoes: 'Mist the air, not a flood. Watch the harvest aisle camera. Plan the morning pick.',
        climate: 'Same as pinning. Stale CO₂ makes long stems and tiny caps.',
        fail: 'Waiting until spores dust the room — flavour drops and shelf life dies.',
      },
      {
        id: 'pick',
        dayLabel: 'Harvest 1',
        title: 'First pick',
        cameraId: 'cam-c',
        whatYouSee: 'Clusters twist off clean. This is what you book: grams on a scale, not a kit.',
        farmDoes: 'Dawn pick, weigh 250 g / 500 g packs, chill briefly, dispatch the same day.',
        climate: 'Cool crate, not a frozen brick. Oysters hate long refrigeration.',
        fail: 'Leaving stubs that rot into the next flush.',
      },
      {
        id: 'rest',
        dayLabel: '+5–10 days',
        title: 'Rest and later flushes',
        whatYouSee: 'The block looks tired, then pins again if it is still white and not contaminated.',
        farmDoes: 'Keep humidity. Second flush is smaller. Third is a bonus.',
        climate: 'Unchanged. Exhausted blocks go to compost, not the dump mixed with plastic.',
        fail: 'Forcing a dead block. Spent straw is soil food — that is the waste loop closing.',
      },
    ],
  },
  {
    id: 'milky',
    name: 'Milky',
    latin: 'Calocybe indica',
    totalDays: 'About 3 weeks to first pick in Indian heat',
    flushes: 'Usually 2 heavier harvests',
    summary:
      'The monsoon white. It likes temperatures that would stall button mushrooms, which is why the farm runs it without a cold room.',
    stages: [
      {
        id: 'straw',
        dayLabel: 'Day −3 to 0',
        title: 'Hot straw',
        cameraId: 'cam-d',
        whatYouSee: 'Paddy straw for a high-temperature strain. Clean, chopped, pasteurised harder than oyster.',
        farmDoes: 'Hot pasteurise, cool, spawn with milky grain.',
        climate: 'Yard can be 30°C+. The pasteurisation step is non-negotiable.',
        fail: 'Under-heated straw in monsoon humidity is a mould factory.',
      },
      {
        id: 'run',
        dayLabel: 'Day 1–14',
        title: 'Colonisation',
        cameraId: 'cam-a',
        whatYouSee: 'Dense white run, slower and thicker than oyster.',
        farmDoes: 'Hold 30–35°C if the room allows. Patience. Do not open early.',
        climate: 'Warm. This is not a temperate species.',
        fail: 'Cool rooms slow it until contaminants win.',
      },
      {
        id: 'casing',
        dayLabel: 'Day 14–18',
        title: 'Casing',
        whatYouSee: 'A layer of steamed soil or cocopeat over the colonised block — milky likes a casing.',
        farmDoes: 'Case, keep moist, wait for the mycelium to stitch the surface.',
        climate: 'Still warm, surface never crust-dry.',
        fail: 'Soggy casing = bacterial blotch. Dust-dry casing = no pins.',
      },
      {
        id: 'pins',
        dayLabel: 'Day 18–24',
        title: 'Pins to buttons',
        cameraId: 'cam-b',
        whatYouSee: 'White buttons, firmer than oyster clusters.',
        farmDoes: 'Fresh air, light, humidity. These fruit bodies take more days to size up.',
        climate: '28–35°C, high RH.',
        fail: 'Picking oyster-early. Milky needs mass.',
      },
      {
        id: 'pick',
        dayLabel: 'Harvest',
        title: 'Heavy pick',
        cameraId: 'cam-c',
        whatYouSee: 'Thick white caps. This is the 250 g milky pack on the order form.',
        farmDoes: 'Cut or twist, weigh, pack. Second flush after a short rest.',
        climate: 'Same-day sale. Firmer flesh travels slightly better than oyster.',
        fail: 'Leaving opened caps to spore indoors.',
      },
    ],
  },
  {
    id: 'button',
    name: 'Button',
    latin: 'Agaricus bisporus',
    totalDays: '18–25 days after casing if the room is actually cool',
    flushes: '2–3 if compost is alive',
    summary:
      'Only when the cool room is running. If the camera shows 28°C, we do not list button mushrooms that week — heat makes hollow promises.',
    stages: [
      {
        id: 'compost',
        dayLabel: 'Week −3 to 0',
        title: 'Compost',
        cameraId: 'cam-d',
        whatYouSee: 'Phase I/II manure compost, not kitchen wet waste in a bucket.',
        farmDoes: 'Buy or make selective compost. Spawn at the right temperature, not into a hot heap.',
        climate: 'Compost finishes near 25°C before spawn.',
        fail: 'Amateur compost that still smells of ammonia.',
      },
      {
        id: 'run',
        dayLabel: 'Day 1–14',
        title: 'Spawn run in compost',
        cameraId: 'cam-a',
        whatYouSee: 'White threads through dark compost.',
        farmDoes: 'Hold ~25°C, then case with peat/soil mix.',
        climate: 'Dark, even moisture.',
        fail: 'Green mould, mites, or dry edges.',
      },
      {
        id: 'pins',
        dayLabel: 'Day 14–20',
        title: 'Pinning in the cool',
        cameraId: 'cam-b',
        whatYouSee: 'Pins on the casing like scattered pearls.',
        farmDoes: 'Drop to 16–20°C, fresh air, humidity. This is why we may not sell buttons in peak summer.',
        climate: '16–20°C, 85–90% RH. Open-Meteo outside can be 34°C — the room must disagree.',
        fail: 'No chill = overlay mycelium and no pins.',
      },
      {
        id: 'pick',
        dayLabel: 'Harvest',
        title: 'Closed caps',
        cameraId: 'cam-c',
        whatYouSee: 'Buttons before the veil breaks. That is the 250 g pack.',
        farmDoes: 'Twist, trim, pack. List on the shop only while the flush is real.',
        climate: 'Keep cool after pick. These travel better than oyster.',
        fail: 'Open cups sold as buttons. Honesty is a temperature log.',
      },
    ],
  },
];
