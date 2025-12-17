// ======================================================
// ✅ 英文文法 Lexicon（加長版 40+）
// ======================================================

export const ENGLISH_GRAMMAR = [
  // ===== 時態 Tenses =====
  {
    id: 'gram_present_simple',
    term: 'Present Simple',
    meaning: '描述習慣、事實、普遍真理。',
    examples: ['He plays basketball every day.', 'The Earth moves around the Sun.'],
    wrongs: ['Present Continuous', 'Past Simple', 'Future Will'],
    category: '時態'
  },
  {
    id: 'gram_present_cont',
    term: 'Present Continuous',
    meaning: '描述正在發生的動作或近期計畫。',
    examples: ['She is studying now.', 'We are meeting tomorrow.'],
    wrongs: ['Present Simple', 'Past Continuous', 'Future Going To'],
    category: '時態'
  },
  {
    id: 'gram_past_simple',
    term: 'Past Simple',
    meaning: '描述已完成的過去動作。',
    examples: ['He visited Japan last year.', 'They played yesterday.'],
    wrongs: ['Present Perfect', 'Past Continuous', 'Future Will'],
    category: '時態'
  },
  {
    id: 'gram_present_perfect',
    term: 'Present Perfect',
    meaning: '描述過去發生但與現在有關的動作。',
    examples: ['I have lived here for ten years.', 'She has finished her homework.'],
    wrongs: ['Past Simple', 'Present Simple', 'Future Perfect'],
    category: '時態'
  },
  {
    id: 'gram_future_will',
    term: 'Future Will',
    meaning: '描述臨時決定或預測。',
    examples: ['I will help you.', 'It will rain tomorrow.'],
    wrongs: ['Future Going To', 'Present Simple', 'Past Simple'],
    category: '時態'
  },

  // ===== 句型 Sentence Patterns =====
  {
    id: 'gram_svo',
    term: 'SVO',
    meaning: '主詞 + 動詞 + 受詞。',
    examples: ['He likes apples.', 'She reads books.'],
    wrongs: ['SVC', 'SVOO', 'SVOC'],
    category: '句型'
  },
  {
    id: 'gram_svc',
    term: 'SVC',
    meaning: '主詞 + 動詞 + 補語。',
    examples: ['He is happy.', 'The sky became dark.'],
    wrongs: ['SVO', 'SVOO', 'SVOC'],
    category: '句型'
  },
  {
    id: 'gram_svoo',
    term: 'SVOO',
    meaning: '主詞 + 動詞 + 間接受詞 + 直接受詞。',
    examples: ['He gave me a gift.', 'She taught us English.'],
    wrongs: ['SVO', 'SVC', 'SVOC'],
    category: '句型'
  },
  {
    id: 'gram_svoc',
    term: 'SVOC',
    meaning: '主詞 + 動詞 + 受詞 + 補語。',
    examples: ['They elected him president.', 'I found the book interesting.'],
    wrongs: ['SVO', 'SVC', 'SVOO'],
    category: '句型'
  },

  // ===== 子句 Clauses =====
  {
    id: 'gram_noun_clause',
    term: '名詞子句',
    meaning: '可作主詞、受詞、補語。',
    examples: ['I know that he is right.', 'What he said is true.'],
    wrongs: ['副詞子句', '形容詞子句', '不定詞'],
    category: '子句'
  },
  {
    id: 'gram_adj_clause',
    term: '形容詞子句',
    meaning: '修飾名詞，通常由關係代名詞引導。',
    examples: ['The man who lives here is my uncle.'],
    wrongs: ['名詞子句', '副詞子句', '動名詞'],
    category: '子句'
  },
  {
    id: 'gram_adv_clause',
    term: '副詞子句',
    meaning: '修飾動詞、形容詞或整句。',
    examples: ['I left because it was late.', 'When he arrived, we started.'],
    wrongs: ['名詞子句', '形容詞子句', '不定詞'],
    category: '子句'
  },

  // ===== 語法規則 Grammar Rules =====
  {
    id: 'gram_infinitive',
    term: '不定詞',
    meaning: 'to + 原形動詞，可作主詞、受詞、補語。',
    examples: ['To learn is important.', 'I want to eat.'],
    wrongs: ['動名詞', '分詞', '被動語態'],
    category: '語法'
  },
  {
    id: 'gram_gerund',
    term: '動名詞',
    meaning: 'V-ing，可作主詞或受詞。',
    examples: ['Swimming is fun.', 'I enjoy reading.'],
    wrongs: ['不定詞', '分詞', '名詞子句'],
    category: '語法'
  },
  {
    id: 'gram_passive',
    term: '被動語態',
    meaning: 'be + p.p.，強調受動者。',
    examples: ['The cake was eaten.', 'The book is written by Tom.'],
    wrongs: ['主動語態', '現在完成式', '進行式'],
    category: '語法'
  },
  {
    id: 'gram_comparative',
    term: '比較級',
    meaning: '比較兩者差異，常加 -er 或 more。',
    examples: ['He is taller than me.', 'This book is more interesting.'],
    wrongs: ['最高級', '原級', '被動語態'],
    category: '語法'
  },
  {
    id: 'gram_superlative',
    term: '最高級',
    meaning: '三者以上比較，常加 -est 或 most。',
    examples: ['He is the tallest.', 'This is the most useful tool.'],
    wrongs: ['比較級', '原級', '被動語態'],
    category: '語法'
  },
  // ===== 關係代名詞 Relative Pronouns =====
{
  id: 'gram_relative_who',
  term: '關係代名詞 who',
  meaning: '用於指人，作主格。',
  examples: ['The girl who sings is my sister.'],
  wrongs: ['which', 'that (物)', 'whom (受格)'],
  category: '關係代名詞'
},
{
  id: 'gram_relative_which',
  term: '關係代名詞 which',
  meaning: '用於指物，作主格或受格。',
  examples: ['The book which I bought is interesting.'],
  wrongs: ['who', 'whom', 'that (人)'],
  category: '關係代名詞'
},
{
  id: 'gram_relative_that',
  term: '關係代名詞 that',
  meaning: '可指人或物，常用於限定用法。',
  examples: ['The man that helped me is kind.'],
  wrongs: ['which (非限定)', 'whom', 'whose'],
  category: '關係代名詞'
},
{
  id: 'gram_relative_whose',
  term: '關係代名詞 whose',
  meaning: '表示所有格。',
  examples: ['The boy whose bike was stolen is crying.'],
  wrongs: ['who', 'which', 'that'],
  category: '關係代名詞'
},

// ===== 倒裝句 Inversion =====
{
  id: 'gram_inversion_never',
  term: '倒裝：Never + 助動詞 + 主詞',
  meaning: '強調否定副詞時使用倒裝。',
  examples: ['Never have I seen such a view.'],
  wrongs: ['Never I have seen...', 'I never have seen...'],
  category: '倒裝句'
},
{
  id: 'gram_inversion_here_there',
  term: '倒裝：Here / There + V + S',
  meaning: '用於表示出現、到達。',
  examples: ['Here comes the bus.', 'There goes my money.'],
  wrongs: ['Here the bus comes.', 'There my money goes.'],
  category: '倒裝句'
},

// ===== 虛主詞 It =====
{
  id: 'gram_dummy_it',
  term: '虛主詞 it',
  meaning: '用 it 作形式主詞，真正主詞放後面。',
  examples: ['It is important to study.', 'It takes time to learn.'],
  wrongs: ['To study is important (較少用)', 'Study is important'],
  category: '句型'
},

// ===== 使役動詞 Causative Verbs =====
{
  id: 'gram_causative_make',
  term: '使役動詞 make',
  meaning: 'make + 人 + 原形動詞（強迫）',
  examples: ['The teacher made us clean the room.'],
  wrongs: ['made us to clean', 'made us cleaning'],
  category: '使役動詞'
},
{
  id: 'gram_causative_let',
  term: '使役動詞 let',
  meaning: 'let + 人 + 原形動詞（允許）',
  examples: ['My mom let me go out.'],
  wrongs: ['let me to go', 'let me going'],
  category: '使役動詞'
},
{
  id: 'gram_causative_have',
  term: '使役動詞 have',
  meaning: 'have + 人 + 原形動詞（請某人做）',
  examples: ['I had him fix my bike.'],
  wrongs: ['had him to fix', 'had him fixing'],
  category: '使役動詞'
},

// ===== 感官動詞 Sense Verbs =====
{
  id: 'gram_sense_see',
  term: '感官動詞 see',
  meaning: 'see + 人 + 原形 / V-ing',
  examples: ['I saw him leave.', 'I saw him leaving.'],
  wrongs: ['saw him to leave', 'saw him left'],
  category: '感官動詞'
},

// ===== 連接詞 Conjunctions =====
{
  id: 'gram_conj_because',
  term: 'because',
  meaning: '表示原因。',
  examples: ['I stayed home because it rained.'],
  wrongs: ['although', 'unless', 'if'],
  category: '連接詞'
},
{
  id: 'gram_conj_although',
  term: 'although',
  meaning: '表示讓步。',
  examples: ['Although it rained, we went out.'],
  wrongs: ['because', 'if', 'unless'],
  category: '連接詞'
},
{
  id: 'gram_conj_unless',
  term: 'unless',
  meaning: '表示「除非」。',
  examples: ['You will fail unless you study.'],
  wrongs: ['although', 'because', 'if'],
  category: '連接詞'
},

// ===== 比較句型 Comparison =====
{
  id: 'gram_comparison_as_as',
  term: 'as...as',
  meaning: '表示相同程度。',
  examples: ['He is as tall as his brother.'],
  wrongs: ['taller than', 'the tallest', 'more tall'],
  category: '比較句型'
},
{
  id: 'gram_comparison_er_than',
  term: '-er than',
  meaning: '比較級。',
  examples: ['She is taller than me.'],
  wrongs: ['as tall as', 'the tallest', 'more tall'],
  category: '比較句型'
},

// ===== 被動語態進階 Passive (Advanced) =====
{
  id: 'gram_passive_progressive',
  term: '被動進行式',
  meaning: 'be being p.p.',
  examples: ['The house is being built.'],
  wrongs: ['is building', 'is built', 'was being build'],
  category: '被動語態'
},
{
  id: 'gram_passive_perfect',
  term: '被動完成式',
  meaning: 'have been p.p.',
  examples: ['The work has been finished.'],
  wrongs: ['has finished', 'has being finished'],
  category: '被動語態'
},

// ===== 名詞片語 Noun Phrases =====
{
  id: 'gram_np_a_lot_of',
  term: 'a lot of',
  meaning: '許多（可數/不可數）',
  examples: ['A lot of students joined the club.'],
  wrongs: ['many (不可數)', 'much students'],
  category: '名詞片語'
},
{
  id: 'gram_np_plenty_of',
  term: 'plenty of',
  meaning: '大量的',
  examples: ['There is plenty of water.'],
  wrongs: ['many water', 'much waters'],
  category: '名詞片語'
},

// ===== 動詞片語 Verb Patterns =====
{
  id: 'gram_v_ing_after_prep',
  term: '介係詞後接 V-ing',
  meaning: '介係詞後面必須接動名詞。',
  examples: ['He is good at playing basketball.'],
  wrongs: ['good at play', 'good at to play'],
  category: '動詞片語'
},
{
  id: 'gram_v_to_inf',
  term: '動詞 + to V',
  meaning: '某些動詞後接不定詞。',
  examples: ['He decided to leave.'],
  wrongs: ['decided leaving', 'decided leave'],
  category: '動詞片語'
},

// ===== 句型變化 Transformations =====
{
  id: 'gram_transform_passive',
  term: '主動變被動',
  meaning: '受詞變主詞，動詞變 be + p.p.',
  examples: ['Tom wrote the letter → The letter was written by Tom.'],
  wrongs: ['The letter wrote Tom.', 'The letter is write by Tom.'],
  category: '句型'
},
{
  id: 'gram_transform_indirect',
  term: '直接引語變間接引語',
  meaning: '時態後退、代名詞改變。',
  examples: ['He said, "I am tired." → He said that he was tired.'],
  wrongs: ['He said he is tired.', 'He said that I was tired.'],
  category: '句型'
}
];


