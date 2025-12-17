// ======================================================
// ✅ Science Generators — 自然科自動生成器
// ======================================================

import { SCIENCE_CHEM_LEXICON } from '../../science/science.lexicon.chem.js';
import { SCIENCE_PHYSICS_LEXICON } from '../../science/science.lexicon.phys.js';
import { SCIENCE_BIO_LEXICON } from '../../science/science.lexicon.bio.js';

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
// 1️⃣ 化學概念題
// ======================================================

export function genChemConcept({ grade, topic, index }) {
  const item = pick(SCIENCE_CHEM_LEXICON);

  const options = shuffle([
    item.meaning,
    '與化學無關的描述',
    '錯誤的科學概念',
    '與物理混淆的敘述'
  ]);

  return {
    id: genId('chem', index),
    subject: 'science',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者最接近其意義？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 2️⃣ 物理概念題
// ======================================================

export function genPhysConcept({ grade, topic, index }) {
  const item = pick(SCIENCE_PHYSICS_LEXICON);

  const options = shuffle([
    item.meaning,
    '與物理無關的描述',
    '錯誤的科學定義',
    '與化學混淆的敘述'
  ]);

  return {
    id: genId('phys', index),
    subject: 'science',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者最接近其意義？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 3️⃣ 生物概念題
// ======================================================

export function genBioConcept({ grade, topic, index }) {
  const item = pick(SCIENCE_BIO_LEXICON);

  const options = shuffle([
    item.meaning,
    '與生物無關的描述',
    '錯誤的生命科學概念',
    '與地科混淆的敘述'
  ]);

  return {
    id: genId('bio', index),
    subject: 'science',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者最接近其意義？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 4️⃣ 自然科閱讀題（跨科）
// ======================================================

export function genScienceReading({ grade, topic, index }) {
  const passage =
    '植物進行光合作用時，會利用陽光將二氧化碳與水轉換成葡萄糖與氧氣。這個過程主要在葉綠體中進行，是生態系能量來源的重要基礎。';

  const correct = '光合作用會產生葡萄糖與氧氣。';

  const options = shuffle([
    correct,
    '光合作用會消耗氧氣並產生二氧化碳。',
    '光合作用在粒線體進行。',
    '光合作用不需要陽光。'
  ]);

  return {
    id: genId('sci_read', index),
    subject: 'science',
    grade,
    type: 'choice',
    difficulty: 3,
    question: `${passage}\n\n根據文章，下列何者正確？`,
    options,
    answer: options.indexOf(correct),
    explanation: correct
  };
}
