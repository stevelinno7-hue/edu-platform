// ======================================================
// ✅ Science Lexicon — 化學概念庫（國中 + 高中）
// ======================================================

export const SCIENCE_CHEM_LEXICON = [

  // ===== 物質分類 =====
  {
    id: 'chem_element',
    term: '元素',
    meaning: '由相同種類原子所組成的純物質。',
    examples: [
      '氧氣（O₂）由氧元素組成',
      '鐵（Fe）是金屬元素'
    ],
    wrongs: ['水是元素', '二氧化碳是元素', '混合物是元素'],
    category: '物質分類',
    tags: ['化學', '國中']
  },
  {
    id: 'chem_compound',
    term: '化合物',
    meaning: '由兩種以上不同元素以固定比例化合而成的純物質。',
    examples: [
      '水（H₂O）',
      '二氧化碳（CO₂）'
    ],
    wrongs: ['空氣', '海水', '鐵'],
    category: '物質分類',
    tags: ['化學', '國中']
  },
  {
    id: 'chem_mixture',
    term: '混合物',
    meaning: '由多種物質混合而成，比例不固定。',
    examples: [
      '空氣',
      '海水'
    ],
    wrongs: ['水', '二氧化碳', '氯化鈉'],
    category: '物質分類',
    tags: ['化學', '國中']
  },

  // ===== 酸鹼 =====
  {
    id: 'chem_acid',
    term: '酸',
    meaning: '在水中會電離出 H⁺ 的物質。',
    examples: [
      '鹽酸（HCl）',
      '硫酸（H₂SO₄）'
    ],
    wrongs: ['氫氧化鈉', '氨水', '食鹽水'],
    category: '酸鹼',
    tags: ['化學', '國中']
  },
  {
    id: 'chem_base',
    term: '鹼',
    meaning: '在水中會電離出 OH⁻ 的物質。',
    examples: [
      '氫氧化鈉（NaOH）',
      '氫氧化鈣（Ca(OH)₂）'
    ],
    wrongs: ['鹽酸', '二氧化碳', '葡萄糖'],
    category: '酸鹼',
    tags: ['化學', '國中']
  },
  {
    id: 'chem_neutralization',
    term: '中和反應',
    meaning: '酸與鹼反應生成鹽與水。',
    examples: [
      'HCl + NaOH → NaCl + H₂O',
      '酸鹼滴定'
    ],
    wrongs: ['燃燒反應', '分解反應', '置換反應'],
    category: '酸鹼',
    tags: ['化學', '國中']
  },

  // ===== 氧化還原 =====
  {
    id: 'chem_oxidation',
    term: '氧化',
    meaning: '物質失去電子的反應。',
    examples: [
      '鐵生鏽',
      '燃燒'
    ],
    wrongs: ['物質獲得電子', '中和反應', '蒸發'],
    category: '氧化還原',
    tags: ['化學', '高中']
  },
  {
    id: 'chem_reduction',
    term: '還原',
    meaning: '物質獲得電子的反應。',
    examples: [
      '金屬離子變成金屬',
      '氧化銅被氫氣還原'
    ],
    wrongs: ['失去電子', '燃燒', '酸鹼反應'],
    category: '氧化還原',
    tags: ['化學', '高中']
  },

  // ===== 氣體定律 =====
  {
    id: 'chem_boyle',
    term: '波以耳定律',
    meaning: '在溫度不變下，氣體壓力與體積成反比。',
    examples: [
      'P₁V₁ = P₂V₂',
      '打氣筒壓縮空氣 → 壓力變大'
    ],
    wrongs: ['壓力與體積成正比', '溫度不變 → 壓力不變'],
    category: '氣體定律',
    tags: ['化學', '高中']
  },
  {
    id: 'chem_charles',
    term: '查理定律',
    meaning: '在壓力不變下，氣體體積與溫度成正比。',
    examples: [
      'V₁/T₁ = V₂/T₂',
      '熱氣球上升'
    ],
    wrongs: ['體積與溫度成反比', '壓力與溫度成反比'],
    category: '氣體定律',
    tags: ['化學', '高中']
  },

  // ===== 化學反應類型 =====
  {
    id: 'chem_combustion',
    term: '燃燒反應',
    meaning: '物質與氧氣反應並放出大量熱能。',
    examples: [
      '甲烷燃燒',
      '木材燃燒'
    ],
    wrongs: ['中和反應', '分解反應', '置換反應'],
    category: '反應類型',
    tags: ['化學', '國中']
  },
  {
    id: 'chem_decomposition',
    term: '分解反應',
    meaning: '一種物質分解成兩種或多種物質。',
    examples: [
      '電解水 → 氫氣 + 氧氣',
      '加熱碳酸鈣 → 氧化鈣 + 二氧化碳'
    ],
    wrongs: ['燃燒反應', '中和反應'],
    category: '反應類型',
    tags: ['化學', '國中']
  },
  {
    id: 'chem_single_replacement',
    term: '單置換反應',
    meaning: '活性較強的元素置換出化合物中的另一元素。',
    examples: [
      'Zn + CuSO₄ → ZnSO₄ + Cu'
    ],
    wrongs: ['燃燒反應', '分解反應'],
    category: '反應類型',
    tags: ['化學', '高中']
  }
];
