/** Waste stream keys map to `stream.*` in i18n translations. */
export type WasteStream =
  | 'wet'
  | 'dry'
  | 'sanitary'
  | 'ewaste'
  | 'hazardous'
  | 'reject'
  | 'construction';

export interface WasteArchiveEntry {
  id: string;
  stream: WasteStream;
  /** English name + search aliases */
  nameEn: string;
  aliasesEn: string[];
  disposeEn: string[];
  /** Hindi name + search aliases */
  nameHi: string;
  aliasesHi: string[];
  disposeHi: string[];
}

/**
 * Household waste archive for the homepage search.
 * Give an item → waste type + disposal steps (hi/en on the entry).
 */
export const WASTE_ARCHIVE: WasteArchiveEntry[] = [
  {
    id: 'peel',
    stream: 'wet',
    nameEn: 'Fruit or vegetable peel',
    aliasesEn: ['peel', 'mango', 'banana', 'onion', 'potato', 'vegetable scrap', 'fruit'],
    disposeEn: [
      'Home or community compost.',
      'Municipal wet-waste truck.',
      'Never the dry bag or the drain.',
    ],
    nameHi: 'फल या सब्ज़ी का छिलका',
    aliasesHi: ['छिलका', 'आम', 'केला', 'प्याज़', 'आलू', 'सब्ज़ी', 'फल'],
    disposeHi: [
      'घर या कॉलोनी की खाद।',
      'नगर निगम की गीले कचरे की गाड़ी।',
      'सूखे बैग या नाले में कभी नहीं।',
    ],
  },
  {
    id: 'cooked-food',
    stream: 'wet',
    nameEn: 'Leftover cooked food',
    aliasesEn: ['leftover', 'rice', 'dal', 'roti', 'food scrap', 'kitchen waste'],
    disposeEn: [
      'Wet bin / compost if no excess oil or meat for beginners.',
      'Biomethanation or wet plant where available.',
      'Do not seal in plastic and bury.',
    ],
    nameHi: 'बचा हुआ पका खाना',
    aliasesHi: ['बचा खाना', 'चावल', 'दाल', 'रोटी', 'रसोई कचरा'],
    disposeHi: [
      'गीला डिब्बा / खाद — शुरुआती ढेर में ज़्यादा तेल-मांस न डालें।',
      'जहाँ हो बायोमीथेन या गीला प्लांट।',
      'प्लास्टिक में बाँधकर गाड़ें नहीं।',
    ],
  },
  {
    id: 'tea-leaves',
    stream: 'wet',
    nameEn: 'Tea leaves or coffee grounds',
    aliasesEn: ['tea', 'coffee', 'chai', 'grounds'],
    disposeEn: [
      'Compost — classic nitrogen mix.',
      'If nylon mesh bag: mesh is reject; leaves are wet.',
    ],
    nameHi: 'चाय पत्ती या कॉफ़ी पाउडर',
    aliasesHi: ['चाय', 'कॉफ़ी', 'पत्ती'],
    disposeHi: [
      'खाद में डालें।',
      'नायलॉन जाली वाला बैग हो तो जाली रिजेक्ट, पत्ती गीला।',
    ],
  },
  {
    id: 'pet-bottle',
    stream: 'dry',
    nameEn: 'Plastic water or soft-drink bottle',
    aliasesEn: ['bottle', 'pet', 'plastic bottle', 'water bottle', 'coke', 'cold drink'],
    disposeEn: [
      'Rinse, crush lightly, dry bag / scrap shop / MRF.',
      'Follow local cap rules — many want the cap on.',
    ],
    nameHi: 'पानी या ठंडे पेय की प्लास्टिक बोतल',
    aliasesHi: ['बोतल', 'प्लास्टिक बोतल', 'पानी की बोतल', 'कोल्ड ड्रिंक'],
    disposeHi: [
      'धोकर हल्का दबाएँ, सूखे बैग / कबाड़ी / MRF।',
      'ढक्कन के स्थानीय नियम देखें — कई जगह ढक्कन लगा रखें।',
    ],
  },
  {
    id: 'paper',
    stream: 'dry',
    nameEn: 'Newspaper or clean paper',
    aliasesEn: ['paper', 'newspaper', 'cardboard', 'carton', 'notebook'],
    disposeEn: [
      'Keep dry and clean → dry stream or scrap buyer.',
      'Greasy or food-soiled paper → wet or reject, not paper recycling.',
    ],
    nameHi: 'अखबार या सादा काग़ज़',
    aliasesHi: ['काग़ज़', 'अखबार', 'गत्ता', 'कॉपी'],
    disposeHi: [
      'सूखा और साफ़ रखें → सूखा कचरा या कबाड़ी।',
      'तेल/खाना लगा काग़ज़ → गीला या रिजेक्ट, काग़ज़ रीसायकल नहीं।',
    ],
  },
  {
    id: 'glass-jar',
    stream: 'dry',
    nameEn: 'Glass bottle or jar',
    aliasesEn: ['glass', 'jar', 'pickle jar', 'bottle glass'],
    disposeEn: [
      'One rinse is enough → dry recyclable / scrap.',
      'Broken glass: wrap, label, still glass — worker safety first.',
    ],
    nameHi: 'काँच की बोतल या जार',
    aliasesHi: ['काँच', 'जार', 'अचार का जार'],
    disposeHi: [
      'एक बार धोना काफ़ी → सूखा रीसायकल / कबाड़ी।',
      'टूटा काँच: लपेटें, लिखें — कामगार की सुरक्षा पहले।',
    ],
  },
  {
    id: 'metal-can',
    stream: 'dry',
    nameEn: 'Aluminium or steel can',
    aliasesEn: ['can', 'tin', 'aluminium', 'metal', 'foil'],
    disposeEn: [
      'Rinse → dry metal stream.',
      'Clean foil balls OK; food-welded foil is often reject.',
    ],
    nameHi: 'एल्युमीनियम या स्टील कैन',
    aliasesHi: ['कैन', 'टिन', 'धातु', 'फ़ॉइल'],
    disposeHi: [
      'धोकर → सूखी धातु।',
      'साफ़ फ़ॉइल गोला ठीक; खाने से चिपकी फ़ॉइल अक्सर रिजेक्ट।',
    ],
  },
  {
    id: 'snack-pouch',
    stream: 'reject',
    nameEn: 'Metallised snack pouch',
    aliasesEn: ['pouch', 'chips packet', 'laminate', 'wrapper', 'kurkure'],
    disposeEn: [
      'Residual / reject — mixed layers, rarely recycled from homes.',
      'Refuse next time at the shop if a refill or simpler pack exists.',
    ],
    nameHi: ' चमकदार नमकीन पाउच',
    aliasesHi: ['पाउच', 'चिप्स पैकेट', 'रैपर', 'पैकेट'],
    disposeHi: [
      'रिजेक्ट / अवशेष — कई परतें, घर से कम रीसायकल।',
      'अगली बार दुकान पर इनकार करें अगर सरल पैक हो।',
    ],
  },
  {
    id: 'thermocol',
    stream: 'reject',
    nameEn: 'Thermocol / polystyrene foam',
    aliasesEn: ['thermocol', 'styrofoam', 'foam', 'packing'],
    disposeEn: [
      'Usually residual — home recycling markets are rare.',
      'Avoid taking it; ask shops for paper or reuse packing.',
    ],
    nameHi: 'थर्मोकॉल / फोम',
    aliasesHi: ['थर्मोकॉल', 'फोम', 'पैकिंग'],
    disposeHi: [
      'अक्सर अवशेष — घर से रीसायकल बाज़ार कम।',
      'लें नहीं; दुकान से काग़ज़ या दोबारा इस्तेमाल की पैकिंग माँगें।',
    ],
  },
  {
    id: 'sanitary-pad',
    stream: 'sanitary',
    nameEn: 'Used sanitary pad or tampon',
    aliasesEn: ['pad', 'sanitary', 'tampon', 'napkin'],
    disposeEn: [
      'Wrap in newspaper or marked bag → sanitary / yellow stream.',
      'Never compost, never dry recycling, never open burning.',
    ],
    nameHi: 'इस्तेमाल सैनिटरी पैड या टैम्पोन',
    aliasesHi: ['पैड', 'सैनिटरी', 'नैपकिन'],
    disposeHi: [
      'अखबार या निशान वाले बैग में लपेटें → सैनिटरी / पीला।',
      'खाद, सूखा रीसायकल या खुली आग में कभी नहीं।',
    ],
  },
  {
    id: 'diaper',
    stream: 'sanitary',
    nameEn: 'Used diaper',
    aliasesEn: ['diaper', 'nappy', 'pampers'],
    disposeEn: [
      'Treat as sanitary residual — wrap and mark.',
      'Never home compost.',
    ],
    nameHi: 'इस्तेमाल डायपर',
    aliasesHi: ['डायपर', 'नैपी'],
    disposeHi: [
      'सैनिटरी अवशेष — लपेटें और निशान लगाएँ।',
      'घर की खाद में कभी नहीं।',
    ],
  },
  {
    id: 'phone-charger',
    stream: 'ewaste',
    nameEn: 'Dead phone charger or cable',
    aliasesEn: ['charger', 'cable', 'wire', 'usb', 'earphone'],
    disposeEn: [
      'E-waste collection / authorised recycler.',
      'Do not mix with dry plastic; do not burn insulation.',
    ],
    nameHi: 'खराब फ़ोन चार्जर या केबल',
    aliasesHi: ['चार्जर', 'केबल', 'तार', 'ईयरफ़ोन'],
    disposeHi: [
      'ई-वेस्ट संग्रह / अधिकृत रीसाइक्लर।',
      'सूखे प्लास्टिक में न मिलाएँ; इंसुलेशन न जलाएँ।',
    ],
  },
  {
    id: 'phone',
    stream: 'ewaste',
    nameEn: 'Old mobile phone or laptop',
    aliasesEn: ['phone', 'mobile', 'laptop', 'tablet', 'electronics'],
    disposeEn: [
      'Wipe data, then e-waste drop-off or brand take-back.',
      'Batteries stay with the device for e-waste handlers.',
    ],
    nameHi: 'पुराना मोबाइल या लैपटॉप',
    aliasesHi: ['फ़ोन', 'मोबाइल', 'लैपटॉप', 'टैबलेट'],
    disposeHi: [
      'डेटा मिटाएँ, फिर ई-वेस्ट ड्रॉप या ब्रांड टेक-बैक।',
      'बैटरी डिवाइस के साथ ई-वेस्ट हैंडलर को दें।',
    ],
  },
  {
    id: 'battery',
    stream: 'hazardous',
    nameEn: 'Dead battery (AA, button, lithium)',
    aliasesEn: ['battery', 'aa', 'lithium', 'cell'],
    disposeEn: [
      'Battery collection / hazardous drop-off — not mixed dry.',
      'Button and lithium are fire risks in trucks.',
    ],
    nameHi: 'खत्म बैटरी (AA, बटन, लिथियम)',
    aliasesHi: ['बैटरी', 'सेल'],
    disposeHi: [
      'बैटरी संग्रह / खतरनाक ड्रॉप — मिश्रित सूखे में नहीं।',
      'बटन और लिथियम ट्रक में आग का खतरा।',
    ],
  },
  {
    id: 'medicine',
    stream: 'hazardous',
    nameEn: 'Expired medicines',
    aliasesEn: ['medicine', 'tablet', 'antibiotic', 'syrup', 'pharmacy'],
    disposeEn: [
      'Pharmacy take-back or domestic hazardous collection.',
      'Do not flush. Do not put in wet compost.',
    ],
    nameHi: 'एक्सपायर्ड दवाई',
    aliasesHi: ['दवाई', 'गोली', 'सिरप', 'मेडिसिन'],
    disposeHi: [
      'फ़ार्मेसी टेक-बैक या घरेलू खतरनाक संग्रह।',
      'फ्लश न करें। गीली खाद में न डालें।',
    ],
  },
  {
    id: 'cooking-oil',
    stream: 'hazardous',
    nameEn: 'Used cooking oil',
    aliasesEn: ['oil', 'frying oil', 'ghee waste'],
    disposeEn: [
      'Cool, contain; give to oil collection if available.',
      'Tiny amounts can go into hot compost browns — never the drain.',
    ],
    nameHi: 'इस्तेमाल तलने का तेल',
    aliasesHi: ['तेल', 'घी'],
    disposeHi: [
      'ठंडा करके बंद करें; जहाँ हो तेल संग्रह को दें।',
      'थोड़ा गरम खाद के भूरे में — नाले में कभी नहीं।',
    ],
  },
  {
    id: 'paint',
    stream: 'hazardous',
    nameEn: 'Paint, thinner, or solvent',
    aliasesEn: ['paint', 'thinner', 'solvent', 'varnish'],
    disposeEn: [
      'Keep label; hazardous household collection.',
      'Never mix chemicals to save space. Never pour on soil.',
    ],
    nameHi: 'पेंट, थिनर या सॉल्वेंट',
    aliasesHi: ['पेंट', 'थिनर'],
    disposeHi: [
      'लेबल रखें; खतरनाक घरेलू संग्रह।',
      'रसायन मिलाकर जगह न बचाएँ। मिट्टी पर न डालें।',
    ],
  },
  {
    id: 'mirror',
    stream: 'reject',
    nameEn: 'Broken mirror',
    aliasesEn: ['mirror', 'looking glass'],
    disposeEn: [
      'Not bottle glass — wrap for safety; often residual or C&D bulk.',
    ],
    nameHi: 'टूटा शीशा / दर्पण',
    aliasesHi: ['शीशा', 'दर्पण', 'मिरर'],
    disposeHi: [
      'बोतल का काँच नहीं — सुरक्षा से लपेटें; अक्सर अवशेष या निर्माण मलबा।',
    ],
  },
  {
    id: 'pizza-box',
    stream: 'wet',
    nameEn: 'Greasy pizza box',
    aliasesEn: ['pizza', 'pizza box', 'oily carton'],
    disposeEn: [
      'Grease kills paper recycling — stained base is wet or reject.',
      'Truly clean lid can go dry paper.',
    ],
    nameHi: 'तेल लगा पिज़्ज़ा बॉक्स',
    aliasesHi: ['पिज़्ज़ा', 'पिज़्ज़ा बॉक्स'],
    disposeHi: [
      'तेल काग़ज़ रीसायकल खराब करता है — दाग़ी तली गीला या रिजेक्ट।',
      'सचमुच साफ़ ढक्कन सूखे काग़ज़ में जा सकता है।',
    ],
  },
  {
    id: 'leaves',
    stream: 'wet',
    nameEn: 'Garden or street leaves',
    aliasesEn: ['leaves', 'leaf', 'garden waste', 'trimmings'],
    disposeEn: [
      'Browns for compost or wet truck.',
      'Sieve out plastic packets — packets are reject.',
    ],
    nameHi: 'बगीचे या सड़क के पत्ते',
    aliasesHi: ['पत्ते', 'पत्ती', 'बाग़ कचरा'],
    disposeHi: [
      'खाद के भूरे या गीली गाड़ी।',
      'प्लास्टिक पैकेट छानें — पैकेट रिजेक्ट।',
    ],
  },
  {
    id: 'cnd-rubble',
    stream: 'construction',
    nameEn: 'Brick, concrete, or renovation rubble',
    aliasesEn: ['rubble', 'brick', 'concrete', 'debris', 'construction', 'demolition'],
    disposeEn: [
      'C&D stream — authorised debris site, not household wet/dry.',
      'Separate clean soil, metal, and wood when possible.',
    ],
    nameHi: 'ईंट, कंक्रीट या मरम्मत का मलबा',
    aliasesHi: ['मलबा', 'ईंट', 'कंक्रीट', 'निर्माण'],
    disposeHi: [
      'निर्माण मलबा — अधिकृत स्थल, घरेलू गीला/सूखा नहीं।',
      'जहाँ हो साफ़ मिट्टी, धातु, लकड़ी अलग करें।',
    ],
  },
];

export function searchWasteArchive(query: string): WasteArchiveEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [];
  }
  return WASTE_ARCHIVE.filter((entry) => {
    const haystack = [
      entry.nameEn,
      entry.nameHi,
      ...entry.aliasesEn,
      ...entry.aliasesHi,
      entry.stream,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q) || q.split(/\s+/).every((part) => haystack.includes(part));
  });
}
