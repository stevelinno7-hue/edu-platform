// ======================================================
// ✅ Math Formulas — 數學公式庫（國中 + 高中）
// ======================================================

export const MATH_FORMULAS = [

  // ===== 國中：幾何 Geometry =====
  {
    id: 'math_area_triangle',
    topic: '三角形面積',
    formula: 'A = (b × h) / 2',
    meaning: '底乘高再除以二。',
    wrongs: ['A = b × h', 'A = (b + h) / 2', 'A = b² × h']
  },
  {
    id: 'math_area_rectangle',
    topic: '長方形面積',
    formula: 'A = l × w',
    meaning: '長乘寬。',
    wrongs: ['A = (l + w) × 2', 'A = l² + w²', 'A = l / w']
  },
  {
    id: 'math_area_circle',
    topic: '圓面積',
    formula: 'A = πr²',
    meaning: '半徑平方乘以 π。',
    wrongs: ['A = 2πr', 'A = πd', 'A = πr']
  },
  {
    id: 'math_circumference',
    topic: '圓周長',
    formula: 'C = 2πr',
    meaning: '半徑乘以 2π。',
    wrongs: ['C = πr²', 'C = πd²', 'C = r / 2π']
  },

  // ===== 國中：代數 Algebra =====
  {
    id: 'math_slope',
    topic: '斜率',
    formula: 'm = (y₂ - y₁) / (x₂ - x₁)',
    meaning: '兩點之間的 y 變化量除以 x 變化量。',
    wrongs: ['m = (x₂ - x₁) / (y₂ - y₁)', 'm = x₁y₂ - x₂y₁', 'm = x / y']
  },
  {
    id: 'math_distance',
    topic: '兩點距離',
    formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
    meaning: '平面上兩點距離公式。',
    wrongs: ['d = (x₂ - x₁) + (y₂ - y₁)', 'd = (x₂ + y₂) - (x₁ + y₁)', 'd = x² + y²']
  },
  {
    id: 'math_midpoint',
    topic: '中點公式',
    formula: 'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
    meaning: '兩點座標平均。',
    wrongs: ['(x₁ - x₂)/2', '(y₁ - y₂)/2', '(x₁ × x₂, y₁ × y₂)']
  },

  // ===== 國中：畢氏定理 Pythagorean =====
  {
    id: 'math_pythagorean',
    topic: '畢氏定理',
    formula: 'a² + b² = c²',
    meaning: '直角三角形斜邊平方等於兩股平方和。',
    wrongs: ['a² - b² = c²', 'ab = c²', 'a + b = c']
  },

  // ===== 高中：指數與對數 Exponential & Log =====
  {
    id: 'math_log_basic',
    topic: '對數基本性質',
    formula: 'log(a × b) = log a + log b',
    meaning: '乘法變加法。',
    wrongs: ['log(a × b) = log a × log b', 'log(a × b) = log a - log b']
  },
  {
    id: 'math_log_power',
    topic: '對數冪次',
    formula: 'log(aⁿ) = n log a',
    meaning: '指數可以移到前面。',
    wrongs: ['log(aⁿ) = log aⁿ', 'log(aⁿ) = log a / n']
  },

  // ===== 高中：三角函數 Trigonometry =====
  {
    id: 'math_trig_sin',
    topic: '正弦定義',
    formula: 'sin θ = 對邊 / 斜邊',
    meaning: '直角三角形中，角的正弦為對邊比斜邊。',
    wrongs: ['對邊 / 鄰邊', '斜邊 / 對邊', '鄰邊 / 斜邊']
  },
  {
    id: 'math_trig_cos',
    topic: '餘弦定義',
    formula: 'cos θ = 鄰邊 / 斜邊',
    meaning: '直角三角形中，角的餘弦為鄰邊比斜邊。',
    wrongs: ['對邊 / 斜邊', '斜邊 / 鄰邊', '對邊 / 鄰邊']
  },
  {
    id: 'math_trig_tan',
    topic: '正切定義',
    formula: 'tan θ = 對邊 / 鄰邊',
    meaning: '直角三角形中，角的正切為對邊比鄰邊。',
    wrongs: ['鄰邊 / 對邊', '斜邊 / 對邊', '斜邊 / 鄰邊']
  },

  // ===== 高中：微積分 Calculus =====
  {
    id: 'math_derivative_power',
    topic: '微分：冪次法則',
    formula: 'd/dx (xⁿ) = n xⁿ⁻¹',
    meaning: 'x 的 n 次方微分為 n 倍 x 的 n-1 次方。',
    wrongs: ['xⁿ → xⁿ', 'n xⁿ → xⁿ⁻¹', 'd/dx = xⁿ⁺¹']
  },
  {
    id: 'math_integral_power',
    topic: '積分：冪次法則',
    formula: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C',
    meaning: 'x 的 n 次方積分為 x 的 n+1 次方除以 n+1。',
    wrongs: ['xⁿ⁻¹ / (n - 1)', 'xⁿ / n', 'xⁿ⁺² / (n + 2)']
  }
];
