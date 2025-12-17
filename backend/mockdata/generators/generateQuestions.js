// ======================================================
// ✅ generateQuestions(config) — 全科統一入口
// ======================================================

import { SUBJECT_GENERATORS } from './index.js';

// 小工具：隨機抽
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 小工具：打散
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ======================================================
// ✅ 主函式：generateQuestions
// ======================================================

export function generateQuestions({
  subject = 'english',
  count = 10,
  types = null,   // 若為 null → 自動使用該科所有題型
  grade = 7,
  topic = null
}) {
  const generators = SUBJECT_GENERATORS[subject];

  if (!generators) {
    throw new Error(`Unknown subject: ${subject}`);
  }

  // 若 types 未指定 → 使用全部題型
  let selectedGenerators = generators;

  // 若 types 有指定 → 過濾
  if (Array.isArray(types)) {
    selectedGenerators = generators.filter(fn =>
      types.some(t => fn.name.toLowerCase().includes(t.toLowerCase()))
    );
  }

  if (selectedGenerators.length === 0) {
    throw new Error(`No generators match types: ${types}`);
  }

  const results = [];

  for (let i = 0; i < count; i++) {
    const gen = pickRandom(selectedGenerators);

    const question = gen({
      grade,
      topic,
      index: i
    });

    results.push(question);
  }

  return results;
}
