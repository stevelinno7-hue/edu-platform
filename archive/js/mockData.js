// assets/js/mockData.js

export const SYSTEM_CONFIG = {
    SUBJECTS: {
        chinese: { label: '國文', icon: '📖', color: '#E11D48' },
        english: { label: '英文', icon: '🔤', color: '#2563EB' },
        math: { label: '數學', icon: '🧮', color: '#F59E0B' },
        science: { label: '自然', icon: '🧪', color: '#10B981' },
        social: { label: '社會', icon: '🌏', color: '#8B5CF6' }
    },
    GRADES: [
        { id: 'g7', label: '七年級' }, { id: 'g8', label: '八年級' }, { id: 'g9', label: '九年級' },
        { id: 'h1', label: '高一' }, { id: 'h2', label: '高二' }, { id: 'h3', label: '高三' }
    ]
};

// --- 精選高品質封面圖 ---
const COVER_IMAGES = {
    math: ['https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80', 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&q=80'],
    english: ['https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'],
    science: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80'],
    social: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80', 'https://images.unsplash.com/photo-1552086432-8495db631336?w=800&q=80'],
    chinese: ['https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&q=80', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80']
};

// --- 真實課綱資料庫 ---
const REAL_TOPICS = {
    math: ['整數的運算', '分數的運算', '一元一次方程式', '二元一次聯立', '直角坐標與二元一次', '比與比例', '一元一次不等式', '乘法公式與多項式', '平方根與勾股定理'],
    english: ['Be動詞與代名詞', '現在進行式', '現在簡單式', '過去式與未來式', '形容詞與副詞', '不定詞與動名詞', '連接詞與介系詞', '被動語態', '現在完成式'],
    science: ['科學方法與實驗', '生命的特性', '生物體的營養', '生物體的運輸', '協調與作用', '生殖與遺傳', '演化與生物多樣性', '物質的組成', '波動與聲音'],
    social: ['台灣的地理位置', '台灣的地形與氣候', '台灣的人口與文化', '台灣的產業與經濟', '史前文化與原住民', '國際競爭時期', '清帝國時期', '日治時期', '中華民國時期'],
    chinese: ['絕句選讀', '律詩選讀', '宋詞選讀', '元曲選讀', '古文觀止：師說', '古文觀止：岳陽樓記', '現代詩賞析', '白話散文：背影', '應用文：書信與便條']
};

function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// --- 自動生成引擎 ---
function generateMassiveData() {
    console.log('⚡ 正在記憶體中生成高品質模擬資料...');
    const courses = [];
    const questions = [];
    let qCount = 0;
    
    SYSTEM_CONFIG.GRADES.forEach(g => {
        Object.keys(SYSTEM_CONFIG.SUBJECTS).forEach(s => {
            const topics = REAL_TOPICS[s];
            // 每個年級每科生成 10 堂課
            topics.forEach((topic, i) => {
                const cid = `c_${g.id}_${s}_${i}`; // 例如: c_g7_math_0
                const thumb = getRandomItem(COVER_IMAGES[s]);
                
                courses.push({
                    id: cid, 
                    grade: g.id, 
                    subject: s,
                    title: `[${g.label}] ${SYSTEM_CONFIG.SUBJECTS[s].label}：${topic}`,
                    description: `本課程深入解析${topic}的核心概念，適合${g.label}學生進行課後複習與進階挑戰。`,
                    thumbnail: thumb,
                    units: [
                        {id:`u_${cid}_1`, title:`${topic} - 觀念導讀`}, 
                        {id:`u_${cid}_2`, title:`${topic} - 重點整理`}, 
                        {id:`u_${cid}_3`, title:`${topic} - 精選試題`}
                    ]
                });
                
                // 自動生成 20 題模擬題
                for(let k=0; k<20; k++) {
                    qCount++;
                    questions.push({
                        id: `q_${qCount}`, courseId: cid, type: 'choice',
                        question: `[模擬題] 關於「${topic}」的觀念，下列敘述何者正確？ (第 ${k+1} 題)`,
                        options: ['這是正確的觀念敘述', '這是一個常見的迷思概念', '這是錯誤的選項誘導', '以上皆非'],
                        answer: 0, explanation: `解析：針對${topic}的詳細解說。`
                    });
                }
            });
        });
    });
    return { courses, questions };
}

// ==========================================
// ★ 在這裡貼上你的真實題目 (EXTERNAL_JSON)
// ==========================================
const EXTERNAL_JSON = [
    {
        id: "real_q1",
        courseId: "c_g7_math_0", // 這會對應到「七年級數學」的第一堂課 (整數的運算)
        grade: "g7",
        subject: "math",
        type: "choice",
        question: "計算 (-3) + | -5 | 的值為何？ (真實題目)",
        options: ["2", "-8", "-2", "8"],
        answer: 0,
        explanation: "絕對值 |-5| = 5，所以 (-3) + 5 = 2。"
    },
    {
        id: "real_q2",
        courseId: "c_g8_english_0", // 這會對應到「八年級英文」的第一堂課
        grade: "g8",
        subject: "english",
        type: "choice",
        question: "Please ______ quiet. The baby is sleeping. (真實題目)",
        options: ["is", "be", "are", "am"],
        answer: 1,
        explanation: "祈使句以原形動詞開頭，故選 be。"
    }
    // 你可以繼續往下加 ...
];

// --- 資料合併邏輯 ---
// 1. 先產生大量的課程結構與模擬題目
const generatedData = generateMassiveData();

// 2. 將你的真實題目「合併」進去
// 注意：我們把 EXTERNAL_JSON 放在前面，這樣真實題目會優先顯示
const finalQuestions = EXTERNAL_JSON 
    ? [...EXTERNAL_JSON, ...generatedData.questions] 
    : generatedData.questions;

export const STATIC_DB = {
    courses: generatedData.courses,
    questions: finalQuestions
};