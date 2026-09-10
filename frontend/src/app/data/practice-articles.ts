import { GuideArticle } from '../models/guide.model';

export const HOUSEHOLD_SOP: GuideArticle = {
  slug: 'household-sop',
  title: 'Household standard operating procedure',
  kicker: 'Daily system',
  summary:
    'A kitchen that runs like a small materials plant: bin layout, daily rhythm, shopping rules, guests, festivals, and what to do when the collector does not come.',
  minutes: 16,
  chapter: 'Practice',
  blocks: [
    {
      type: 'p',
      text: 'Most waste failures are layout failures. If the wet bin is under the sink and the dry bin is on the balcony, every onion peel becomes a hero’s journey. Put the right bin where the waste is born.',
    },
    {
      type: 'h2',
      text: 'Bin layout',
    },
    {
      type: 'ul',
      items: [
        'Kitchen counter: small wet caddy with a lid. Empty into the bigger wet bin twice a day.',
        'Kitchen floor: dry sack for clean packaging opened while cooking.',
        'Bathroom: sanitary wrap + a tiny reject cup for floss, broken razors (razors go in a puncture box).',
        'Desk: paper stack, e-waste tin for dead pens and cables.',
        'Balcony: only clean dry overflow and compost, never a second mixed dump.',
      ],
    },
    {
      type: 'h2',
      text: 'Daily rhythm',
    },
    {
      type: 'ol',
      items: [
        'Morning: empty wet caddy, rinse if needed, check for a plastic fork that snuck in.',
        'After cooking: scrape plates to wet, rinse jars for dry.',
        'Night: lid check. Fruit flies mean the caddy is too sweet and too open — add citrus peels under a layer of leaves or empty sooner.',
        'Weekly: weigh or at least photograph the four bags. Monthly: one shopping change based on the heaviest reject item.',
      ],
    },
    {
      type: 'h2',
      text: 'Shopping is disposal in advance',
    },
    {
      type: 'p',
      text: 'The cheapest disposal is not generating the object. Prefer loose produce, returnable glass, refill stores, and paper where it truly recycles. Refuse decorative multilayer for snacks you can buy from a tin. A mushroom grow bag on this site is a product that eats agricultural residue; that is the opposite of a chip packet.',
    },
    {
      type: 'h2',
      text: 'Guests and festivals',
    },
    {
      type: 'p',
      text: 'Festivals are when cities fail. Pre-position extra wet capacity. Ban thermocol decorations in the society rules before the event, not after the photograph. Serve on steel. If you must use disposables, pick a single polymer and rinse, or genuinely compostable certified ware — not greenwashed PLA mixed into wet waste that never gets hot enough.',
    },
    {
      type: 'h2',
      text: 'When the truck does not come',
    },
    {
      type: 'ul',
      items: [
        'Wet: compost or freeze meat scraps if smell is the issue. Do not start a dump on the footpath “so they notice”.',
        'Dry: can wait. Keep it dry.',
        'Call the ward number once, then escalate with a photo of the missed street, not of your mood.',
        'Never burn the backlog. That is how neighbourhoods lose the argument for better service.',
      ],
    },
    {
      type: 'h2',
      text: 'Talking to children without mythology',
    },
    {
      type: 'p',
      text: 'Do not say “throw it in the dustbin” as if there were one. Say “peel in wet, packet in dry if clean”. Let them run the 10-second test. A child who can reject a laminate pouch is a better environmental policy than a colouring book about polar bears.',
    },
  ],
};

export const COMPOST_DEEP: GuideArticle = {
  slug: 'compost-and-wet-waste',
  title: 'Compost science for ordinary kitchens',
  kicker: 'Wet stream',
  summary:
    'Carbon, nitrogen, air, water, and time — the four knobs. Plus bokashi, worm bins, and how wet waste becomes mushroom substrate rather than methane.',
  minutes: 20,
  chapter: 'Foundations',
  blocks: [
    {
      type: 'p',
      text: 'Composting is farming microbes. They need carbon (browns), nitrogen (greens), oxygen, and moisture like a wrung sponge. Get three of four right and the pile works. Get two wrong and you get a weaponised smell.',
    },
    {
      type: 'h2',
      text: 'The recipe',
    },
    {
      type: 'table',
      headers: ['Knob', 'Too little', 'Too much', 'Fix'],
      rows: [
        ['Carbon (leaves, paper, husk)', 'Slimy, ammonia smell', 'Nothing happens', 'Add the opposite; mix, do not just dump on top'],
        ['Nitrogen (food, grass)', 'Slow pile', 'Rotten-egg or ammonia', 'Browns + turn'],
        ['Air', 'Anaerobic stink, black slime', 'Dries out', 'Poke holes, add sticks, turn weekly'],
        ['Water', 'Dust, no life', 'Leachate soup', 'Browns or a lid; drain tea from the bottom into plants'],
      ],
    },
    {
      type: 'h2',
      text: 'What beginners should exclude',
    },
    {
      type: 'ul',
      items: [
        'Large bones, huge coconut shells, pineapple crowns unless chopped.',
        'Oily gravies in quantity — they coat particles and block air.',
        'Pet faeces from carnivores (parasites). Cow dung is a different, useful story.',
        'Plastic “compostable” cutlery unless you have a hot industrial pile and a certificate you have actually read.',
      ],
    },
    {
      type: 'h2',
      text: 'Worm bins (vermicompost)',
    },
    {
      type: 'p',
      text: 'Eisenia fetida and local cousins eat soft organics and leave vermicast. Keep the bin in shade. Overfeeding cooks the worms. Citrus and onion in moderation. Liquid (vermiwash) is a fertiliser, not a drain cleaner to discard.',
    },
    {
      type: 'h2',
      text: 'Bokashi',
    },
    {
      type: 'p',
      text: 'An airtight bucket with inoculated bran ferments food, including some meat. It is pickle, not compost. After 2 weeks you still must bury or compost the mash. Bokashi is for apartments that cannot keep an aerobic pile on a tiny balcony.',
    },
    {
      type: 'h2',
      text: 'From wet waste to mushrooms',
    },
    {
      type: 'p',
      text: 'Oyster mushrooms grow on pasteurised straw, sawdust, coffee grounds, and other cellulose. That is agricultural and café waste becoming protein. It is not a way to dump mixed household wet waste into a grow bag — pathogens and salt and oil will ruin a bag. The mushroom page on this site sells bags on a controlled substrate. Your kitchen wet waste should become compost that then grows plants; the farm uses cleaner agricultural residue. Together they close a rural–urban loop.',
    },
    {
      type: 'callout',
      tone: 'gold',
      caption: 'Finished compost test',
      text: 'It smells like forest floor, not like a bin. You cannot recognise onion. Temperature matches the room. Then it is soil food, not waste.',
    },
  ],
};

export const PREVENTION: GuideArticle = {
  slug: 'prevention-and-circular',
  title: 'Prevention, reuse, and the circular order',
  kicker: 'Before the bin',
  summary:
    'The waste hierarchy is not a poster. Refuse, reduce, reuse, repair, recycle, residual. Most of the guidebook is about the last two; this chapter is about not needing them.',
  minutes: 14,
  chapter: 'Foundations',
  blocks: [
    {
      type: 'p',
      text: 'Recycling is damage control. A PET bottle that exists has already used oil, water, and a factory. Sorting it well is good. Never making the bottle for a two-minute drink is better. Heroes countries pair bins with policy that attacks the object.',
    },
    {
      type: 'ol',
      items: [
        'Refuse: banners, extra packaging, freebies that will become e-waste.',
        'Reduce: smaller servings, concentrated refills, sharing tools.',
        'Reuse: steel tiffin, glass jars, cloth bags that you actually carry.',
        'Repair: shoes, phones, clothes. A city without repair shops is a landfill pipeline.',
        'Recycle: only what is clean and has a buyer.',
        'Residual: the honest remainder, landfilled or energetically recovered under control.',
      ],
    },
    {
      type: 'h2',
      text: 'Extended producer responsibility',
    },
    {
      type: 'p',
      text: 'If a company can sell a multilayer pouch that no MRF wants, the cost of that pouch’s death should sit on their books. EPR laws try to do this. As a citizen you still sort; as a voter you ask whether the brand’s “collection targets” are real tonnes or paper. Junction shops can list refillable goods. This earth site exists so the map of materials is as visible as the map of stores.',
    },
    {
      type: 'h2',
      text: 'Metrics that are not vanity',
    },
    {
      type: 'ul',
      items: [
        'Residual kg per person per year, not “tonnes collected” (collection includes your wet waste driven to a dump).',
        'Contamination rate at the MRF.',
        'Percentage of wet waste processed within 15 km.',
        'Informal worker wages and injury rates — a system that saves plastic by breaking people is not a hero system.',
      ],
    },
  ],
};

export const LAW_AND_COLOUR: GuideArticle = {
  slug: 'rules-and-colour-codes',
  title: 'Rules, colour codes, and how to read a city',
  kicker: 'Institutions',
  summary:
    'India’s SWM Rules 2016, typical bin colours, bulk generators, and how to verify that your municipality is not only posting slogans.',
  minutes: 15,
  chapter: 'Institutions',
  blocks: [
    {
      type: 'p',
      text: 'Colours are a protocol. They differ by country and even by city. Never memorise a global rainbow and fight your sweeper. Memorise your gazette. Then demand that the truck matches the poster.',
    },
    {
      type: 'h2',
      text: 'A common Indian household code (confirm locally)',
    },
    {
      type: 'table',
      headers: ['Colour often used', 'Stream', 'Notes'],
      rows: [
        ['Green', 'Wet / biodegradable', 'Sometimes the opposite of Europe — always read the lid, not your travel memory.'],
        ['Blue', 'Dry recyclable', 'Must stay dry.'],
        ['Black / grey', 'Residual', 'Should be the smallest.'],
        ['Yellow / red', 'Sanitary / biomedical-related', 'Do not improvise.'],
        ['White / labelled', 'Domestic hazardous', 'Rare at household doorstep; use drop-off.'],
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      caption: 'Europe is not India',
      text: 'In much of Europe yellow is packaging, brown is bio, blue is paper, green is glass. If you copy a German infographic onto an Indian society WhatsApp group you will contaminate every bag. Translate principles, not paint.',
    },
    {
      type: 'h2',
      text: 'Solid Waste Management Rules, 2016 (India) — what actually binds you',
    },
    {
      type: 'ul',
      items: [
        'Generators must segregate at source and hand over to authorised collectors.',
        'Bulk generators (thresholds vary by state, often 100 kg/day or listed premises) must manage wet waste on site or via authorised facilities.',
        'User fees are legal. “Free garbage” was always paid by lungs and groundwater.',
        'Burning mixed waste is not a disposal method the rules bless.',
        'Manufacturers of disposables and sanitary brands have duties too — ask your city if they collect that money.',
      ],
    },
    {
      type: 'h2',
      text: 'How to audit a municipality in one afternoon',
    },
    {
      type: 'ol',
      items: [
        'Find the contract: who lifts, where do they tip? RTI or the engineering department.',
        'Visit the purported compost plant. Smell and count workers. A locked gate with a board is not a plant.',
        'Talk to waste pickers at the dry shed. If they are chased away, recycling is theatre.',
        'Check whether bulk apartments have on-site wet processing or a paper affidavit.',
        'Publish what you found without humiliation as the goal. The goal is a working truck route.',
      ],
    },
  ],
};

export const WORKPLACE: GuideArticle = {
  slug: 'workplace-and-events',
  title: 'Offices, canteens, and public events',
  kicker: 'Bulk generators',
  summary:
    'The same taxonomy, more kilograms, more plastic forks. How to write a canteen contract that does not sabotage the bins.',
  minutes: 12,
  chapter: 'Practice',
  blocks: [
    {
      type: 'p',
      text: 'A 200-person office can out-waste a lane of houses, mostly as mixed lunch. The lever is the vendor contract, not another email from HR.',
    },
    {
      type: 'ul',
      items: [
        'Steel plates or a deposit for reusable boxes. Disposable “compostable” ware without a hot compost contract is residual.',
        'Wet bin at the dish return, not at the desk. Desks create sandwich-in-tissue-in-plastic hybrids.',
        'Coffee grounds: collect for compost or mushroom substrate if the farm will take them (clean, no plastic lids).',
        'E-waste: one locked crate per floor, emptied quarterly to an authorised recycler with a manifest.',
        'Events: one materials captain with veto power over the décor budget.',
      ],
    },
    {
      type: 'h2',
      text: 'Contract clauses that work',
    },
    {
      type: 'ol',
      items: [
        'Vendor must take back their own transport packaging.',
        'Penalty for mixed bags found in the wet stream (photograph + weigh).',
        'Right of the facilities team to refuse a decoration material.',
        'Monthly kg report by stream, shared on the intranet like a fire drill log.',
      ],
    },
  ],
};
