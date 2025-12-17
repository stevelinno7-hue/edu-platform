// ======================================================
// ✅ Science Lexicon — 物理概念庫（國中 + 高中）
// ======================================================

export const SCIENCE_PHYSICS_LEXICON = [

  // ===== 力學 Mechanics =====
  {
    id: 'phys_speed',
    term: '速度',
    meaning: '物體在單位時間內通過的位移量。',
    examples: [
      '速度 = 位移 / 時間',
      '車子 10 秒行駛 100 公尺 → 速度 = 10 m/s'
    ],
    wrongs: ['速度 = 距離 × 時間', '速度 = 質量 / 時間', '速度 = 力 / 質量'],
    category: '力學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_acceleration',
    term: '加速度',
    meaning: '速度隨時間的變化率。',
    examples: [
      '加速度 = (v₂ - v₁) / t',
      '自由落體加速度約為 9.8 m/s²'
    ],
    wrongs: ['加速度 = 速度 × 時間', '加速度 = 質量 / 力'],
    category: '力學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_force',
    term: '力',
    meaning: '能使物體運動狀態改變的作用。',
    examples: [
      '推力、拉力、重力、摩擦力',
      '力的單位為牛頓（N）'
    ],
    wrongs: ['力是速度', '力是能量'],
    category: '力學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_newton2',
    term: '牛頓第二運動定律',
    meaning: 'F = ma，力等於質量乘以加速度。',
    examples: [
      '力越大 → 加速度越大',
      '質量越大 → 加速度越小'
    ],
    wrongs: ['F = m + a', 'F = m / a', 'F = a / m'],
    category: '力學',
    tags: ['物理', '國中', '高中']
  },

  // ===== 能量 Energy =====
  {
    id: 'phys_kinetic_energy',
    term: '動能',
    meaning: '物體因運動而具有的能量。',
    examples: [
      '動能 = 1/2 mv²',
      '速度越快 → 動能越大'
    ],
    wrongs: ['動能 = mv', '動能 = mgh'],
    category: '能量',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_potential_energy',
    term: '位能',
    meaning: '物體因位置或狀態而具有的能量。',
    examples: [
      '重力位能 = mgh',
      '高度越高 → 位能越大'
    ],
    wrongs: ['位能 = 1/2 mv²', '位能 = mg / h'],
    category: '能量',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_work',
    term: '功',
    meaning: '力對物體做的作用，使物體移動。',
    examples: [
      'W = Fd',
      '力與位移方向相同時功最大'
    ],
    wrongs: ['W = F + d', 'W = F / d'],
    category: '能量',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_power',
    term: '功率',
    meaning: '做功的速率。',
    examples: [
      'P = W / t',
      '瓦特（W）是功率的單位'
    ],
    wrongs: ['P = W × t', 'P = t / W'],
    category: '能量',
    tags: ['物理', '國中']
  },

  // ===== 電學 Electricity =====
  {
    id: 'phys_current',
    term: '電流',
    meaning: '電荷的流動。',
    examples: [
      '電流單位：安培（A）',
      '電子由負極流向正極'
    ],
    wrongs: ['電流是電壓', '電流是電阻'],
    category: '電學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_voltage',
    term: '電壓',
    meaning: '使電荷流動的推動力。',
    examples: [
      '電壓單位：伏特（V）',
      '電池提供電壓'
    ],
    wrongs: ['電壓是電流', '電壓是電阻'],
    category: '電學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_resistance',
    term: '電阻',
    meaning: '阻礙電流流動的程度。',
    examples: [
      '電阻單位：歐姆（Ω）',
      '電阻越大 → 電流越小'
    ],
    wrongs: ['電阻是電壓', '電阻是電流'],
    category: '電學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_ohm_law',
    term: '歐姆定律',
    meaning: 'V = IR，電壓等於電流乘以電阻。',
    examples: [
      '電阻不變 → 電壓越大 → 電流越大',
      'I = V / R'
    ],
    wrongs: ['V = I / R', 'R = VI'],
    category: '電學',
    tags: ['物理', '國中']
  },

  // ===== 波動 Waves =====
  {
    id: 'phys_frequency',
    term: '頻率',
    meaning: '每秒振動的次數。',
    examples: [
      '單位：赫茲（Hz）',
      '頻率越高 → 音調越高'
    ],
    wrongs: ['頻率是音量', '頻率是波長'],
    category: '波動',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_wavelength',
    term: '波長',
    meaning: '波峰到波峰的距離。',
    examples: [
      '波長越長 → 頻率越低',
      '光的顏色由波長決定'
    ],
    wrongs: ['波長是振幅', '波長是速度'],
    category: '波動',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_reflection',
    term: '反射',
    meaning: '波遇到障礙物後反彈。',
    examples: [
      '鏡子反射光線',
      '回聲是聲波反射'
    ],
    wrongs: ['折射', '繞射'],
    category: '波動',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_refraction',
    term: '折射',
    meaning: '波進入不同介質時方向改變。',
    examples: [
      '吸管在水中看起來彎曲',
      '光從空氣進入水中速度變慢'
    ],
    wrongs: ['反射', '干涉'],
    category: '波動',
    tags: ['物理', '國中']
  },

  // ===== 熱學 Thermodynamics =====
  {
    id: 'phys_heat',
    term: '熱能',
    meaning: '物體內部分子運動的能量。',
    examples: [
      '溫度越高 → 分子運動越劇烈',
      '熱能可藉由傳導、對流、輻射傳遞'
    ],
    wrongs: ['熱能是電能', '熱能是光能'],
    category: '熱學',
    tags: ['物理', '國中']
  },
  {
    id: 'phys_conduction',
    term: '熱傳導',
    meaning: '熱由高溫處傳到低溫處。',
    examples: [
      '金屬導熱快',
      '木頭導熱慢'
    ],
    wrongs: ['熱會從低溫流向高溫', '熱傳導需要流體'],
    category: '熱學',
    tags: ['物理', '國中']
  }
];
