// ======================================================
// ✅ Math Lexicon — 數學概念庫（國中 + 高中）
// ======================================================

export const MATH_FORMULA_LEXICON = [

  // ===== 國中：代數 Algebra =====
  {
    id: 'math_linear_equation',
    term: '一次方程式',
    meaning: '含有一個未知數，且未知數的最高次方為一次的方程式。',
    examples: [
      '2x + 3 = 11',
      '5x - 7 = 18'
    ],
    wrongs: ['x² + 3x + 2 = 0', '3xy = 12', 'x³ = 27'],
    tags: ['國中', '代數']
  },
  {
    id: 'math_ratio',
    term: '比',
    meaning: '比較兩個數量的大小關係。',
    examples: [
      '男生：女生 = 3：2',
      '糖：水 = 1：4'
    ],
    wrongs: ['加法', '減法', '平方根'],
    tags: ['國中', '代數']
  },
  {
    id: 'math_proportion',
    term: '比例式',
    meaning: '兩個比相等所形成的式子。',
    examples: [
      'a/b = c/d',
      '3/4 = 6/8'
    ],
    wrongs: ['a + b = c + d', 'ab = cd', 'a - b = c - d'],
    tags: ['國中', '代數']
  },

  // ===== 國中：幾何 Geometry =====
  {
    id: 'math_parallel_lines',
    term: '平行線性質',
    meaning: '平行線被截線所形成的對應角、內錯角相等。',
    examples: [
      '對應角相等 → 平行',
      '內錯角相等 → 平行'
    ],
    wrongs: ['同位角必不相等', '外角必大於內角'],
    tags: ['國中', '幾何']
  },
  {
    id: 'math_similarity',
    term: '相似形',
    meaning: '形狀相同但大小不一定相同的圖形。',
    examples: [
      '三角形相似 → 對應角相等、對應邊成比例',
      '放大縮小的圖形'
    ],
    wrongs: ['全等形', '不規則圖形', '面積相等才算相似'],
    tags: ['國中', '幾何']
  },

  // ===== 國中：統計 Statistics =====
  {
    id: 'math_mean',
    term: '平均數',
    meaning: '所有數值的總和除以數量。',
    examples: [
      '(3 + 5 + 7) / 3 = 5',
      '平均數反映資料的集中趨勢'
    ],
    wrongs: ['最大值', '最小值', '中位數'],
    tags: ['國中', '統計']
  },
  {
    id: 'math_median',
    term: '中位數',
    meaning: '將資料排序後位於中間的值。',
    examples: [
      '資料：3, 5, 8 → 中位數 = 5',
      '資料：2, 4, 6, 8 → 中位數 = (4 + 6) / 2 = 5'
    ],
    wrongs: ['平均數', '眾數', '最大值'],
    tags: ['國中', '統計']
  },

  // ===== 國中：機率 Probability =====
  {
    id: 'math_probability',
    term: '機率',
    meaning: '某事件發生的可能性。',
    examples: [
      '擲骰子出現 3 的機率 = 1/6',
      '抽撲克牌抽到紅心的機率 = 1/4'
    ],
    wrongs: ['必然事件 = 0', '不可能事件 = 1'],
    tags: ['國中', '機率']
  },

  // ===== 高中：函數 Functions =====
  {
    id: 'math_function',
    term: '函數',
    meaning: '每一個 x 對應到唯一的 y。',
    examples: [
      'y = 2x + 3',
      'y = √x'
    ],
    wrongs: ['一個 x 對應多個 y', 'x² + y² = 1（不是函數）'],
    tags: ['高中', '函數']
  },
  {
    id: 'math_quadratic_function',
    term: '二次函數',
    meaning: '函數形式為 y = ax² + bx + c。',
    examples: [
      'y = x² - 4x + 3',
      'y = -2x² + 5'
    ],
    wrongs: ['y = 2x + 1', 'y = 3/x', 'y = √x'],
    tags: ['高中', '函數']
  },

  // ===== 高中：向量 Vectors =====
  {
    id: 'math_vector',
    term: '向量',
    meaning: '具有大小與方向的量。',
    examples: [
      '位移、速度、力都是向量',
      '→AB = (x₂ - x₁, y₂ - y₁)'
    ],
    wrongs: ['質量', '溫度', '時間（純量）'],
    tags: ['高中', '向量']
  },
  {
    id: 'math_dot_product',
    term: '內積',
    meaning: '兩向量的內積為 |a||b|cosθ。',
    examples: [
      'a·b = axbx + ayby',
      '垂直 → 內積 = 0'
    ],
    wrongs: ['|a| + |b|', 'a × b（外積）'],
    tags: ['高中', '向量']
  },

  // ===== 高中：極限 Limits =====
  {
    id: 'math_limit',
    term: '極限',
    meaning: '描述函數在某點附近的行為。',
    examples: [
      'lim (x→2) (x² - 4)/(x - 2) = 4',
      '極限可用於定義導數'
    ],
    wrongs: ['直接代入永遠可行', '極限一定存在'],
    tags: ['高中', '極限']
  },

  // ===== 高中：微分 Derivatives =====
  {
    id: 'math_derivative',
    term: '導數',
    meaning: '函數的瞬時變化率。',
    examples: [
      '速度 = 位移的導數',
      'f′(x) = lim (h→0) [f(x+h) - f(x)] / h'
    ],
    wrongs: ['積分的反義詞', '函數的平均變化率'],
    tags: ['高中', '微分']
  },

  // ===== 高中：積分 Integrals =====
  {
    id: 'math_integral',
    term: '積分',
    meaning: '函數在某區間下的面積。',
    examples: [
      '∫ f(x) dx 表示面積累積',
      '積分是微分的反運算'
    ],
    wrongs: ['求斜率', '求極限', '求函數值'],
    tags: ['高中', '積分']
  }
];
