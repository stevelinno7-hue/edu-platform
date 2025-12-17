// ======================================================
// ✅ Math Generators — 數學自動生成器
// ======================================================

import { MATH_FORMULAS } from '../../math/math.formulas.js';
import { MATH_FORMULA_LEXICON } from '../../math/math.lexicon.js';

// 小工具
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function genId(prefix, index) {
  return `${prefix}_${Date.now()}_${index}`;
}

// ======================================================
// 1️⃣ 公式概念題（公式 → 意義）
// ======================================================

export function genMathFormulaConcept({ grade, topic, index }) {
  const item = pick(MATH_FORMULAS);

  const options = shuffle([
    item.meaning,
    '與此公式無關的描述',
    '錯誤的數學定義',
    '與物理概念混淆的敘述'
  ]);

  return {
    id: genId('math_formula', index),
    subject: 'math',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於公式「${item.formula}」，下列何者最接近其意義？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 2️⃣ 計算題（簡單運算）
// ======================================================

export function genMathCalculation({ grade, topic, index }) {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;

  const correct = a + b;
  const wrongs = shuffle([
    correct + 1,
    correct - 1,
    correct + 2
  ]);

  const options = shuffle([correct, ...wrongs]);

  return {
    id: genId('math_calc', index),
    subject: 'math',
    grade,
    type: 'choice',
    difficulty: 1,
    question: `${a} + ${b} = ?`,
    options,
    answer: options.indexOf(correct),
    explanation: `${a} + ${b} = ${correct}`
  };
}

// ======================================================
// 3️⃣ 幾何題（面積 / 周長）
// ======================================================

export function genMathGeometry({ grade, topic, index }) {
  const w = Math.floor(Math.random() * 10) + 2;
  const h = Math.floor(Math.random() * 10) + 2;

  const correct = w * h;
  const wrongs = shuffle([
    w + h,
    w * 2 + h * 2,
    w * h + 2
  ]);

  const options = shuffle([correct, ...wrongs]);

  return {
    id: genId('math_geo', index),
    subject: 'math',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `一個長方形長 ${w}、寬 ${h}，面積為多少？`,
    options,
    answer: options.indexOf(correct),
    explanation: `長方形面積 = 長 × 寬 = ${w} × ${h} = ${correct}`
  };
}

// ======================================================
// 4️⃣ 數學素養題（文字敘述 → 計算）
// ======================================================

export function genMathWordProblem({ grade, topic, index }) {
  const price = 50;
  const qty = Math.floor(Math.random() * 5) + 2;
  const correct = price * qty;

  const options = shuffle([
    correct,
    correct + 10,
    correct - 10,
    correct + 20
  ]);

  return {
    id: genId('math_word', index),
    subject: 'math',
    grade,
    type: 'choice',
    difficulty: 3,
    question: `小明買了 ${qty} 杯飲料，每杯 ${price} 元，他總共要付多少錢？`,
    options,
    answer: options.indexOf(correct),
    explanation: `${price} × ${qty} = ${correct}`
  };
}
