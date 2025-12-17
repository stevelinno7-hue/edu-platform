// ======================================================
// ✅ Social Generators — 社會科自動生成器
// ======================================================

import { SOCIAL_HISTORY } from '../../social/social.history.js';
import { SOCIAL_GEOGRAPHY } from '../../social/social.geography.js';
import { SOCIAL_CIVICS } from '../../social/social.civics.js';
import { SOCIAL_LEXICON } from '../../social/social.lexicon.js';

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
// 1️⃣ 歷史概念題
// ======================================================

export function genHistoryConcept({ grade, topic, index }) {
  const item = pick(SOCIAL_HISTORY);

  const options = shuffle([
    item.meaning,
    '與此時代無關的描述',
    '錯誤的歷史事件',
    '與地理混淆的敘述'
  ]);

  return {
    id: genId('his', index),
    subject: 'social',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者正確？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 2️⃣ 地理概念題
// ======================================================

export function genGeographyConcept({ grade, topic, index }) {
  const item = pick(SOCIAL_GEOGRAPHY);

  const options = shuffle([
    item.meaning,
    '與地理無關的描述',
    '錯誤的自然環境概念',
    '與歷史混淆的敘述'
  ]);

  return {
    id: genId('geo', index),
    subject: 'social',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者正確？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 3️⃣ 公民概念題
// ======================================================

export function genCivicsConcept({ grade, topic, index }) {
  const item = pick(SOCIAL_CIVICS);

  const options = shuffle([
    item.meaning,
    '與公民無關的描述',
    '錯誤的法律概念',
    '與政治混淆的敘述'
  ]);

  return {
    id: genId('civ', index),
    subject: 'social',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者正確？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 4️⃣ 社會素養題（情境 → 概念）
// ======================================================

export function genSocialScenario({ grade, topic, index }) {
  const item = pick(SOCIAL_LEXICON);

  const scenario = pick([
    '某城市推動減塑政策，鼓勵民眾自備購物袋。',
    '學生在網路上看到未經查證的訊息，決定比對多個來源。',
    '政府推動公共運輸改善計畫，以減少交通壅塞。',
    '社區舉辦多元文化節，邀請不同族群分享文化。'
  ]);

  const options = shuffle([
    item.term,
    '全球化',
    '都市化',
    '偏見'
  ]);

  return {
    id: genId('soc_scenario', index),
    subject: 'social',
    grade,
    type: 'choice',
    difficulty: 3,
    question: `${scenario}\n\n此情境最接近哪一個概念？`,
    options,
    answer: options.indexOf(item.term),
    explanation: `此情境屬於「${item.term}」。`
  };
}
