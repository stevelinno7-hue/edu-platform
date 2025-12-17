// ======================================================
// ✅ English generators — 英文自動生成器
// 依賴：ENGLISH_WORDS, ENGLISH_GRAMMAR, ENGLISH_LEXICON
// ======================================================

import { ENGLISH_WORDS } from './english.words.js';
import { ENGLISH_GRAMMAR } from './english.grammar.js';
import { ENGLISH_LEXICON } from './english.lexicon.js';

// ==== 小工具 ====

// 隨機抽一個
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 打散
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// 統一 ID 產生器（避免重複）
function genId(prefix, index) {
  return `${prefix}_${Date.now()}_${index}_${Math.floor(Math.random() * 10000)}`;
}

// ======================================================
// 1️⃣ 單字題：英 → 中（字義辨識）
// ======================================================

export function genEnglishVocabToChinese({ grade, topic, index }) {
  const correct = getRandomItem(ENGLISH_WORDS);
  const distractors = shuffle(
    ENGLISH_WORDS.filter(w => w.word !== correct.word)
  ).slice(0, 3);

  const options = shuffle([correct, ...distractors]).map(w => w.meaning);

  return {
    id: genId('eng_vocab_cn', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `單字「${correct.word}」的中文意思為何？`,
    options,
    answer: options.indexOf(correct.meaning),
    explanation: `「${correct.word}」(${correct.pos}) 的意思是「${correct.meaning}」。`
  };
}

// ======================================================
// 2️⃣ 單字題：中 → 英（拼字辨識）
// ======================================================

export function genEnglishVocabToEnglish({ grade, topic, index }) {
  const correct = getRandomItem(ENGLISH_WORDS);
  const distractors = shuffle(
    ENGLISH_WORDS.filter(w => w.word !== correct.word)
  ).slice(0, 3);

  const options = shuffle([correct, ...distractors]).map(w => w.word);

  return {
    id: genId('eng_vocab_en', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `下列何者最符合「${correct.meaning}」的英文？`,
    options,
    answer: options.indexOf(correct.word),
    explanation: `「${correct.meaning}」的英文是「${correct.word}」。`
  };
}

// ======================================================
// 3️⃣ 單字題：例句填空（片語 / 動詞 / 名詞）
// ======================================================

export function genEnglishVocabCloze({ grade, topic, index }) {
  const candidates = ENGLISH_WORDS.filter(w => !w.word.includes(' ')); // 先避開片語
  const correct = getRandomItem(candidates);

  const sentenceTemplates = [
    `He ______ every day to ${correct.meaning} better.`,
    `Many students want to ______ their ${correct.meaning}.`,
    `It is important to ______ if you want success.`
  ];

  const sentence = getRandomItem(sentenceTemplates);
  const distractors = shuffle(
    candidates.filter(w => w.word !== correct.word)
  ).slice(0, 3);

  const options = shuffle([correct, ...distractors]).map(w => w.word);

  return {
    id: genId('eng_vocab_cloze', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 3,
    question: sentence,
    options,
    answer: options.indexOf(correct.word),
    explanation: `依文意應填入「${correct.word}」，與句意「${correct.meaning}」相符。`
  };
}

// ======================================================
// 4️⃣ 文法題：時態 & 結構填空（Grammar-based Cloze）
// ======================================================

export function genEnglishGrammarTense({ grade, topic, index }) {
  const items = [
    {
      zh: '他每天早上七點起床。',
      en: 'He ______ up at seven every morning.',
      correct: 'gets',
      wrongs: ['got', 'is getting', 'will get']
    },
    {
      zh: '她昨天在圖書館讀書。',
      en: 'She ______ in the library yesterday.',
      correct: 'studied',
      wrongs: ['studies', 'is studying', 'will study']
    },
    {
      zh: '我們現在正在準備考試。',
      en: 'We ______ for the test now.',
      correct: 'are studying',
      wrongs: ['study', 'studied', 'will study']
    }
  ];

  const item = getRandomItem(items);
  const options = shuffle([item.correct, ...item.wrongs]);

  return {
    id: genId('eng_grammar_tense', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: item.en,
    options,
    answer: options.indexOf(item.correct),
    explanation: `句意：「${item.zh}」，依時間提示與頻率副詞應使用「${item.correct}」。`
  };
}

// ======================================================
// 5️⃣ 文法題：概念對應（從 ENGLISH_GRAMMAR 抽）
// ======================================================

export function genEnglishGrammarConcept({ grade, topic, index }) {
  const item = getRandomItem(ENGLISH_GRAMMAR);
  const options = shuffle([
    item.meaning,
    '描述單字拼寫規則。',
    '用於表達地點的名詞。',
    '用於表示顏色或形狀的形容詞。'
  ]);

  return {
    id: genId('eng_grammar_concept', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者是較正確的說明？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 6️⃣ 文法題：例句判斷（正誤判斷題）
// ======================================================

export function genEnglishGrammarCorrectSentence({ grade, topic, index }) {
  const items = [
    {
      term: '主詞動詞一致',
      correct: 'He usually gets up at six.',
      wrongs: [
        'He usually get up at six.',
        'He usually gets up at sixes.',
        'He usually getting up at six.'
      ]
    },
    {
      term: '現在完成式',
      correct: 'She has lived here for five years.',
      wrongs: [
        'She lived here for five years (到現在仍住)。',
        'She has live here for five years.',
        'She has been live here for five years.'
      ]
    }
  ];

  const item = getRandomItem(items);
  const options = shuffle([item.correct, ...item.wrongs]);

  return {
    id: genId('eng_grammar_sentence', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 3,
    question: `關於「${item.term}」，下列句子何者較為正確？`,
    options,
    answer: options.indexOf(item.correct),
    explanation: `正確句型應為：「${item.correct}」。`
  };
}

// ======================================================
// 7️⃣ Lexicon 題：概念理解（語意 / 素養）
// ======================================================

export function genEnglishLexiconConcept({ grade, topic, index }) {
  const item = getRandomItem(ENGLISH_LEXICON);

  const options = shuffle([
    item.meaning,
    '指一種食物或飲料的品牌名稱。',
    '只用來描述天氣的英文用語。',
    '指一種運動比賽的專有名詞。'
  ]);

  return {
    id: genId('eng_lexicon_concept', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `關於「${item.term}」，下列何者最接近其意思？`,
    options,
    answer: options.indexOf(item.meaning),
    explanation: item.meaning
  };
}

// ======================================================
// 8️⃣ Lexicon 題：情境應用（情境 → 概念）
// ======================================================

export function genEnglishLexiconScenario({ grade, topic, index }) {
  const item = getRandomItem(ENGLISH_LEXICON);

  const scenarioTemplates = [
    `學生在準備考試時，使用行事曆安排每天要完成的內容，以減少壓力。這種做法最接近哪一個概念？`,
    `一位同學在聽別人說話時，會點頭、眼神接觸，並且回應對方的重點。這種行為最符合下列何者？`,
    `某社區舉辦活動，教導居民如何善用網路查找正確資訊，避免假新聞。這最接近哪一個概念？`
  ];

  const scenario = getRandomItem(scenarioTemplates);

  const options = shuffle([
    item.term,
    'Global Warming',
    'Traditional Culture',
    'Fast Food'
  ]);

  return {
    id: genId('eng_lexicon_scenario', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 3,
    question: `${scenario}`,
    options,
    answer: options.indexOf(item.term),
    explanation: `本題情境描述的是「${item.term}」的應用情形。`
  };
}

// ======================================================
// 9️⃣ 簡易閱讀題（固定短文 + 理解題）
// ======================================================

export function genEnglishShortReading({ grade, topic, index }) {
  const passage =
    'Tom studies English every day. He reviews vocabulary, practices reading, and sometimes watches English videos. He believes that with enough practice, his English will improve.';

  const correct = 'He studies and practices English every day.';
  const options = shuffle([
    correct,
    'He only studies English before tests.',
    'He thinks practice is not important.',
    'He never watches English videos.'
  ]);

  return {
    id: genId('eng_read_short', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: `${passage}\n\n根據文章，下列哪一項最能描述 Tom 的學習方式？`,
    options,
    answer: options.indexOf(correct),
    explanation: '文中提到他每天讀英文、複習單字並練習閱讀，有時看影片。'
  };
}

// ======================================================
// 🔟 克漏字（單句）
// ======================================================

export function genEnglishSentenceCloze({ grade, topic, index }) {
  const items = [
    {
      zh: 'Eric 每天讀英文，他認為這對他的未來很重要。',
      en: 'Eric ______ English every day. He thinks it is very important for his future.',
      correct: 'studies',
      wrongs: ['study', 'studied', 'is studying']
    },
    {
      zh: '如果明天下雨，我們就待在家裡。',
      en: 'If it ______ tomorrow, we will stay home.',
      correct: 'rains',
      wrongs: ['rain', 'rained', 'is raining']
    }
  ];

  const item = getRandomItem(items);
  const options = shuffle([item.correct, ...item.wrongs]);

  return {
    id: genId('eng_sentence_cloze', index),
    subject: 'english',
    grade,
    type: 'choice',
    difficulty: 2,
    question: item.en,
    options,
    answer: options.indexOf(item.correct),
    explanation: `句意：「${item.zh}」，依條件句或時態規則應使用「${item.correct}」。`
  };
}
