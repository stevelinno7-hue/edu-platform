export function mapGeneratorToSubtype(name) {
  name = name.toLowerCase();
  if (name.includes('vocab')) return 'vocab';
  if (name.includes('grammar')) return 'grammar';
  if (name.includes('reading')) return 'reading';
  if (name.includes('cloze')) return 'cloze';
  if (name.includes('lexicon')) return 'lexicon';
  if (name.includes('formula')) return 'formula';
  if (name.includes('word')) return 'word';
  if (name.includes('chem')) return 'chemistry';
  if (name.includes('phys')) return 'physics';
  if (name.includes('bio')) return 'biology';
  if (name.includes('geo')) return 'geography';
  if (name.includes('his')) return 'history';
  if (name.includes('civ')) return 'civics';
  if (name.includes('scenario')) return 'scenario';
  return 'generic';
}

export function allocateCountsByRatio(total, ratios, subtypes) {
  if (!ratios) {
    const base = Math.floor(total / subtypes.length);
    const result = {};
    subtypes.forEach(st => (result[st] = base));
    let remain = total - base * subtypes.length;
    let i = 0;
    while (remain--) {
      result[subtypes[i % subtypes.length]]++;
      i++;
    }
    return result;
  }

  const result = {};
  let sum = 0;
  subtypes.forEach(st => (sum += ratios[st] || 0));

  if (sum === 0) return allocateCountsByRatio(total, null, subtypes);

  let allocated = 0;
  subtypes.forEach((st, i) => {
    let count = Math.floor(((ratios[st] || 0) / sum) * total);
    if (i === subtypes.length - 1) count = total - allocated;
    result[st] = count;
    allocated += count;
  });

  return result;
}
