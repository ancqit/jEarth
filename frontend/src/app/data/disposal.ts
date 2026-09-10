import { GuideArticle } from '../models/guide.model';

export const DISPOSAL: GuideArticle = {
  slug: 'how-to-dispose',
  title: 'How to dispose of each stream',
  kicker: 'Treatment',
  summary:
    'Disposal is not “throwing”. It is a chain: store, hand over, process, and verify the residue. Here is how each type should travel after it leaves your hands.',
  minutes: 22,
  chapter: 'Practice',
  blocks: [
    {
      type: 'p',
      text: 'If sorting is diagnosis, disposal is medicine. The wrong medicine — burning a plastic heap, burying wet waste in a plastic bag, flushing oil — creates a second disease. This chapter is written as operating instructions, not inspiration.',
    },
    {
      type: 'h2',
      text: 'Wet waste: compost, biogas, or authorised plant',
    },
    {
      type: 'h3',
      text: 'Home compost (best default for a house with a little earth or a balcony)',
    },
    {
      type: 'ol',
      items: [
        'Use two bins or a khamba stack so one can mature while the other is fed.',
        'Chop peels. Surface area is speed.',
        'Layer browns (dry leaves, shredded cardboard, cocopeat) with greens (food). If it smells of ammonia, add browns. If it is dry and still, sprinkle water and greens.',
        'Keep meat and dairy out of beginner piles unless you have a closed bokashi or hot compost that actually gets hot.',
        'Drain excess liquid into a plant or back into the pile; do not create a soup.',
        'Harvest after 6–12 weeks. Sieve. Return coarse bits to the next batch.',
      ],
    },
    {
      type: 'h3',
      text: 'Community compost and biomethanation',
    },
    {
      type: 'p',
      text: 'Apartments above legal thresholds should not send wet waste to landfill. Aerobic windrows, in-vessel machines, and biogas digesters all work if the input is actually wet waste. The failure mode is always the same: plastic bags in the feedstock. Mandate bag-splitting. Pay the operator for compost quality, not tonnes received.',
    },
    {
      type: 'callout',
      tone: 'warn',
      caption: 'Do not',
      text: 'Do not burn wet waste. Do not tie it in plastic and bury it — that is a mini landfill that goes anaerobic and emits methane. Do not pour curdled milk and oil down the sink as a disposal method.',
    },
    {
      type: 'h2',
      text: 'Dry waste: the material recovery path',
    },
    {
      type: 'steps',
      caption: 'Household to industry',
      items: [
        'Store dry waste in a ventilated sack, not a wet bin.',
        'Hand over to the municipal dry vehicle, a waste picker cooperative, or a scrap shop that pays you. Paying is a feature: it means the material has a buyer.',
        'At the material recovery facility (MRF), people and machines separate polymers, fibre, metal, glass.',
        'Bales go to mills. What cannot be sold becomes RDF (refuse-derived fuel) for cement kilns if standards allow, or residual landfill.',
        'Ask your city for the MRF name. If they have none, your “recycling” is a transfer truck.',
      ],
    },
    {
      type: 'h2',
      text: 'Sanitary waste',
    },
    {
      type: 'p',
      text: 'Wrap, mark, and give to the sanitary collection or the authorised biomedical handler your city names. Some apartments use yellow bins collected twice a week. Low-cost incinerators in societies are controversial: they must meet emission norms or they are just a nicer-looking fire. Deep burial is a regulated method, not a hole behind the generator room.',
    },
    {
      type: 'h2',
      text: 'Hazardous household',
    },
    {
      type: 'ul',
      items: [
        'Keep original labels. A mystery bottle is a nightmare for the handler.',
        'Never mix chemicals to “save space”.',
        'Store upright in a cool cupboard, away from food.',
        'Use city hazardous collection days, paint drop-off, or licensed recyclers.',
        'Latex paint that is dried solid is sometimes accepted as residual; liquid paint is not.',
      ],
    },
    {
      type: 'h2',
      text: 'E-waste',
    },
    {
      type: 'p',
      text: 'Prefer brand take-back and producer-responsibility centres. Data: wipe devices before you give them. Batteries: tape lithium terminals so they cannot short in a box. Cables can go with e-waste, not with dry plastic, because of copper and mixed sheathing.',
    },
    {
      type: 'h2',
      text: 'Glass and metal',
    },
    {
      type: 'p',
      text: 'These are the most honest recyclables. Rinse. Do not break glass “to save space” unless you have a dedicated crush-proof container; broken glass injures waste workers, who are the actual recycling system. Flatten cans. Caps of different metals can ride along; MRFs magnet-sort steel from aluminium.',
    },
    {
      type: 'h2',
      text: 'What “scientific landfill” actually means',
    },
    {
      type: 'p',
      text: 'A dump is a hill of mixed waste. A landfill is lined, compacted, covered daily, with leachate collection and landfill-gas capture. Only residual should arrive. If your city still dumps mixed waste on a marsh, sorting at home is still worth it: it reduces fires and pickers’ injuries, and it builds the habit the plant will need. But do not let the municipality hide behind your segregation while trucks still go to an open dump. Track the truck.',
    },
    {
      type: 'h2',
      text: 'Waste-to-energy',
    },
    {
      type: 'p',
      text: 'Incineration with energy recovery is for high-calorific residual after recycling, with continuous emission monitoring. It is not an excuse to burn wet waste (too much water, too little energy, too much dioxin risk if plastics and organics burn badly). Cities that skip recycling and feed mixed waste into incinerators usually regret the slag, the contracts, and the air.',
    },
    {
      type: 'h2',
      text: 'Open burning and the drain',
    },
    {
      type: 'p',
      text: 'Burning mixed household waste releases particulate matter and chlorinated toxins. Drains are not a disposal network for solids, oil, or sanitary pads; they are how monsoon floods begin. If a method is invisible, it is probably illegal and someone downstream pays.',
    },
    {
      type: 'h2',
      text: 'A disposal checklist you can print',
    },
    {
      type: 'table',
      headers: ['Stream', 'Store at home', 'Hand over to', 'Never'],
      rows: [
        ['Wet', 'Closed bin, emptied daily', 'Compost / biogas / wet truck', 'Plastic bag burial, open dump'],
        ['Dry', 'Clean sack, weekly', 'MRF, kabadi, dry truck', 'Wishcycling dirty items'],
        ['Sanitary', 'Wrapped, marked', 'Yellow/sanitary route', 'Recycling, compost'],
        ['Hazardous', 'Original container', 'Special collection', 'Drain, fire, mixed bin'],
        ['E-waste', 'Dry box', 'Authorised recycler', 'Scrap burning'],
        ['C&D', 'On-site pile', 'C&D plant / skip', 'Storm drain'],
        ['Residual', 'Small bag', 'Engineered landfill / compliant WtE', 'River, vacant lot'],
      ],
    },
  ],
};
