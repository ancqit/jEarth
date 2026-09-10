import { GuideArticle } from '../models/guide.model';

export const WASTE_TYPES: GuideArticle = {
  slug: 'types-of-waste',
  title: 'Types of waste: a full taxonomy',
  kicker: 'The map',
  summary:
    'Wet, dry, sanitary, reject, hazardous, e-waste, biomedical, construction, agricultural, and the grey zones in between. If you cannot name the type, you cannot dispose of it.',
  minutes: 24,
  chapter: 'Foundations',
  blocks: [
    {
      type: 'p',
      text: 'Waste is not one thing. It is a pile of different chemistries that happen to have been discarded on the same Tuesday. Treating them as one pile is how landfills catch fire, how leachate poisons groundwater, and how recyclers refuse entire truckloads. This chapter is the dictionary. Use it until the words become reflexes.',
    },
    {
      type: 'h2',
      text: 'The two streams everyone must master: wet and dry',
    },
    {
      type: 'h3',
      text: 'Wet waste (biodegradable / organic)',
    },
    {
      type: 'p',
      text: 'Wet waste is anything that was recently alive or cooked from things that were alive, plus other easily rotting carbon. It is called “wet” because it carries water. Water is why it smells, why it attracts animals, and why it can become compost or biogas instead of methane in a dump.',
    },
    {
      type: 'ul',
      items: [
        'Fruit and vegetable peels, stems, rotten produce.',
        'Leftover cooked food, including rice, dal, bread, and bones in small household quantities (bones are slow; many home composters keep them out).',
        'Tea leaves, coffee grounds, used paper tea bags without plastic mesh.',
        'Eggshells (crush them).',
        'Cut flowers, fallen leaves, small garden trimmings.',
        'Soiled paper used with food (napkins, pizza paper) — paper fibre is ruined; it can still rot.',
        'Coconut shells in some systems (slow; chop or send to bulk compost).',
      ],
    },
    {
      type: 'callout',
      tone: 'forest',
      caption: 'What wet waste is for',
      text: 'Home compost, community compost, biomethanation, or a recognised wet-waste plant. Not the dry bag. Not the drain. Not a plastic bag tied “for later” in the sun.',
    },
    {
      type: 'h3',
      text: 'Dry waste (recyclable inorganics and clean fibre)',
    },
    {
      type: 'p',
      text: 'Dry waste is manufactured material that still has a market if it is clean and sorted. It does not rot on a useful timescale. Mixing it with wet waste is how you destroy both streams: organics become plastic-contaminated compost, and recyclables become slimy and unsaleable.',
    },
    {
      type: 'ul',
      items: [
        'Paper: newspapers, office paper, notebooks without excessive lamination, cardboard cartons.',
        'Plastic: PET bottles (soft drinks), HDPE (shampoo, milk in some regions), PP tubs (yogurt), depending on local buyers.',
        'Metal: aluminium cans, steel tins, clean foil balls (not food-welded foil).',
        'Glass: bottles and jars. Broken glass is still glass but is a safety item — wrap and label.',
        'Textiles that are clean and dry (many cities treat cloth as a separate dry sub-stream).',
      ],
    },
    {
      type: 'p',
      text: 'Dry does not mean “anything that looks hard”. A greasy takeaway box is not dry. A toothpaste tube that is a mixed laminate is often reject. A mirror is glass plus coating and backing — usually reject or specialised. Learn the exception list of your city; the taxonomy below covers the global logic.',
    },
    {
      type: 'h2',
      text: 'Sanitary waste',
    },
    {
      type: 'p',
      text: 'Pads, tampons, diapers, condoms, cotton used for blood or viscera, used tissues from illness. This stream is about dignity and infection control, not recycling. Wrap in newspaper or the bags provided. In India, many rules require a yellow bag or a marked bin, and incineration or deep burial at authorised facilities — never compost, never recycling, never open burning in a plot.',
    },
    {
      type: 'h2',
      text: 'Reject / residual / inert',
    },
    {
      type: 'p',
      text: 'This is the honest leftover after you have pulled out wet, dry, sanitary, and hazardous. Typical contents: dirty multilayer sachets, broken crockery, soiled thermocol, vacuum dust (sometimes), cigarette butts, worn-out slippers that no rag-picker will take. The goal is to shrink this bag until it is embarrassing. Residual still needs a scientifically engineered landfill or a waste-to-energy plant with real emission control — not a ravine.',
    },
    {
      type: 'h2',
      text: 'Hazardous household waste',
    },
    {
      type: 'ul',
      items: [
        'Paints, solvents, thinners, varnish.',
        'Pesticides, mosquito coils in bulk, leftover agricultural chemicals.',
        'Strong cleaners: acid, bleach mixed with other chemicals (never mix bleach and acid yourself).',
        'Used engine oil, brake fluid.',
        'Compact fluorescent lamps (mercury), some batteries (especially button and lithium).',
        'Expired medicines (return to pharmacy take-back where it exists; do not flush).',
      ],
    },
    {
      type: 'h2',
      text: 'E-waste',
    },
    {
      type: 'p',
      text: 'Phones, chargers, earphones, laptops, LED bulbs, remote controls, inverters, cables. They contain copper, gold, plastics, and also lead, cadmium, brominated flame retardants. Informal burning to recover copper is a public-health disaster. Use authorised collection centres, brand take-back, or city e-waste days. Remove residual batteries if the device allows it, because lithium batteries in crushers cause fires.',
    },
    {
      type: 'h2',
      text: 'Biomedical waste (beyond the home)',
    },
    {
      type: 'p',
      text: 'Hospitals and clinics follow colour codes (yellow, red, white, blue in India’s Biomedical Waste Management Rules). Households should not receive syringes without a plan: a puncture-proof container, then a pharmacy or clinic. Never the wet bin. Never a park.',
    },
    {
      type: 'h2',
      text: 'Construction and demolition (C&D)',
    },
    {
      type: 'p',
      text: 'Debris, concrete, tiles, gypsum, wood offcuts, metal scrap from renovation. This is not municipal wet/dry. Dumping C&D in a storm drain is how cities flood. Many cities now require C&D to go to recycling plants that make recycled aggregate. Book a skip. Separate metal and wood on site; they have value.',
    },
    {
      type: 'h2',
      text: 'Agricultural and garden waste',
    },
    {
      type: 'p',
      text: 'Stubble, husk, prunings, dung. Open burning of stubble is a regional air crisis. Alternatives: in-situ mulching, happy seeder, composting, biomethanation, mushroom substrate (paddy straw is a classic spawn medium — this is the bridge to the mushroom farm on this site). Dried leaves in cities are compost, not street sweeping into plastic bags mixed with grit.',
    },
    {
      type: 'h2',
      text: 'Plastic, more carefully',
    },
    {
      type: 'table',
      headers: ['Code', 'Name', 'Typical items', 'Usual fate'],
      rows: [
        ['1 PET', 'Polyethylene terephthalate', 'Water and soda bottles', 'High recycling value if clean and clear.'],
        ['2 HDPE', 'High-density polyethylene', 'Shampoo, detergent, milk jugs', 'Strong recycling markets.'],
        ['3 PVC', 'Polyvinyl chloride', 'Pipes, some blister packs', 'Poor household recycling; toxic if burned.'],
        ['4 LDPE', 'Low-density polyethylene', 'Carry bags, some films', 'Recyclable only if clean and separately collected.'],
        ['5 PP', 'Polypropylene', 'Tubs, bottle caps, some chairs', 'Growing markets.'],
        ['6 PS', 'Polystyrene', 'Foam cups, cutlery, thermocol', 'Rarely recycled from homes; avoid.'],
        ['7 OTHER', 'Mix, bioplastics, multilayer', 'Chip packets, metallised film', 'Usually reject or specialised pyrolysis — not your blue bag.'],
      ],
    },
    {
      type: 'h2',
      text: 'Wet vs dry: the grey list people fight about',
    },
    {
      type: 'table',
      headers: ['Item', 'Put it here', 'Why'],
      rows: [
        ['Pizza box with grease stains', 'Wet or reject, not paper mill', 'Grease ruins paper pulp.'],
        ['Clean pizza box lid', 'Dry paper', 'If it is actually clean.'],
        ['Coconut husk', 'Wet / garden / bulk compost', 'Slow but organic.'],
        ['Hair from a comb', 'Wet in tiny amounts, or reject', 'Not a recycler’s fibre.'],
        ['Chewing gum', 'Reject', 'Synthetic rubber.'],
        ['Tea bags with nylon mesh', 'Reject the bag; leaves can be wet', 'The web is plastic.'],
        ['Broken ceramic mug', 'Reject / C&D if bulk', 'Not bottle glass.'],
        ['Mirrors and window glass', 'Reject or specialised', 'Different melting behaviour than bottles.'],
        ['Receipts (thermal paper)', 'Reject', 'BPA coatings; not office paper.'],
        ['Soiled diapers', 'Sanitary', 'Never compost at home.'],
        ['Garden soil and stones', 'Garden / inert', 'They are not “waste” in the organic sense; they clog compost.'],
        ['Cooking oil (small)', 'Never down the drain; absorb in sawdust and compost tiny amounts, or collection', 'Fatbergs destroy sewers.'],
      ],
    },
    {
      type: 'h2',
      text: 'How types connect to disposal',
    },
    {
      type: 'p',
      text: 'Type is a diagnosis. Disposal is the treatment. Composting is for wet. Material recovery is for dry. Authorised incineration or plasma is for some hazardous and sanitary. Landfill is for residual after recovery. Dumping is not a type of disposal; it is a failure of the previous sentences. The next chapter walks through each treatment as if you had to run it yourself.',
    },
  ],
};
