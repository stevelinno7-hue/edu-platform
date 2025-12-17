// ======================================================
// ✅ Social — 地理資料庫（國中）
// ======================================================

export const SOCIAL_GEOGRAPHY = [

  // ===== 地形 Landforms =====
  {
    id: 'geo_mountain',
    term: '山地',
    meaning: '地勢高聳、坡度陡峭的地形，多位於板塊擠壓處。',
    examples: [
      '台灣中央山脈',
      '喜馬拉雅山脈'
    ],
    wrongs: ['平原', '盆地', '丘陵'],
    tags: ['地形']
  },
  {
    id: 'geo_plain',
    term: '平原',
    meaning: '地勢低平、適合農業與城市發展的地形。',
    examples: [
      '台灣西部平原',
      '美國密西西比河平原'
    ],
    wrongs: ['山地', '高原', '盆地'],
    tags: ['地形']
  },
  {
    id: 'geo_basin',
    term: '盆地',
    meaning: '四周高、中間低的地形，常形成聚落。',
    examples: [
      '台北盆地',
      '四川盆地'
    ],
    wrongs: ['平原', '山地', '丘陵'],
    tags: ['地形']
  },

  // ===== 氣候 Climate =====
  {
    id: 'geo_monsoon',
    term: '季風氣候',
    meaning: '受季風影響，夏季多雨、冬季乾冷的氣候。',
    examples: [
      '台灣北部冬季多雨',
      '東亞季風'
    ],
    wrongs: ['沙漠氣候', '熱帶雨林氣候'],
    tags: ['氣候']
  },
  {
    id: 'geo_tropical_rainforest',
    term: '熱帶雨林氣候',
    meaning: '全年高溫多雨，植物生長旺盛。',
    examples: [
      '亞馬遜雨林',
      '東南亞雨林'
    ],
    wrongs: ['溫帶氣候', '沙漠氣候'],
    tags: ['氣候']
  },
  {
    id: 'geo_desert',
    term: '沙漠氣候',
    meaning: '降雨稀少、日夜溫差大。',
    examples: [
      '撒哈拉沙漠',
      '阿拉伯半島'
    ],
    wrongs: ['熱帶雨林', '溫帶海洋性氣候'],
    tags: ['氣候']
  },

  // ===== 人口 Population =====
  {
    id: 'geo_population_density',
    term: '人口密度',
    meaning: '每單位面積內的人口數量。',
    examples: [
      '台北市人口密度高',
      '澳洲人口密度低'
    ],
    wrongs: ['出生率', '死亡率'],
    tags: ['人口']
  },
  {
    id: 'geo_urbanization',
    term: '都市化',
    meaning: '人口向都市集中，城市規模擴大。',
    examples: [
      '台北都會區擴張',
      '工業化帶動都市化'
    ],
    wrongs: ['農業化', '人口減少'],
    tags: ['人口']
  },

  // ===== 產業 Industry =====
  {
    id: 'geo_primary_industry',
    term: '第一級產業',
    meaning: '直接利用自然資源的產業，如農、林、漁、牧。',
    examples: [
      '稻米種植',
      '漁業'
    ],
    wrongs: ['製造業', '服務業'],
    tags: ['產業']
  },
  {
    id: 'geo_secondary_industry',
    term: '第二級產業',
    meaning: '加工與製造的產業。',
    examples: [
      '鋼鐵工業',
      '電子製造'
    ],
    wrongs: ['農業', '金融業'],
    tags: ['產業']
  },
  {
    id: 'geo_tertiary_industry',
    term: '第三級產業',
    meaning: '提供服務的產業。',
    examples: [
      '觀光業',
      '金融業'
    ],
    wrongs: ['農業', '製造業'],
    tags: ['產業']
  },

  // ===== 全球化 Globalization =====
  {
    id: 'geo_globalization',
    term: '全球化',
    meaning: '世界各地在經濟、文化、科技上的交流日益頻繁。',
    examples: [
      '跨國企業',
      '國際貿易'
    ],
    wrongs: ['孤立主義', '封閉經濟'],
    tags: ['全球化']
  },
  {
    id: 'geo_international_trade',
    term: '國際貿易',
    meaning: '不同國家之間的商品與服務交換。',
    examples: [
      '台灣出口電子產品',
      '進口能源與原料'
    ],
    wrongs: ['國內貿易', '自給自足'],
    tags: ['全球化']
  },

  // ===== 自然環境與人類活動 =====
  {
    id: 'geo_plate_tectonics',
    term: '板塊構造',
    meaning: '地球表面由多個板塊組成，板塊移動造成地震與火山。',
    examples: [
      '台灣位於歐亞板塊與菲律賓海板塊交界',
      '環太平洋火山帶'
    ],
    wrongs: ['地球表面完全靜止', '地震由風造成'],
    tags: ['自然環境']
  },
  {
    id: 'geo_river_civilization',
    term: '河川文明',
    meaning: '早期文明多發展於河川流域，利於農業與交通。',
    examples: [
      '尼羅河文明',
      '黃河文明'
    ],
    wrongs: ['沙漠文明', '極地文明'],
    tags: ['自然環境']
  }
];
