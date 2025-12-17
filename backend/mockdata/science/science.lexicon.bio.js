// ======================================================
// ✅ Science Lexicon — 生物概念庫（國中 + 高中）
// ======================================================

export const SCIENCE_BIO_LEXICON = [

  // ===== 細胞 Cell Biology =====
  {
    id: 'bio_cell',
    term: '細胞',
    meaning: '生物體最基本的構造與功能單位。',
    examples: [
      '植物細胞具有細胞壁與葉綠體',
      '動物細胞沒有細胞壁'
    ],
    wrongs: ['細胞是生物最大單位', '細胞不會分裂'],
    category: '細胞',
    tags: ['生物', '國中']
  },
  {
    id: 'bio_mitochondria',
    term: '粒線體',
    meaning: '細胞內負責能量產生的胞器，被稱為細胞的發電廠。',
    examples: [
      '粒線體進行細胞呼吸作用',
      '葡萄糖在粒線體中被分解產生能量'
    ],
    wrongs: ['粒線體負責光合作用', '粒線體儲存遺傳物質'],
    category: '細胞',
    tags: ['生物', '國中', '高中']
  },
  {
    id: 'bio_chloroplast',
    term: '葉綠體',
    meaning: '植物細胞中進行光合作用的胞器。',
    examples: [
      '葉綠體含有葉綠素',
      '光合作用產生氧氣與葡萄糖'
    ],
    wrongs: ['葉綠體存在於動物細胞', '葉綠體負責分解葡萄糖'],
    category: '細胞',
    tags: ['生物', '國中']
  },

  // ===== 遺傳 Genetics =====
  {
    id: 'bio_gene',
    term: '基因',
    meaning: '控制生物性狀的遺傳單位，由 DNA 組成。',
    examples: [
      '眼睛顏色由基因決定',
      '基因位於染色體上'
    ],
    wrongs: ['基因是蛋白質', '基因不會遺傳'],
    category: '遺傳',
    tags: ['生物', '國中', '高中']
  },
  {
    id: 'bio_dna',
    term: 'DNA',
    meaning: '儲存遺傳資訊的分子，雙股螺旋結構。',
    examples: [
      'DNA 由 A、T、C、G 四種鹼基組成',
      'DNA 複製是遺傳的基礎'
    ],
    wrongs: ['DNA 是單股結構', 'DNA 只存在於動物'],
    category: '遺傳',
    tags: ['生物', '國中', '高中']
  },
  {
    id: 'bio_chromosome',
    term: '染色體',
    meaning: '由 DNA 與蛋白質組成，攜帶遺傳資訊。',
    examples: [
      '人類有 23 對染色體',
      '染色體在細胞分裂時會複製'
    ],
    wrongs: ['染色體是 RNA', '染色體不會改變'],
    category: '遺傳',
    tags: ['生物', '國中']
  },

  // ===== 人體系統 Human Body Systems =====
  {
    id: 'bio_digestive',
    term: '消化系統',
    meaning: '負責分解食物並吸收養分的系統。',
    examples: [
      '胃負責初步消化蛋白質',
      '小腸吸收大部分養分'
    ],
    wrongs: ['肺負責消化', '腎臟負責分解食物'],
    category: '人體系統',
    tags: ['生物', '國中']
  },
  {
    id: 'bio_respiratory',
    term: '呼吸系統',
    meaning: '負責氣體交換，吸入氧氣、排出二氧化碳。',
    examples: [
      '肺泡是氣體交換的主要場所',
      '氧氣進入血液後運送到全身'
    ],
    wrongs: ['呼吸系統負責消化', '呼吸系統儲存能量'],
    category: '人體系統',
    tags: ['生物', '國中']
  },
  {
    id: 'bio_circulatory',
    term: '循環系統',
    meaning: '運送氧氣、養分與廢物的系統。',
    examples: [
      '心臟負責推動血液循環',
      '動脈將血液送往全身'
    ],
    wrongs: ['循環系統負責消化', '循環系統進行光合作用'],
    category: '人體系統',
    tags: ['生物', '國中']
  },

  // ===== 生態 Ecology =====
  {
    id: 'bio_ecosystem',
    term: '生態系',
    meaning: '由生物與非生物環境所組成的系統。',
    examples: [
      '森林生態系',
      '海洋生態系'
    ],
    wrongs: ['只有生物才算生態系', '只有植物才算生態系'],
    category: '生態',
    tags: ['生物', '國中']
  },
  {
    id: 'bio_food_chain',
    term: '食物鏈',
    meaning: '生物之間的能量傳遞關係。',
    examples: [
      '草 → 兔子 → 狐狸',
      '生產者 → 消費者 → 分解者'
    ],
    wrongs: ['能量會循環不滅', '消費者能進行光合作用'],
    category: '生態',
    tags: ['生物', '國中']
  },
  {
    id: 'bio_energy_flow',
    term: '能量流動',
    meaning: '能量在生態系中由生產者向上層傳遞，且不可逆。',
    examples: [
      '能量從太陽 → 植物 → 動物',
      '能量在每一階層都會遞減'
    ],
    wrongs: ['能量會循環回到生產者', '能量不會遞減'],
    category: '生態',
    tags: ['生物', '國中']
  },

  // ===== 生命現象 Life Processes =====
  {
    id: 'bio_photosynthesis',
    term: '光合作用',
    meaning: '植物利用光能將二氧化碳與水轉換成葡萄糖與氧氣。',
    examples: [
      '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      '葉綠體是光合作用的場所'
    ],
    wrongs: ['光合作用產生二氧化碳', '光合作用在粒線體進行'],
    category: '生命現象',
    tags: ['生物', '國中']
  },
  {
    id: 'bio_respiration',
    term: '細胞呼吸作用',
    meaning: '細胞分解葡萄糖以釋放能量的過程。',
    examples: [
      '葡萄糖 + 氧氣 → 二氧化碳 + 水 + 能量',
      '粒線體是主要場所'
    ],
    wrongs: ['呼吸作用產生葡萄糖', '呼吸作用在葉綠體進行'],
    category: '生命現象',
    tags: ['生物', '國中']
  }
];