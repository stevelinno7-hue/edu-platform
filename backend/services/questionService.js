import { SUBJECT_GENERATORS } from '../mockdata/generators/index.js';
import { mapGeneratorToSubtype, allocateCountsByRatio } from './questionService.helpers.js';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateQuestionsWithConfig({
  subject,
  grade,
  count,
  typeRatios,
  topic
}) {
  const generators = SUBJECT_GENERATORS[subject];
  if (!generators) throw new Error(`Unknown subject: ${subject}`);

  const bySubtype = {};
  generators.forEach(fn => {
    const subtype = mapGeneratorToSubtype(fn.name);
    if (!bySubtype[subtype]) bySubtype[subtype] = [];
    bySubtype[subtype].push(fn);
  });

  const subtypes = Object.keys(bySubtype);
  const counts = allocateCountsByRatio(count, typeRatios, subtypes);

  const results = [];
  let index = 0;

  for (const subtype of subtypes) {
    const need = counts[subtype];
    const gens = bySubtype[subtype];

    for (let i = 0; i < need; i++) {
      const gen = pick(gens);
      const q = gen({ grade, topic, index });
      q.subtype = subtype;
      results.push(q);
      index++;
    }
  }

  return results;
}
const fs = require("fs");
const path = require("path");

function getFilePath(subject) {
  return path.join(__dirname, "..", "mockdata", subject, "questions.json");
}

exports.addQuestion = async (question) => {
  const file = getFilePath(question.subject);
  const data = JSON.parse(fs.readFileSync(file));
  data.push(question);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  return question;
};

exports.updateQuestion = async (id, updated) => {
  const file = getFilePath(updated.subject);
  const data = JSON.parse(fs.readFileSync(file));
  const idx = data.findIndex((q) => q.id === id);
  if (idx === -1) return null;
  data[idx] = { ...data[idx], ...updated };
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  return data[idx];
};

exports.deleteQuestion = async (id) => {
  const subjects = ["english", "math", "science", "social"];
  for (const subject of subjects) {
    const file = getFilePath(subject);
    const data = JSON.parse(fs.readFileSync(file));
    const filtered = data.filter((q) => q.id !== id);
    fs.writeFileSync(file, JSON.stringify(filtered, null, 2));
  }
  return { success: true };
};
