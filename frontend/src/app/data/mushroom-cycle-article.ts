import { GuideArticle } from '../models/guide.model';

export const MUSHROOM_CYCLE_ARTICLE: GuideArticle = {
  slug: 'mushroom-growing-cycle',
  title: 'Mushroom growing cycle',
  kicker: 'Farm biology',
  summary:
    'From pasteurised straw to the pack you eat: spawn run, pinning, fruiting, harvest, later flushes, and spent substrate back to soil. The shop sells the mushrooms, not a kit.',
  minutes: 16,
  chapter: 'Farm',
  blocks: [
    {
      type: 'p',
      text: 'A mushroom is a fruit. The organism is the white web in the straw. If you only meet it in a plastic tray at a supermarket, the cycle looks like magic. On this farm it is a calendar: heat the straw, add spawn, wait for white, change the air, pick, rest, pick again, compost what is left. You book the fruit. The cameras show the calendar.',
    },
    {
      type: 'callout',
      tone: 'gold',
      caption: 'What we sell',
      text: 'Fresh oyster, milky, and button mushrooms, weighed. We do not sell grow bags to hang on your balcony. The growing cycle below is how your dinner was made, and why some weeks a variety disappears from the list (the cool room lost the argument with summer).',
    },
    {
      type: 'h2',
      text: 'The seven beats (oyster, the default clock)',
    },
    {
      type: 'table',
      headers: ['Beat', 'Clock', 'What must be true'],
      rows: [
        ['Substrate', 'Day −2–0', 'Clean cellulose. Pasteurised. Moist, not wet. Not mixed household wet waste.'],
        ['Inoculation', 'Day 0', 'Spawn meets cooled straw. Hygiene is the whole job.'],
        ['Spawn run', 'Day 1–12', 'Mycelium colonises. Higher CO₂ is allowed. Look for frost-white, not green.'],
        ['Pinning', 'Day 12–16', 'Slits, fresh air, humidity, a little light. Primordia appear.'],
        ['Fruiting', 'Day 14–21', 'Caps expand. You are days from a pack.'],
        ['Harvest', 'Morning', 'Twist clusters, weigh, dispatch. This is the shop.'],
        ['Flushes & compost', '+1–3 weeks', 'Smaller later picks. Spent straw is compost, plastic is not.'],
      ],
    },
    {
      type: 'h2',
      text: 'Climate is a switch, not a vibe',
    },
    {
      type: 'p',
      text: 'Oysters fruit around 18–24°C and very high humidity. Milky (Calocybe indica) wants Indian heat, often 28–35°C, and a casing layer. Button (Agaricus) wants 16–20°C after casing on real compost. If Open-Meteo says 34°C and the button camera is in a room that cannot chill, we do not pretend there will be buttons. The growing cycle includes the honesty of not listing a species.',
    },
    {
      type: 'h3',
      text: 'Contamination is a stage too',
    },
    {
      type: 'ul',
      items: [
        'Trichoderma (green): competitor mould. Block becomes compost, never food.',
        'Sour smell / slime: bacteria. Same fate.',
        'Black pin mould or orange slime: isolate. Do not “wait and see” next to a fruiting aisle.',
        'Insects: they farm mould for you. Screens and cleanliness beat sprays on a food crop.',
      ],
    },
    {
      type: 'h2',
      text: 'Waste in, food out, waste out again',
    },
    {
      type: 'p',
      text: 'Paddy straw and café grounds are agricultural and food-service residues. Pasteurised, they feed mycelium. After the last flush the block is still organic: compost it. The plastic sleeve is dry waste or reject depending on how dirty it is. That is the same taxonomy as the guidebook. A farm that dumps spent bags mixed into a ravine is not a waste hero; it is a kitchen with a logo.',
    },
    {
      type: 'steps',
      caption: 'How to read the cameras against the cycle',
      items: [
        'Straw yard: substrate beat. Ask whether the straw is clean field residue.',
        'Inoculation / spawn-run bay: white should increase every day. Green is a no.',
        'Pinning room: beads at slits. No beads after a full colonisation means climate or strain failed.',
        'Harvest aisle: if clusters look ready, that variety should be orderable the same morning.',
        'Empty shelf: either rest between flushes or the flush is sold. The list should match the lens.',
      ],
    },
    {
      type: 'h2',
      text: 'Why later flushes weigh less',
    },
    {
      type: 'p',
      text: 'The straw is a packed lunch. First harvest spends the easiest sugar and nitrogen. Second flush is the remainder. Third is scraps. Yield numbers on the shop are pack grams (250 g, 500 g), not a fantasy of infinite mushrooms from one block. Biology is a budget.',
    },
  ],
};
