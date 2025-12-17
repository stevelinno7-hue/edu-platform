// ======================================================
// ✅ 全科題型工廠 — SUBJECT_GENERATORS
// ======================================================

// ===== 英文 =====
import {
  genEnglishVocabToChinese,
  genEnglishVocabToEnglish,
  genEnglishVocabCloze,
  genEnglishGrammarTense,
  genEnglishGrammarConcept,
  genEnglishGrammarCorrectSentence,
  genEnglishLexiconConcept,
  genEnglishLexiconScenario,
  genEnglishShortReading,
  genEnglishSentenceCloze
} from './english/english.generators.js';

// ===== 數學 =====
import {
  genMathFormulaConcept,
  genMathCalculation,
  genMathGeometry,
  genMathWordProblem
} from './math/math.generators.js';

// ===== 自然科 =====
import {
  genChemConcept,
  genPhysConcept,
  genBioConcept,
  genScienceReading
} from './science/science.generators.js';

// ===== 社會科 =====
import {
  genHistoryConcept,
  genGeographyConcept,
  genCivicsConcept,
  genSocialScenario
} from './social/social.generators.js';

// ======================================================
// ✅ 主入口：SUBJECT_GENERATORS
// ======================================================

export const SUBJECT_GENERATORS = {
  english: [
    genEnglishVocabToChinese,
    genEnglishVocabToEnglish,
    genEnglishVocabCloze,
    genEnglishGrammarTense,
    genEnglishGrammarConcept,
    genEnglishGrammarCorrectSentence,
    genEnglishLexiconConcept,
    genEnglishLexiconScenario,
    genEnglishShortReading,
    genEnglishSentenceCloze
  ],

  math: [
    genMathFormulaConcept,
    genMathCalculation,
    genMathGeometry,
    genMathWordProblem
  ],

  science: [
    genChemConcept,
    genPhysConcept,
    genBioConcept,
    genScienceReading
  ],

  social: [
    genHistoryConcept,
    genGeographyConcept,
    genCivicsConcept,
    genSocialScenario
  ]
};
