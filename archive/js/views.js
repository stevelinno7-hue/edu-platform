import { db } from './storage.js';
import { SYSTEM_CONFIG } from './mockData.js';
// =========================
// Navbar
// =========================
export function Navbar() {
  const user = db.getCurrentUser();

  return `
    <header class="navbar">
      <div class="navbar-left">
        <a data-link="dashboard" class="logo">漢尼雲端</a>
      </div>

      <div class="navbar-center">
        ${user ? `
          <button data-link="dashboard" class="nav-btn">課程總覽</button>
          <button data-link="mistakes" class="nav-btn">錯題本</button>
          <button data-link="game" class="nav-btn">競技場</button>
          ${user.role === 'teacher' ? `<button data-link="teacher" class="nav-btn">教師後台</button>` : ''}
        ` : ''}
      </div>

      <div class="navbar-right">
        <button id="themeBtn" class="icon-btn">🌓</button>

        ${user ? `
          <div class="user-info">
            <img src="${user.avatar}" class="avatar-sm" />
            <span>${user.name}</span>
            <button data-action="logout" class="nav-btn">登出</button>
          </div>
        ` : `
          <button data-link="login" class="nav-btn">登入</button>
          <button data-link="register" class="nav-btn btn-primary">註冊</button>
        `}
      </div>
    </header>
  `;
}
// =========================
// HomeView
// =========================
export const HomeView = {
  render() {
    return `
      <div class="container hero">
        <h1>漢尼雲端學院</h1>
        <p class="hero-sub">
          對齊 108 課綱、課綱主題驅動的現代化課程與題庫平台。
        </p>

        <div class="hero-actions">
          <button data-link="dashboard" class="btn btn-primary">
            開始學習
          </button>
          <button data-link="register" class="btn btn-outline">
            加入學院
          </button>
        </div>
      </div>
    `;
  },

  init() {}
};
// =========================
// AuthView (Login / Register)
// =========================
export const AuthView = {
  // ---------- Login ----------
  renderLogin() {
    return `
      <div class="container auth">
        <h1>登入</h1>

        <form id="loginForm" class="form">
          <label>帳號</label>
          <input id="loginUsername" class="form-input" />

          <label>密碼</label>
          <input id="loginPassword" type="password" class="form-input" />

          <button type="submit" class="btn btn-primary" style="margin-top:1rem">
            登入
          </button>
        </form>
      </div>
    `;
  },

  initLogin(router) {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();

      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      const res = db.login(username, password);
      if (!res.success) {
        alert(res.message);
        return;
      }

      router.navigate('dashboard');
    };
  },

  // ---------- Register ----------
  renderRegister() {
    return `
      <div class="container auth">
        <h1>註冊</h1>

        <form id="regForm" class="form">
          <label>姓名</label>
          <input id="regName" class="form-input" />

          <label>帳號</label>
          <input id="regUsername" class="form-input" />

          <label>密碼</label>
          <input id="regPassword" type="password" class="form-input" />

          <button type="submit" class="btn btn-primary" style="margin-top:1rem">
            註冊
          </button>
        </form>
      </div>
    `;
  },

  initRegister(router) {
    const form = document.getElementById('regForm');
    if (!form) return;

    form.onsubmit = (e) => {
      e.preventDefault();

      const name = document.getElementById('regName').value.trim();
      const username = document.getElementById('regUsername').value.trim();
      const password = document.getElementById('regPassword').value.trim();

      const res = db.register({ name, username, password });
      if (!res.success) {
        alert(res.message);
        return;
      }

      router.navigate('dashboard');
    };
  }
};
// =========================
// DashboardView
// =========================
export const DashboardView = {
  render(filter) {
    const allCourses = db.getAllCourses();
    const grades = SYSTEM_CONFIG.GRADES;
    const subjects = Object.values(SYSTEM_CONFIG.SUBJECTS);

    const filtered = allCourses.filter(c => {
      if (filter?.grade && filter.grade !== 'all' && c.grade !== filter.grade) return false;
      if (filter?.subject && filter.subject !== 'all' && c.subject !== filter.subject) return false;
      return true;
    });

    const user = db.getCurrentUser() || { id: null };

    const sections = subjects.map(subj => {
      const list = filtered.filter(c => c.subject === subj.id);
      if (!list.length) return '';

      return `
        <section class="course-section">
          <h2>${subj.label} 精選</h2>

          <div class="course-grid">
            ${list.map(course => {
              const units = course.units || [];
              const progressUnits = db.getCourseProgress(user.id, course.id) || [];
              const totalUnits = units.length || 1;
              const pct = Math.round((progressUnits.length / totalUnits) * 100);

              return `
                <article class="course-card">
                  <div class="thumb" style="background-image:url('${course.thumbnail}')"></div>

                  <div class="course-body">
                    <div class="course-tags">
                      <span class="tag-subject tag-${course.subject}">
                        ${SYSTEM_CONFIG.SUBJECTS[course.subject]?.label || ''}
                      </span>
                      <span class="tag-grade">
                        ${SYSTEM_CONFIG.GRADES.find(g => g.id === course.grade)?.label || ''}
                      </span>
                    </div>

                    <h3>${course.title}</h3>
                    <p class="desc">${course.description}</p>

                    <div class="meta">
                      <span>${totalUnits} 單元</span>
                      <span>${pct}% 完成</span>
                    </div>

                    <button data-link="course" data-courseid="${course.id}" class="btn btn-primary btn-sm">
                      進入課程
                    </button>
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </section>
      `;
    }).join('');

    return `
      <div class="container">
        <h1>課程總覽</h1>

        <div class="filters">
          <div>
            <label>年級</label>
            <select id="filterGrade" class="form-input">
              <option value="all">全部</option>
              ${grades.map(g => `
                <option value="${g.id}" ${filter?.grade === g.id ? 'selected' : ''}>
                  ${g.label}
                </option>
              `).join('')}
            </select>
          </div>

          <div>
            <label>科目</label>
            <select id="filterSubject" class="form-input">
              <option value="all">全部</option>
              ${subjects.map(s => `
                <option value="${s.id}" ${filter?.subject === s.id ? 'selected' : ''}>
                  ${s.label}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        ${sections || '<p class="text-sub">目前沒有符合條件的課程。</p>'}
      </div>
    `;
  },

  init(router) {
    const gradeSel = document.getElementById('filterGrade');
    const subjSel = document.getElementById('filterSubject');

    if (gradeSel) {
      gradeSel.onchange = () => {
        router.filter.grade = gradeSel.value;
        router.render();
      };
    }

    if (subjSel) {
      subjSel.onchange = () => {
        router.filter.subject = subjSel.value;
        router.render();
      };
    }
  }
};
// =========================
// CourseView
// =========================
export const CourseView = {
  render(params) {
    const courseId = params.courseId || params.id;
    const course = db.getCourse(courseId);
    if (!course) return `<div class="container">找不到課程</div>`;

    const units = course.units || [];
    const subject = SYSTEM_CONFIG.SUBJECTS[course.subject];

    return `
      <div class="container">
        <a data-link="dashboard" class="btn btn-outline" style="margin-bottom:1rem">
          ← 返回課程總覽
        </a>

        <section class="course-header">
          <div class="course-header-main">
            <h1>${course.title}</h1>

            <div class="course-header-tags">
              <span class="tag-subject tag-${course.subject}">
                ${subject?.label || ''}
              </span>
              <span class="tag-grade">
                ${SYSTEM_CONFIG.GRADES.find(g => g.id === course.grade)?.label || ''}
              </span>
            </div>

            <p class="course-header-desc">${course.description}</p>
          </div>

          <div class="course-header-meta">
            <p><strong>${units.length}</strong> 個單元</p>
            <p class="text-sub">對齊 108 課綱能力指標</p>
          </div>
        </section>

        <hr class="divider" />

        <section class="course-units">
          <h2>課程目錄</h2>

          <div class="unit-list">
            ${units.map(u => `
              <div class="unit-card">
                <div class="unit-main">
                  <h3>${u.title}</h3>
                  <p class="text-sub">主題：${u.topicId}</p>
                </div>

                <div class="unit-actions">
                  <button data-link="unit" data-courseid="${course.id}" data-unitid="${u.id}"
                          class="btn btn-outline btn-sm">
                    單元內容
                  </button>

                  <button data-link="quiz" data-courseid="${course.id}" data-unitid="${u.id}"
                          class="btn btn-primary btn-sm">
                    隨堂測驗
                  </button>

                  <button data-link="discussion" data-courseid="${course.id}" data-unitid="${u.id}"
                          class="btn btn-ghost btn-sm">
                    討論區
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
  },

  init() {}
};
// =========================
// UnitView
// =========================
export const UnitView = {
  render(params) {
    const courseId = params.courseId;
    const unitId = params.unitId;

    const course = db.getCourse(courseId);
    if (!course) return `<div class="container">找不到課程</div>`;

    const unit = db.getUnit(courseId, unitId);
    if (!unit) return `<div class="container">找不到單元</div>`;

    const topicList = TOPICS[course.subject] || [];
    const topic = topicList.find(t => t.id === unit.topicId) || null;

    const compList = SYSTEM_CONFIG.COMPETENCIES[course.subject] || [];
    const comp = topic?.competency
      ? compList.find(c => c.id === topic.competency)
      : null;

    return `
      <div class="container">
        <a data-link="course" data-courseid="${course.id}"
           class="btn btn-outline" style="margin-bottom:1rem">
          ← 返回課程
        </a>

        <div class="unit-layout">
          <!-- 左側主內容 -->
          <div class="unit-main-col">
            <h1>${unit.title}</h1>
            <p class="text-sub" style="margin-bottom:1rem">${course.title}</p>

            <section class="unit-section">
              <h2>💡 學習重點</h2>
              <ul>
                <li>主題：${topic?.label || unit.topicId}</li>
                <li>能力指標：${comp?.name || '—'}</li>
                <li>涵蓋概念：${(topic?.concepts || []).join(', ') || '—'}</li>
              </ul>
            </section>

            <section class="unit-section">
              <h2>📚 單元內容</h2>
              <p>
                這裡放單元重點、範例與補充說明。  
                （未來可改為 Markdown 編輯器內容）
              </p>
            </section>
          </div>

          <!-- 右側資訊欄 -->
          <aside class="unit-side-col">
            <div class="unit-info-card">
              <h3>本單元資訊</h3>

              <p class="text-sub">主題代碼：${unit.topicId}</p>
              <p class="text-sub">能力指標：${comp?.name || '—'}</p>

              <div style="margin-top:0.75rem">
                <button data-link="quiz"
                        data-courseid="${course.id}"
                        data-unitid="${unit.id}"
                        class="btn btn-primary btn-sm"
                        style="width:100%;margin-bottom:0.5rem">
                  前往隨堂測驗
                </button>

                <button data-link="discussion"
                        data-courseid="${course.id}"
                        data-unitid="${unit.id}"
                        class="btn btn-outline btn-sm"
                        style="width:100%">
                  前往討論區
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    `;
  },

  init() {}
};
// =========================
// QuizView
// =========================
export const QuizView = {
  render(params) {
    const courseId = params.courseId;
    const unitId = params.unitId;

    const course = db.getCourse(courseId);
    if (!course) return `<div class="container">找不到課程</div>`;

    const unit = db.getUnit(courseId, unitId);
    if (!unit) return `<div class="container">找不到單元</div>`;

    const questions = db.getUnitQuestions(course.id, unit.id, 10);
    const total = questions.length;

    const progressBar = `
      <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
        <div style="flex:1;background:#e6eefc;border-radius:999px;height:10px;overflow:hidden">
          <div id="quizProgressBar"
               style="width:0%;height:100%;background:#2563eb;border-radius:999px"></div>
        </div>
        <div class="text-sub" id="quizProgressText">0 / ${total}</div>
      </div>
    `;

    return `
      <div class="container">
        <a data-link="unit"
           data-courseid="${course.id}"
           data-unitid="${unit.id}"
           class="btn btn-outline"
           style="margin-bottom:1rem">
          ← 返回單元內容
        </a>

        <h1>隨堂測驗 · ${unit.title}</h1>
        <p class="text-sub" style="margin-bottom:1rem">${course.title}</p>

        ${progressBar}

        <div class="quiz-list">
          ${questions.map((q, i) => `
            <div class="quiz-item" data-qindex="${i}" data-qid="${q.id}">
              <h3>Q${i + 1}. ${q.stem || '（題目載入錯誤）'}</h3>

              <div class="options">
                ${q.options.map((opt, idx) => `
                  <button class="option-btn"
                          data-qid="${q.id}"
                          data-ans="${idx}"
                          data-correct="${q.answer}">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  init() {
    const user = db.getCurrentUser();
    if (!user) return;

    const total = document.querySelectorAll('.quiz-item').length;
    let answered = 0;

    function updateProgress() {
      const pct = total ? Math.round((answered / total) * 100) : 0;
      const bar = document.getElementById('quizProgressBar');
      const txt = document.getElementById('quizProgressText');

      if (bar) bar.style.width = `${pct}%`;
      if (txt) txt.textContent = `${answered} / ${total}`;
    }

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.onclick = () => {
        const container = btn.closest('.quiz-item');
        if (!container || container.dataset.answered === '1') return;

        const correct = Number(btn.dataset.correct);
        const ans = Number(btn.dataset.ans);
        const qid = btn.dataset.qid;

        const isCorrect = ans === correct;
        db.recordQuizResult(user.id, qid, isCorrect);

        container.dataset.answered = '1';
        answered += 1;
        updateProgress();

        btn.classList.add(isCorrect ? 'correct' : 'wrong');

        const opts = container.querySelectorAll('.option-btn');
        opts.forEach(o => {
          if (Number(o.dataset.ans) === correct) {
            o.classList.add('correct');
          }
        });
      };
    });

    updateProgress();
  }
};
// =========================
// DiscussionView
// =========================
export const DiscussionView = {
  render(params) {
    const courseId = params.courseId;
    const unitId = params.unitId;

    const course = db.getCourse(courseId);
    if (!course) return `<div class="container">找不到課程</div>`;

    const unit = db.getUnit(courseId, unitId);
    if (!unit) return `<div class="container">找不到單元</div>`;

    const comments = db.getComments(course.id, unit.id) || [];

    return `
      <div class="container">
        <a data-link="unit"
           data-courseid="${course.id}"
           data-unitid="${unit.id}"
           class="btn btn-outline"
           style="margin-bottom:1rem">
          ← 返回單元內容
        </a>

        <h1>討論區 · ${unit.title}</h1>
        <p class="text-sub" style="margin-bottom:1rem">${course.title}</p>

        <div class="comment-box">
          <textarea id="commentText"
                    class="form-input"
                    placeholder="留下你的想法、問題或解題心得..."></textarea>

          <button id="sendComment"
                  class="btn btn-primary"
                  data-courseid="${course.id}"
                  data-unitid="${unit.id}"
                  style="margin-top:0.5rem">
            送出
          </button>
        </div>

        <div class="comment-list">
          ${comments.length === 0
            ? `<p class="text-sub">目前還沒有留言，成為第一個發問的人吧！</p>`
            : comments.map(c => `
              <div class="comment-item">
                <img src="${c.userAvatar}" class="avatar" />
                <div>
                  <strong>${c.userName}</strong>
                  <p>${c.text}</p>
                  <span class="time">${c.time}</span>
                </div>
              </div>
            `).join('')
          }
        </div>
      </div>
    `;
  },

  init(router) {
    const btn = document.getElementById('sendComment');
    if (!btn) return;

    btn.onclick = () => {
      const textArea = document.getElementById('commentText');
      const text = textArea.value.trim();
      if (!text) return alert('請輸入內容');

      const courseId = btn.dataset.courseid;
      const unitId = btn.dataset.unitid;
      const user = db.getCurrentUser();

      db.addComment(courseId, unitId, user.id, text);
      router.render();
    };
  }
};
// =========================
// GameView - PK 模式（玩家 vs AI）
// =========================
export const GameView = {
  render() {
    // 難度等級設定（對應你給的速度/邏輯）
    const difficulties = [
      { id: 'easy',    label: '入門', speed: 40, level: 1 },
      { id: 'normal',  label: '普通', speed: 30, level: 2 },
      { id: 'advanced',label: '進階', speed: 25, level: 3 },
      { id: 'pro',     label: '高手', speed: 20, level: 4 },
      { id: 'master',  label: '大師', speed: 12, level: 5 },
      { id: 'hell',    label: '地獄', speed: 10, level: 6 }
    ];

    // 可選題數
    const questionCounts = [5, 10, 15, 20, 30, 40, 50, 60];

    return `
      <div class="container">
        <h1>競技場 · PK 模式</h1>
        <p class="text-sub" style="margin-bottom:1rem">
          選擇難度與題目數，與 AI 進行答題對戰。AI 會依難度調整作答速度與題目難度。
        </p>

        <!-- 設定區 -->
        <section class="pk-setup-card">
          <div class="pk-setup-row">
            <div>
              <label class="pk-label">選擇難度</label>
              <select id="pkDifficulty" class="form-input">
                ${difficulties.map(d => `
                  <option value="${d.id}">
                    ${d.label}（約 ${d.speed} 秒/題）
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="pk-label">題目數</label>
              <select id="pkQuestionCount" class="form-input">
                ${questionCounts.map(n => `
                  <option value="${n}">${n} 題</option>
                `).join('')}
              </select>
            </div>

            <div class="pk-setup-start">
              <button id="pkStartBtn" class="btn btn-primary">
                開始 PK 對戰
              </button>
            </div>
          </div>
        </section>

        <!-- 對戰區 -->
        <section id="pkBattleSection" class="pk-battle hidden">
          <!-- 上方：玩家 vs AI 面板 -->
          <div class="pk-header">
            <div class="pk-player-card">
              <div class="pk-avatar player-avatar">你</div>
              <div class="pk-info">
                <div class="pk-name">玩家</div>
                <div class="pk-score">
                  分數：<span id="pkPlayerScore">0</span>
                </div>
                <div class="pk-progress-bar">
                  <div id="pkPlayerProgress" class="pk-progress-fill"></div>
                </div>
                <div class="pk-progress-text">
                  題目進度：<span id="pkPlayerAnswered">0</span> /
                  <span id="pkTotalQuestions">0</span>
                </div>
              </div>
            </div>

            <div class="pk-vs-badge">PK</div>

            <div class="pk-player-card ai">
              <div class="pk-avatar ai-avatar">AI</div>
              <div class="pk-info">
                <div class="pk-name">AI 挑戰者</div>
                <div class="pk-score">
                  分數：<span id="pkAIScore">0</span>
                </div>
                <div class="pk-progress-bar">
                  <div id="pkAIProgress" class="pk-progress-fill ai"></div>
                </div>
                <div class="pk-progress-text">
                  題目進度：<span id="pkAAnswered">0</span> /
                  <span id="pkTotalQuestions2">0</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 中間：題目區 -->
          <div class="pk-question-card">
            <div class="pk-question-header">
              <span id="pkQIndex">第 1 題</span>
              <span id="pkDifficultyLabel" class="pk-diff-tag">入門</span>
            </div>
            <h2 id="pkQuestionStem">題目載入中...</h2>

            <div id="pkOptionsContainer" class="pk-options">
              <!-- 動態塞選項 -->
            </div>
          </div>

          <!-- 下方：系統訊息 -->
          <div id="pkStatus" class="pk-status text-sub">
            請作答。
          </div>
        </section>

        <!-- 結果區 -->
        <section id="pkResultSection" class="pk-result hidden">
          <h2>對戰結果</h2>
          <p id="pkResultSummary" class="pk-result-summary"></p>

          <div class="pk-result-stats">
            <div>
              <h3>玩家</h3>
              <p>分數：<span id="pkResultPlayerScore">0</span></p>
            </div>
            <div>
              <h3>AI</h3>
              <p>分數：<span id="pkResultAIScore">0</span></p>
            </div>
          </div>

          <button id="pkRestartBtn" class="btn btn-outline" style="margin-top:1rem">
            再戰一場
          </button>
        </section>
      </div>
    `;
  },

  init() {
    const user = db.getCurrentUser();
    if (!user) return;

    const difficultySelect = document.getElementById('pkDifficulty');
    const questionCountSelect = document.getElementById('pkQuestionCount');
    const startBtn = document.getElementById('pkStartBtn');

    const battleSection = document.getElementById('pkBattleSection');
    const resultSection = document.getElementById('pkResultSection');

    const playerScoreEl = document.getElementById('pkPlayerScore');
    const aiScoreEl = document.getElementById('pkAIScore');
    const playerProgress = document.getElementById('pkPlayerProgress');
    const aiProgress = document.getElementById('pkAIProgress');
    const playerAnsweredEl = document.getElementById('pkPlayerAnswered');
    const aiAnsweredEl = document.getElementById('pkAAnswered');
    const totalQEl = document.getElementById('pkTotalQuestions');
    const totalQEl2 = document.getElementById('pkTotalQuestions2');

    const qIndexEl = document.getElementById('pkQIndex');
    const qStemEl = document.getElementById('pkQuestionStem');
    const qOptionsEl = document.getElementById('pkOptionsContainer');
    const diffLabelEl = document.getElementById('pkDifficultyLabel');
    const statusEl = document.getElementById('pkStatus');

    const resultSummaryEl = document.getElementById('pkResultSummary');
    const resultPlayerScoreEl = document.getElementById('pkResultPlayerScore');
    const resultAIScoreEl = document.getElementById('pkResultAIScore');
    const restartBtn = document.getElementById('pkRestartBtn');

    if (!startBtn) return;

    // 對應 render 裡的難度設定
    const difficultyConfig = {
      easy:     { label: '入門',   speed: 40, level: 1 },
      normal:   { label: '普通',   speed: 30, level: 2 },
      advanced: { label: '進階',   speed: 25, level: 3 },
      pro:      { label: '高手',   speed: 20, level: 4 },
      master:   { label: '大師',   speed: 12, level: 5 },
      hell:     { label: '地獄',   speed: 10, level: 6 }
    };

    let state = {
      questions: [],
      total: 0,
      currentIndex: 0,
      playerScore: 0,
      aiScore: 0,
      playerAnswered: 0,
      aiAnswered: 0,
      aiTimer: null,
      aiCorrectRate: 0.7,  // 固定 70%
      difficultyId: 'easy',
      difficultyLabel: '入門',
      aiSpeed: 30
    };

    function resetState() {
      state.questions = [];
      state.total = 0;
      state.currentIndex = 0;
      state.playerScore = 0;
      state.aiScore = 0;
      state.playerAnswered = 0;
      state.aiAnswered = 0;
      state.aiTimer = null;
    }

    function applyDifficulty(id) {
      const cfg = difficultyConfig[id] || difficultyConfig.easy;
      state.difficultyId = id;
      state.difficultyLabel = cfg.label;
      state.aiSpeed = cfg.speed;
      // 題目難度來源混合策略：
      // level 越高 → 越偏向困難題（由 storage.js 內的 getRandomQuestionsForPK 去決定）
      state.level = cfg.level;
    }

    // 更新進度條 & 顯示
    function updateProgress() {
      if (!state.total) return;
      const pPct = Math.round((state.playerAnswered / state.total) * 100);
      const aPct = Math.round((state.aiAnswered / state.total) * 100);

      if (playerProgress) playerProgress.style.width = `${pPct}%`;
      if (aiProgress) aiProgress.style.width = `${aPct}%`;

      if (playerAnsweredEl) playerAnsweredEl.textContent = state.playerAnswered;
      if (aiAnsweredEl) aiAnsweredEl.textContent = state.aiAnswered;
      if (totalQEl) totalQEl.textContent = state.total;
      if (totalQEl2) totalQEl2.textContent = state.total;
    }

    function showQuestion() {
      const q = state.questions[state.currentIndex];
      if (!q) {
        endBattle();
        return;
      }

      if (qIndexEl) qIndexEl.textContent = `第 ${state.currentIndex + 1} 題`;
      if (diffLabelEl) diffLabelEl.textContent = state.difficultyLabel;

      if (qStemEl) qStemEl.textContent = q.stem || '（題目載入錯誤）';

      if (qOptionsEl) {
        qOptionsEl.innerHTML = '';
        q.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.className = 'pk-option-btn';
          btn.textContent = opt;
          btn.dataset.ans = idx;
          btn.dataset.correct = q.answer;
          btn.onclick = () => handlePlayerAnswer(btn, q);
          qOptionsEl.appendChild(btn);
        });
      }

      if (statusEl) {
        statusEl.textContent = '請作答，你與 AI 正在同時作答中。';
      }
    }

    function lockOptions() {
      const buttons = qOptionsEl?.querySelectorAll('.pk-option-btn') || [];
      buttons.forEach(btn => {
        btn.disabled = true;
      });
    }

    function handlePlayerAnswer(btn, q) {
      const ans = Number(btn.dataset.ans);
      const correct = Number(btn.dataset.correct);
      const isCorrect = ans === correct;

      lockOptions();

      if (isCorrect) {
        state.playerScore += 10;
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
        // 標註正確答案
        const buttons = qOptionsEl?.querySelectorAll('.pk-option-btn') || [];
        buttons.forEach(b => {
          if (Number(b.dataset.ans) === correct) {
            b.classList.add('correct');
          }
        });
      }

      state.playerAnswered += 1;
      updateProgress();

      // 紀錄玩家答題結果（你可以在 storage.js 中實作）
      if (db.recordPKAnswer) {
        db.recordPKAnswer(user.id, {
          questionId: q.id,
          correct: isCorrect,
          role: 'player',
          difficulty: state.difficultyId
        });
      }

      // 若雙方都答完這題，換下一題
      if (state.playerAnswered === state.currentIndex + 1 &&
          state.aiAnswered === state.currentIndex + 1) {
        nextQuestion();
      }
    }

    function scheduleAINextQuestion(q) {
      // 在每題開始時，排程 AI 在 aiSpeed 之後作答
      if (state.aiTimer) clearTimeout(state.aiTimer);

      state.aiTimer = setTimeout(() => {
        // AI 作答
        const rand = Math.random();
        const willCorrect = rand < state.aiCorrectRate;
        let aiIsCorrect = false;

        if (willCorrect) {
          aiIsCorrect = true;
          state.aiScore += 10;
        }

        state.aiAnswered += 1;
        updateProgress();

        // 紀錄 AI 答題結果
        if (db.recordPKAnswer) {
          db.recordPKAnswer(user.id, {
            questionId: q.id,
            correct: aiIsCorrect,
            role: 'ai',
            difficulty: state.difficultyId
          });
        }

        // 若雙方都答完這題，換下一題
        if (state.playerAnswered === state.currentIndex + 1 &&
            state.aiAnswered === state.currentIndex + 1) {
          nextQuestion();
        }
      }, state.aiSpeed * 1000);
    }

    function nextQuestion() {
      state.currentIndex += 1;

      if (state.currentIndex >= state.total) {
        endBattle();
        return;
      }

      showQuestion();
      scheduleAINextQuestion(state.questions[state.currentIndex]);
    }

    function endBattle() {
      if (state.aiTimer) {
        clearTimeout(state.aiTimer);
        state.aiTimer = null;
      }

      if (battleSection) battleSection.classList.add('hidden');
      if (resultSection) resultSection.classList.remove('hidden');

      if (playerScoreEl) resultPlayerScoreEl.textContent = state.playerScore;
      if (aiScoreEl) resultAIScoreEl.textContent = state.aiScore;

      let summary = '';
      if (state.playerScore > state.aiScore) {
        summary = `你贏了！🎉 以 ${state.playerScore} 比 ${state.aiScore} 擊敗 AI。`;
      } else if (state.playerScore < state.aiScore) {
        summary = `AI 勝出！你以 ${state.playerScore} 比 ${state.aiScore} 落敗，下次再挑戰！`;
      } else {
        summary = `平手！你與 AI 都拿到 ${state.playerScore} 分。`;
      }
      if (resultSummaryEl) resultSummaryEl.textContent = summary;

      // 儲存一筆 PK 戰績（你可以在 storage.js 中實作 db.recordPKMatch）
      if (db.recordPKMatch) {
        db.recordPKMatch(user.id, {
          playerScore: state.playerScore,
          aiScore: state.aiScore,
          difficulty: state.difficultyId,
          totalQuestions: state.total,
          timestamp: Date.now()
        });
      }
    }

    function startBattle() {
      resetState();

      const diffId = difficultySelect.value;
      const numQuestions = Number(questionCountSelect.value) || 10;

      applyDifficulty(diffId);

      // 透過 storage / db 拿題目
      // 你需要在 storage.js 實作 db.getRandomQuestionsForPK({ count, level })
      // level 代表難度等級（1~6），你可以在那邊依 difficulty、ID、分類來控制題目難度
      let questions = [];
      if (db.getRandomQuestionsForPK) {
        questions = db.getRandomQuestionsForPK({
          count: numQuestions,
          level: state.level
        });
      } else if (db.getAllQuestions) {
        // fallback：如果你還沒實作專用 API，就隨機抽題
        const all = db.getAllQuestions();
        questions = all.sort(() => Math.random() - 0.5).slice(0, numQuestions);
      } else {
        questions = [];
      }

      if (!questions || !questions.length) {
        alert('題庫不足，無法開始 PK 對戰。');
        return;
      }

      state.questions = questions;
      state.total = questions.length;
      state.currentIndex = 0;
      state.playerScore = 0;
      state.aiScore = 0;
      state.playerAnswered = 0;
      state.aiAnswered = 0;

      // 初始化 UI
      if (battleSection) battleSection.classList.remove('hidden');
      if (resultSection) resultSection.classList.add('hidden');

      if (playerScoreEl) playerScoreEl.textContent = '0';
      if (aiScoreEl) aiScoreEl.textContent = '0';

      updateProgress();

      if (diffLabelEl) diffLabelEl.textContent = state.difficultyLabel;

      showQuestion();
      scheduleAINextQuestion(state.questions[0]);
    }

    startBtn.onclick = () => {
      startBattle();
    };

    if (restartBtn) {
      restartBtn.onclick = () => {
        if (resultSection) resultSection.classList.add('hidden');
        if (battleSection) battleSection.classList.add('hidden');
        // 回到設定區，由使用者再按一次開始
      };
    }
  }
};
