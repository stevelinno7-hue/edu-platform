export async function generateExplanationForQuestion(q) {
  if (q.explanation) return q.explanation;

  const correct = q.options[q.answer];

  if (q.subject === 'english') {
    if (q.subtype === 'vocab') return `依據文意，最適合的選項是「${correct}」。`;
    if (q.subtype === 'grammar') return `依據文法規則，應選「${correct}」。`;
  }

  if (q.subject === 'math') {
    return `依題意列式計算，可得答案為「${correct}」。`;
  }

  if (q.subject === 'science') {
    return `依科學概念判斷，正確答案為「${correct}」。`;
  }

  if (q.subject === 'social') {
    return `依情境與社會科概念判斷，應選「${correct}」。`;
  }

  return `正確答案為「${correct}」。`;
}

export async function generateExplanationsForQuestions(list) {
  const out = [];
  for (const q of list) {
    q.explanation = await generateExplanationForQuestion(q);
    out.push(q);
  }
  return out;
}
