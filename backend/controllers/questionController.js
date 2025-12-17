import { generateQuestionsWithConfig } from '../services/questionService.js';
import { generateExplanationsForQuestions } from '../services/explanationService.js';

export async function getQuestions(req, res) {
  try {
    const {
      subject = 'english',
      grade = 7,
      count = 10,
      typeRatios = null,
      topic = null,
      withExplanation = true
    } = req.body || {};

    const raw = generateQuestionsWithConfig({
      subject,
      grade,
      count,
      typeRatios,
      topic
    });

    const questions = withExplanation
      ? await generateExplanationsForQuestions(raw)
      : raw;

    res.json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
}
