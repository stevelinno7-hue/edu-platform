// ======================================================
// ✅ Social — 公民資料庫（國中）
// ======================================================

export const SOCIAL_CIVICS = [

  // ===== 民主制度 Democracy =====
  {
    id: 'civ_democracy',
    term: '民主制度',
    meaning: '人民透過選舉與參與政治來共同決定公共事務的制度。',
    examples: [
      '定期選舉',
      '言論自由'
    ],
    wrongs: ['君主專制', '獨裁統治'],
    tags: ['民主', '政治']
  },
  {
    id: 'civ_rule_of_law',
    term: '法治',
    meaning: '政府與人民都必須遵守法律，法律高於個人。',
    examples: [
      '依法行政',
      '法律面前人人平等'
    ],
    wrongs: ['政府可任意行使權力', '法律只限制人民'],
    tags: ['民主', '法律']
  },
  {
    id: 'civ_separation_of_powers',
    term: '三權分立',
    meaning: '將國家權力分為立法、行政、司法，以避免權力過度集中。',
    examples: [
      '立法制定法律',
      '行政執行政策',
      '司法審判案件'
    ],
    wrongs: ['所有權力集中於一人', '軍隊掌握立法權'],
    tags: ['政治']
  },

  // ===== 公民權利與義務 Rights & Duties =====
  {
    id: 'civ_freedom_of_speech',
    term: '言論自由',
    meaning: '人民可自由表達意見，但不得侵害他人權利。',
    examples: [
      '可批評政府',
      '不得散布不實資訊'
    ],
    wrongs: ['可任意侮辱他人', '可散布假消息'],
    tags: ['權利']
  },
  {
    id: 'civ_privacy',
    term: '隱私權',
    meaning: '個人資訊與生活不受他人任意干涉。',
    examples: [
      '個資不得隨意公開',
      '不得未經同意偷拍'
    ],
    wrongs: ['政府可任意監控人民', '任何人都可查看你的資料'],
    tags: ['權利']
  },
  {
    id: 'civ_tax_duty',
    term: '納稅義務',
    meaning: '人民應依法律規定繳納稅款，以支持公共服務。',
    examples: [
      '稅收用於教育、交通、醫療',
      '依法申報所得'
    ],
    wrongs: ['納稅是自願的', '只有企業需要納稅'],
    tags: ['義務']
  },

  // ===== 法律概念 Law =====
  {
    id: 'civ_criminal_law',
    term: '刑法',
    meaning: '規範犯罪行為與刑罰的法律。',
    examples: [
      '偷竊、傷害屬於刑法範圍',
      '刑法保護社會安全'
    ],
    wrongs: ['規範民事糾紛', '規範行政程序'],
    tags: ['法律']
  },
  {
    id: 'civ_civil_law',
    term: '民法',
    meaning: '規範人民間權利義務，如契約、婚姻、財產。',
    examples: [
      '買賣契約',
      '婚姻制度'
    ],
    wrongs: ['規範犯罪行為', '規範政府行政'],
    tags: ['法律']
  },
  {
    id: 'civ_administrative_law',
    term: '行政法',
    meaning: '規範政府行政行為與人民與政府間的關係。',
    examples: [
      '交通罰單',
      '行政處分'
    ],
    wrongs: ['規範民事糾紛', '規範刑事犯罪'],
    tags: ['法律']
  },

  // ===== 政府架構 Government =====
  {
    id: 'civ_local_government',
    term: '地方政府',
    meaning: '負責地方公共事務，如教育、交通、環境管理。',
    examples: [
      '縣市政府',
      '鄉鎮市區公所'
    ],
    wrongs: ['制定國家憲法', '指揮軍隊'],
    tags: ['政府']
  },
  {
    id: 'civ_public_policy',
    term: '公共政策',
    meaning: '政府為解決公共問題所制定的行動方案。',
    examples: [
      '交通改善計畫',
      '環境保護政策'
    ],
    wrongs: ['私人公司內部規定', '個人生活習慣'],
    tags: ['政府']
  },

  // ===== 社會議題 Social Issues =====
  {
    id: 'civ_environmental_protection',
    term: '環境保護',
    meaning: '維護自然環境、減少污染的行動。',
    examples: [
      '垃圾分類',
      '減少塑膠使用'
    ],
    wrongs: ['增加污染', '任意砍伐森林'],
    tags: ['環境']
  },
  {
    id: 'civ_media_literacy',
    term: '媒體識讀',
    meaning: '判斷資訊真偽、理解媒體影響力的能力。',
    examples: [
      '查證消息來源',
      '避免被假新聞誤導'
    ],
    wrongs: ['盲目相信網路資訊', '只看標題不看內容'],
    tags: ['媒體', '素養']
  },
  {
    id: 'civ_cyberbullying',
    term: '網路霸凌',
    meaning: '利用網路攻擊、侮辱或排擠他人的行為。',
    examples: [
      '散布惡意留言',
      '公開他人隱私'
    ],
    wrongs: ['網路安全教育', '正常討論'],
    tags: ['科技', '社會']
  }
];
