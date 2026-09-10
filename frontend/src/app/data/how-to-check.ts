import { GuideArticle } from '../models/guide.model';

export const HOW_TO_CHECK: GuideArticle = {
  slug: 'how-to-check-waste',
  title: 'How to check waste',
  kicker: 'Field method',
  summary:
    'A complete audit protocol: how to look at a bag, a bin, a kitchen, a street, or a whole building and know whether the waste is honest.',
  minutes: 18,
  chapter: 'Practice',
  blocks: [
    {
      type: 'p',
      text: 'Checking waste is not glancing at a lid. It is a method. You confirm three things: what the material is, how wet or dirty it is, and which recovery path still exists for it in your city. If any of those three is unknown, the item is not yet sorted — it is still mixed waste wearing a costume.',
    },
    {
      type: 'callout',
      tone: 'gold',
      caption: 'The 10-second test',
      text: 'Pick the item up. Ask: Is it mostly food or plant? Is it a clean manufactured object? Is it dangerous, medical, or electronic? If you hesitate, it is mixed. Mixed goes to a quarantine tray, never into a “maybe recycling” bag.',
    },
    {
      type: 'h2',
      text: '1. Prepare a checking station',
    },
    {
      type: 'p',
      text: 'Do not sort over a sink or a sofa. Use a washable tray, gloves, a small scale if you have one, and four bowls labelled Wet, Dry-clean, Reject, and Hazardous. Keep a notebook. Checking without recording teaches nothing; the next week you will repeat the same mistakes.',
    },
    {
      type: 'ol',
      items: [
        'Clear a table. Cover it with newspaper you will later compost or discard as dry paper.',
        'Put a jug of water and soap within reach. Wash hands after every session.',
        'Have a dedicated cloth for wiping jars. Never wipe greasy pizza boxes into the recycling stream.',
        'Keep a photo of your city’s official colour code taped to the wall. Memory is how contamination starts.',
      ],
    },
    {
      type: 'h2',
      text: '2. The visual check',
    },
    {
      type: 'p',
      text: 'Look before you touch. Colour, sheen, and shape tell you the family of material. Organic waste is dull, often brown or green, and collapses. Plastic film shines and stretches. Glass is cold and rings. Metal is magnetic or dentable. Sanitary waste is wrapped. Electronics have ports, batteries, or circuit texture.',
    },
    {
      type: 'table',
      headers: ['What you see', 'Likely family', 'Next check'],
      rows: [
        ['Soft, wet, smells sour or sweet', 'Wet / organic', 'Is it cooked? Oily? Meat? That changes compost method.'],
        ['Rigid, dry, no food smear', 'Dry recyclable', 'Is it one polymer or a laminate? Peel labels if required locally.'],
        ['Shiny multilayer pouch', 'Reject / RDF / brand take-back', 'Do not put in paper or PET streams.'],
        ['Wires, plugs, screens', 'E-waste', 'Never bin. Take to authorised dismantler.'],
        ['Needles, blood, diapers, pads', 'Sanitary / biomedical', 'Yellow or red as per local rule. Do not recycle.'],
        ['Paint, pesticide, solvent smell', 'Hazardous household', 'Sealed, labelled, collection day only.'],
      ],
    },
    {
      type: 'h2',
      text: '3. The moisture check',
    },
    {
      type: 'p',
      text: 'Moisture decides whether a “dry” item is actually dry. A paper cup with tea at the bottom is wet waste or reject, not paper recycling. A cardboard box that held fried food is grease-contaminated; grease cannot be washed out of fibre in most mills. Squeeze a tissue: if liquid appears, it is wet. If it springs back dry, it may join paper.',
    },
    {
      type: 'ul',
      items: [
        'Wet waste: food, peels, leftover rice, tea leaves, flowers, garden trimmings, soiled paper napkins used for food.',
        'Dry waste: clean paper, cardboard, PET bottles, HDPE jars, glass bottles, tin cans, clean tetra (if your city accepts it separately).',
        'Reject: laminated pouches, broken ceramics, soiled thermocol, mixed cigarette butts, dirty foil with food welded on.',
      ],
    },
    {
      type: 'h2',
      text: '4. The contamination check',
    },
    {
      type: 'p',
      text: 'One oily packet can spoil a whole sack of paper. Recyclers call this contamination. Your job is to keep the dry stream as clean as a shop shelf. Rinse a jam jar until it would not attract ants. Do not obsessively sterilise — water is also a resource — but remove bulk food. Caps: follow local mill rules. In many Indian cities, leave the cap on the PET bottle so it is not littered, then let the MRF sort polymers.',
    },
    {
      type: 'steps',
      caption: 'Rinse protocol',
      items: [
        'Scrape food into wet waste with a spatula, not running water.',
        'Give one cup of used dishwater a swirl inside the jar. That is enough.',
        'Air-dry on the rack. Moisture in a closed dry bag grows mould and kills paper value.',
        'Flatten boxes. Volume, not weight, fills collection vehicles.',
      ],
    },
    {
      type: 'h2',
      text: '5. The smell and pest check',
    },
    {
      type: 'p',
      text: 'If a dry bag smells like a kitchen, it is failing. Wet waste should be emptied daily in warm climates. Dry waste can wait 3–7 days if clean. Hazardous waste must never sit in heat on a balcony. Maggots are not a moral failure; they are a schedule failure. Move the wet bin to a cooler spot, drain liquids into the sink only if your sewer is designed for it (most are not — better to absorb liquids into compost or soil), and close the lid.',
    },
    {
      type: 'h2',
      text: '6. Weigh and record (the only way a household becomes a system)',
    },
    {
      type: 'p',
      text: 'A guidebook is useless if you cannot see your own numbers. For two weeks, weigh wet, dry, reject, and sanitary separately. Typical Indian urban households generate 0.3–0.7 kg per person per day. If your reject bag is heavier than dry recyclables, you are buying laminates and single-use. The number will change what you purchase faster than any slogan.',
    },
    {
      type: 'table',
      headers: ['Stream', 'Healthy share (urban home)', 'Alarm sign'],
      rows: [
        ['Wet / compostable', '50–70% by weight', 'Less than 30%: you are eating ultra-processed packaged food, or you are putting food in the reject bag.'],
        ['Dry recyclable', '15–30%', 'Near zero: you are not rinsing, or the city has no pickup and you stopped trying.'],
        ['Reject / residual', '10–20%', 'Over 40%: packaging addiction or fear of sorting.'],
        ['Sanitary / hazardous / e-waste', 'small but strict', 'Any of this in wet or dry is a fail, not a percentage debate.'],
      ],
    },
    {
      type: 'h2',
      text: '7. Building and street checks',
    },
    {
      type: 'p',
      text: 'If you manage a society, do not trust the basement bins from the lobby. Open them. If wet and dry are the same colour of mess, the problem is not “people”. It is missing floor-wise bins, no attendant at peak hours, no feedback, and a contractor paid by tonne to the dump rather than by quality of segregation.',
    },
    {
      type: 'ul',
      items: [
        'Stand at the chute or collection point for 30 minutes at 8am. Count bags that are mixed.',
        'Photograph contamination (no faces). Share the photo on the notice board with the rule, not a scolding essay.',
        'Check whether bulk generators (restaurants, hostels) have their own wet processing. Law in many Indian states already requires it above a threshold.',
        'Ask the collector where each stream goes. If they cannot name a compost plant, recycler, or authorised facility, you are funding a transfer station, not a circular system.',
      ],
    },
    {
      type: 'h2',
      text: '8. The honesty check',
    },
    {
      type: 'callout',
      tone: 'warn',
      caption: 'Wishcycling',
      text: 'Putting a dirty pizza box, a broken bulb, or a plastic toy “into recycling because it feels better” is how cities lose buyers for their dry waste. When in doubt, quarantine. Learn. Then place. Hope is not a material recovery facility.',
    },
    {
      type: 'p',
      text: 'You have checked waste properly when a stranger could open your bags and immediately know the destination of each one. That is the standard used by waste-hero cities. Everything else is decoration.',
    },
  ],
};
