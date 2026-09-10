import { WasteHero } from '../models/guide.model';

export const WASTE_HEROES: WasteHero[] = [
  {
    country: 'Japan',
    region: 'East Asia',
    score: 'World-class source separation culture',
    headline: 'Sorting is a civic language, not a weekend hobby.',
    whatTheyDid: [
      'Municipalities publish hyper-local calendars: burnable, non-burnable, PET, cans, paper, and bulky waste on named days.',
      'Residents rinse and label. Non-compliance is socially visible; trucks can refuse a bag.',
      'PET bottle collection is clean enough to be a feedstock industry, not a charity.',
      'Incineration exists, but it sits after aggressive separation and is engineered, not a backyard fire.',
    ],
    whatToCopy: [
      'Print a pickup calendar on the fridge. Named days beat vague “be better” posters.',
      'Give trucks the right to refuse mixed bags. Without refusal, education is optional.',
      'Treat cleanliness of recyclables as a product specification.',
    ],
    caution:
      'High incineration share is not automatically circular. Copy the discipline of sorting, not the idea that burning is recycling.',
  },
  {
    country: 'South Korea',
    region: 'East Asia',
    score: 'Volume-based fees + food-waste law',
    headline: 'They made food waste a paid, weighed, separate stream — and the tonnage fell.',
    whatTheyDid: [
      'Volume-based waste fees: you buy official bags. Residual costs money; recycling is cheaper or free.',
      'Food waste is banned from landfill in principle. RFID bins and paid food-waste sacks made the rule real.',
      'Food waste becomes feed, compost, or biogas at industrial scale.',
      'Extended producer responsibility (EPR) for packaging created a financial loop back to brands.',
    ],
    whatToCopy: [
      'Price residual higher than wet and dry. Free mixed dumping subsidises laziness.',
      'Give apartments RFID or weighed wet bins so bulk generators cannot hide.',
      'Finish the chain: if food waste is separate, a plant must exist the same year as the rule.',
    ],
    caution:
      'Fees without service (no collection, no plant) become a tax on the poor. Build capacity first, then tighten the bag price.',
  },
  {
    country: 'Germany',
    region: 'Europe',
    score: 'Dual system + deposit bottles',
    headline: 'Packaging producers pay, and bottles have a deposit people actually want back.',
    whatTheyDid: [
      'The Green Dot / dual system made producers finance packaging recovery.',
      'Pfand deposit-return for many bottles and cans created 90%+ return rates on those items.',
      'Biowaste bins (Biotonne) are normal in much of the country.',
      'Strict landfill rules pushed treatment infrastructure.',
    ],
    whatToCopy: [
      'Deposit-return for PET and aluminium. It beats curb-side for beverage containers.',
      'Make brand owners pay for the mess of their packaging, not just the municipal budget.',
      'Keep biowaste out of residual by giving it its own bin that is emptied often.',
    ],
    caution:
      'Exporting bales of plastic is not success. Track domestic recycling, not just collection rates.',
  },
  {
    country: 'Sweden',
    region: 'Northern Europe',
    score: 'High recovery, high public trust',
    headline: 'A culture of bringing waste to the right place, plus energy recovery that is not a secret.',
    whatTheyDid: [
      'Recycling stations are easy to reach; bulky and hazardous have civic centres.',
      'District heating uses residual waste energy in a monitored system.',
      'Public communication is calm, specific, and repetitive — the opposite of a once-a-year campaign.',
    ],
    whatToCopy: [
      'Build recycling centres people can drive or walk to on a Saturday.',
      'Publish where residual actually goes, including energy plants.',
      'Treat hazardous drop-off as a normal errand, not an expert task.',
    ],
    caution:
      'Imported waste for energy can hide weak prevention. Heroes still need to reduce packaging at source.',
  },
  {
    country: 'Netherlands',
    region: 'Europe',
    score: 'Pay-as-you-throw + high cycling of organics and packaging',
    headline: 'They priced the grey bin and made the right bin the convenient one.',
    whatTheyDid: [
      'Many municipalities use DIFTAR: you pay per residual bag or per empty of the grey bin.',
      'Dense drop-off for glass, paper, textiles.',
      'Strong organics collection in many regions (GFT: vegetable, fruit, garden).',
    ],
    whatToCopy: [
      'Make residual inconvenient and slightly expensive; make sorting the path of least resistance.',
      'Garden waste belongs with organics, not burned in a drum.',
    ],
    caution:
      'Underground containers fail if they are not cleaned; smell kills participation.',
  },
  {
    country: 'Singapore',
    region: 'Southeast Asia',
    score: 'Island discipline + Semakau as a visible limit',
    headline: 'They told citizens the landfill is an island with an end date — scarcity as a teacher.',
    whatTheyDid: [
      'Semakau Landfill is offshore and finite; the story is public.',
      'Highly organised collection, including for hawker centres.',
      'Incineration plants with monitoring; ash to the island.',
      'Mandatory reporting for large waste generators.',
    ],
    whatToCopy: [
      'Make the remaining landfill life a public dashboard.',
      'Regulate large food centres separately from households.',
      'Keep streets and bins clean enough that sorting feels normal, not heroic.',
    ],
    caution:
      'High incineration can freeze recycling innovation if contracts demand tonnes of fuel. Pair with packaging reduction.',
  },
  {
    country: 'Taiwan',
    region: 'East Asia',
    score: 'Night collection culture + recycling trucks',
    headline: 'Garbage trucks play music; people bring waste out already sorted because the truck will not wait for a mixed bag.',
    whatTheyDid: [
      'Point-of-collection sorting in the street, with inspectors and social pressure.',
      'Mandatory recycling and a 4-in-1 programme linking community, recycler, municipality, and fund.',
      'Food waste programmes in many cities.',
    ],
    whatToCopy: [
      'Collect at a known time so households cannot hide mixed bags in a basement chute.',
      'Fund recycling with a visible public system, not only NGO enthusiasm.',
    ],
    caution:
      'Street collection needs safe streets and labour. Do not copy the theatre without paying workers.',
  },
  {
    country: 'Rwanda',
    region: 'East Africa',
    score: 'Plastic-bag ban with enforcement',
    headline: 'They treated thin plastic bags as a policy object, not a lifestyle lecture.',
    whatTheyDid: [
      'Early nationwide ban on many polythene bags, with airport enforcement that travellers notice.',
      'Public cleanliness campaigns tied to civic identity.',
      'Community works (umuganda) that include cleaning.',
    ],
    whatToCopy: [
      'Ban the worst format (thin film bags) and enforce at the border and the shop.',
      'Give cloth and paper alternatives time to exist before the ban, then hold the line.',
    ],
    caution:
      'A bag ban is not a full waste system. Invest in organics and dumpsite upgrade in the same decade.',
  },
  {
    country: 'India (pockets of excellence)',
    region: 'South Asia',
    score: 'When bulk generators and informal workers are treated as infrastructure',
    headline: 'Heroism here is local: Indore’s collection discipline, Alappuzha’s wet waste, Pune’s cooperatives, Bengaluru’s dry-waste centres.',
    whatTheyDid: [
      'Indore: daily door-to-door, bin-free streets, processing plants that actually run, and political attention that did not blink.',
      'Alappuzha: decentralised composting instead of a mythical distant plant.',
      'Pune: waste-picker integration (SWaCH) so the people who already recycle are on the payroll of the system.',
      'Solid Waste Management Rules, 2016: source segregation, bulk generator responsibility, user fees — the law is ahead of many cities’ practice.',
    ],
    whatToCopy: [
      'Pay waste pickers as the first MRF. Do not criminalise them and then wonder why recycling died.',
      'Process wet waste within the ward. Long-haul wet trucks are rolling methane.',
      'Enforce bulk generators (tech parks, hotels) first; they are fewer and wetter.',
    ],
    caution:
      'Awards are not a landfill. Copy the operations manual, not the press release. Fires at dumps remain a national failure where mixed waste still arrives.',
  },
  {
    country: 'Costa Rica',
    region: 'Central America',
    score: 'National ecological identity + local composting culture',
    headline: 'A country that sells itself as living forest cannot treat rivers as bins — and many communities act like it.',
    whatTheyDid: [
      'Strong environmental branding that makes litter socially expensive.',
      'Local composting and recycling programmes in tourism-heavy cantons.',
      'Payments for ecosystem services created a mental model: nature is infrastructure.',
    ],
    whatToCopy: [
      'Tie waste to the thing people already love (beach, forest, monsoon, mushrooms, soil).',
      'Tourism businesses as bulk generators with contracts, not posters.',
    ],
    caution:
      'Rural dumps and plastic leakage still exist. Identity helps; trucks and plants close the loop.',
  },
];
