import { STATIC_DB } from './mockData.js';

const USER_DB_KEY = 'hanny_user_data_v2';

const DEFAULT_USERS = [
  { id: 'u1', username: 'student', password: '123', name: '王小明', role: 'student', score: 5000, avatar: 'https://ui-avatars.com/api/?name=王&background=2563EB&color=fff', badges: [], streak: 5, mistakeBook: [] },
  { id: 't1', username: 'teacher', password: '123', name: '陳老師', role: 'teacher', score: 0, avatar: 'https://ui-avatars.com/api/?name=陳&background=F59E0B&color=fff', badges: [], streak: 0 }
];


export class StorageManager {
  constructor() {
    this.init();
  }

  // 初始化使用者資料庫
  init() {
    if (!localStorage.getItem(USER_DB_KEY)) {
      const initialData = {
        users: DEFAULT_USERS,
        progress: {},
        comments: [],
        customCourses: [],
        pk: {} // PK 模組專用儲存區
      };
      localStorage.setItem(USER_DB_KEY, JSON.stringify(initialData));
    }
  }

  // 讀取使用者資料庫
  getUserDB() {
    return JSON.parse(localStorage.getItem(USER_DB_KEY));
  }

  // 儲存使用者資料庫
  saveUserDB(data) {
    localStorage.setItem(USER_DB_KEY, JSON.stringify(data));
  }

  // 讀取靜態資料庫（課程 + 題庫引擎）
  getStaticDB() {
    return STATIC_DB;
  }

  // localStorage 工具
  _loadLocal(key, fallback = null) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }

  _saveLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // sessionStorage 工具
  _loadSession(key, fallback = null) {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }

  _saveSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  // ============================
  // ✅ User 模組（登入 / 註冊 / 資料更新 / 排行榜）
  // ============================

  // 取得目前登入使用者
  getCurrentUser() {
    return this._loadSession('currentUser', null);
  }

  // 更新使用者資料（通用 patch）
  updateUser(userId, patch) {
    const db = this.getUserDB();
    const idx = db.users.findIndex(u => u.id === userId);
    if (idx === -1) return null;

    db.users[idx] = { ...db.users[idx], ...patch };
    this.saveUserDB(db);

    // 若更新的是目前登入者 → 同步 session
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      this._saveSession('currentUser', db.users[idx]);
    }

    return db.users[idx];
  }

  // 登入
  login(username, password) {
    const db = this.getUserDB();
    const user = db.users.find(u => u.username === username && u.password === password);

    if (!user) {
      return { success: false, message: '帳號或密碼錯誤' };
    }

    this._saveSession('currentUser', user);
    return { success: true, user };
  }

  // 註冊
  register(data) {
    const db = this.getUserDB();

    if (db.users.find(u => u.username === data.username)) {
      return { success: false, message: '帳號已存在' };
    }

    const newUser = {
      id: 'u_' + Date.now(),
      ...data,
      role: 'student',
      score: 0,
      badges: [],
      streak: 1,
      mistakeBook: [],
      avatar: `https://ui-avatars.com/api/?name=${data.name}&background=random&color=fff`
    };

    db.users.push(newUser);
    this.saveUserDB(db);
    this._saveSession('currentUser', newUser);

    return { success: true, user: newUser };
  }

  // 登出
  logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = window.location.pathname;
  }

  // 加分（PK、測驗、任務都可用）
  addScore(userId, points) {
    const db = this.getUserDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) return;

    user.score = (user.score || 0) + points;
    this.saveUserDB(db);

    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      this._saveSession('currentUser', user);
    }
  }

  // 排行榜（前 10 名）
  getLeaderboard() {
    const users = this.getUserDB().users || [];
    return [...users]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 10);
  }  // ============================
  // ✅ Course 模組（課程 CRUD + 靜態課程整合）
  // ============================

  // 取得所有課程（靜態課程 + 老師自建課程）
  getAllCourses() {
    const dbStatic = this.getStaticDB();
    const dbUser = this.getUserDB();
    const custom = dbUser.customCourses || [];
    return [...dbStatic.courses, ...custom];
  }

  // 取得單一課程
  getCourse(courseId) {
    const dbStatic = this.getStaticDB();
    const dbUser = this.getUserDB();

    return (
      dbStatic.courses.find(c => c.id === courseId) ||
      (dbUser.customCourses || []).find(c => c.id === courseId) ||
      null
    );
  }

  // 建立課程（老師用）
  createCourse(courseData, tempUnits = []) {
    const dbUser = this.getUserDB();
    const dbStatic = this.getStaticDB();

    const newCourse = {
      id: this.generateId('c'),
      subject: courseData.subject,
      grade: courseData.grade,
      title: courseData.title || '未命名課程',
      description: courseData.description || '',
      tags: courseData.tags || [],
      competencies: courseData.competencies || [],
      thumbnail:
        courseData.thumbnail ||
        (dbStatic.COVER_IMAGES?.[courseData.subject]?.[0] || ''),
      units: Array.isArray(tempUnits)
        ? tempUnits.map(u => ({
            id: this.generateId('u'),
            title: u.title || '未命名單元',
            topicId: u.topicId || null,
            content: u.content || ''
          }))
        : []
    };

    if (!dbUser.customCourses) dbUser.customCourses = [];
    dbUser.customCourses.push(newCourse);
    this.saveUserDB(dbUser);

    return newCourse;
  }

  // 更新課程
  updateCourse(courseId, updates) {
    const dbUser = this.getUserDB();
    const dbStatic = this.getStaticDB();

    // 更新靜態課程（如果存在）
    const idxStatic = dbStatic.courses.findIndex(c => c.id === courseId);
    if (idxStatic !== -1) {
      dbStatic.courses[idxStatic] = {
        ...dbStatic.courses[idxStatic],
        ...updates
      };
    }

    // 更新自建課程
    const idxUser = (dbUser.customCourses || []).findIndex(
      c => c.id === courseId
    );
    if (idxUser !== -1) {
      dbUser.customCourses[idxUser] = {
        ...dbUser.customCourses[idxUser],
        ...updates
      };
      this.saveUserDB(dbUser);
    }

    return this.getCourse(courseId);
  }

  // 刪除課程
  deleteCourse(courseId) {
    const dbUser = this.getUserDB();
    const dbStatic = this.getStaticDB();

    // 刪除靜態課程（不建議，但保留彈性）
    const idxStatic = dbStatic.courses.findIndex(c => c.id === courseId);
    if (idxStatic !== -1) {
      dbStatic.courses.splice(idxStatic, 1);
    }

    // 刪除自建課程
    const idxUser = (dbUser.customCourses || []).findIndex(
      c => c.id === courseId
    );
    if (idxUser !== -1) {
      dbUser.customCourses.splice(idxUser, 1);
      this.saveUserDB(dbUser);
    }

    // 刪除相關留言
    const userDB = this.getUserDB();
    if (userDB.comments) {
      userDB.comments = userDB.comments.filter(
        cm => cm.courseId !== courseId
      );
      this.saveUserDB(userDB);
    }

    return true;
  }
    // ============================
  // ✅ Unit 模組（單元 CRUD + 靜態課程整合）
  // ============================

  // 取得課程的所有單元
  getCourseUnits(courseId) {
    const course = this.getCourse(courseId);
    return course?.units || [];
  }

  // 取得單一單元
  getUnit(courseId, unitId) {
    const course = this.getCourse(courseId);
    if (!course) return null;
    return (course.units || []).find(u => u.id === unitId) || null;
  }

  // 建立單元
  createUnit(courseId, unitData) {
    const dbStatic = this.getStaticDB();
    const dbUser = this.getUserDB();

    // 先找靜態課程
    let course = dbStatic.courses.find(c => c.id === courseId);

    // 如果不是靜態課程 → 找自建課程
    if (!course) {
      course = (dbUser.customCourses || []).find(c => c.id === courseId);
    }

    if (!course) return null;

    const newUnit = {
      id: this.generateId('u'),
      title: unitData.title || '未命名單元',
      topicId: unitData.topicId || null,
      subject: course.subject,
      grade: course.grade,
      content: unitData.content || ''
    };

    if (!Array.isArray(course.units)) course.units = [];
    course.units.push(newUnit);

    // 若是自建課程 → 寫回 userDB
    const idxUser = (dbUser.customCourses || []).findIndex(c => c.id === courseId);
    if (idxUser !== -1) {
      dbUser.customCourses[idxUser] = course;
      this.saveUserDB(dbUser);
    }

    return newUnit;
  }

  // 更新單元
  updateUnit(courseId, unitId, updates) {
    const dbStatic = this.getStaticDB();
    const dbUser = this.getUserDB();

    // 找靜態課程
    let course = dbStatic.courses.find(c => c.id === courseId);

    // 找自建課程
    let isUserCourse = false;
    if (!course) {
      course = (dbUser.customCourses || []).find(c => c.id === courseId);
      isUserCourse = true;
    }

    if (!course || !Array.isArray(course.units)) return null;

    const idx = course.units.findIndex(u => u.id === unitId);
    if (idx === -1) return null;

    course.units[idx] = { ...course.units[idx], ...updates };

    // 若是自建課程 → 寫回 userDB
    if (isUserCourse) {
      const idxUser = dbUser.customCourses.findIndex(c => c.id === courseId);
      if (idxUser !== -1) {
        dbUser.customCourses[idxUser] = course;
        this.saveUserDB(dbUser);
      }
    }

    return course.units[idx];
  }

  // 刪除單元
  deleteUnit(courseId, unitId) {
    const dbStatic = this.getStaticDB();
    const dbUser = this.getUserDB();

    // 找靜態課程
    let course = dbStatic.courses.find(c => c.id === courseId);

    // 找自建課程
    let isUserCourse = false;
    if (!course) {
      course = (dbUser.customCourses || []).find(c => c.id === courseId);
      isUserCourse = true;
    }

    if (!course || !Array.isArray(course.units)) return false;

    const idx = course.units.findIndex(u => u.id === unitId);
    if (idx === -1) return false;

    course.units.splice(idx, 1);

    // 若是自建課程 → 寫回 userDB
    if (isUserCourse) {
      const idxUser = dbUser.customCourses.findIndex(c => c.id === courseId);
      if (idxUser !== -1) {
        dbUser.customCourses[idxUser] = course;
        this.saveUserDB(dbUser);
      }
    }

    return true;
  }
  // ============================
  // ✅ 題庫模組（動態題庫 + 全域題庫 + PK 依賴核心）
  // ============================

  /**
   * ✅ 取得單元題目（動態產生）
   * - 依課程 + 單元 + 題數
   * - 使用 STATIC_DB.generateQuestionsForCourse
   */
  getUnitQuestions(courseId, unitId, count = 10) {
    const dbStatic = this.getStaticDB();
    const course = this.getCourse(courseId);

    if (!course || typeof dbStatic.generateQuestionsForCourse !== 'function') {
      return [];
    }

    return dbStatic.generateQuestionsForCourse(course, unitId, count);
  }

  /**
   * ✅ 取得全域題庫（PK 模式依賴）
   * - 從所有課程動態抽題
   * - 你可以之後加入快取機制（snapshot）
   */
  getAllQuestions(count = 300) {
    const dbStatic = this.getStaticDB();
    const courses = dbStatic.courses || [];

    const all = [];

    // 從每個課程抽一些題目
    for (const course of courses) {
      const q = dbStatic.generateQuestionsForCourse(course, null, 5);
      all.push(...q);
      if (all.length >= count) break;
    }

    return all.slice(0, count);
  }

  /**
   * ✅ 依難度抽題（PK 模式核心）
   * - level 1~6 → 對應 difficulty 區間
   * - 依照你的動態題庫結構自動抽題
   */
  getRandomQuestionsForPK({ count, level }) {
    const all = this.getAllQuestions(500); // 全域題庫（可調整）

    const filtered = all.filter(q => {
      const d = q.difficulty || 3;
      if (level <= 2) return d <= 2;
      if (level <= 4) return d >= 2 && d <= 4;
      return d >= 3;
    });

    const pool = filtered.length ? filtered : all;
    return pool.sort(() => Math.random() - 0.5).slice(0, count);
  }
  // ============================
  // ✅ Progress 模組（課程進度 / 單元完成狀態）
  // ============================

  /**
   * ✅ 取得使用者在某課程的進度
   * 回傳格式：
   * {
   *   [courseId]: [unitId1, unitId2, ...]
   * }
   */
  getCourseProgress(userId, courseId) {
    const db = this.getUserDB();
    return db.progress?.[userId]?.[courseId] || [];
  }

  /**
   * ✅ 切換單元完成狀態（完成 → 未完成 / 未完成 → 完成）
   * - 用於課程頁、單元頁、學習路徑
   */
  toggleUnitComplete(userId, courseId, unitId) {
    const db = this.getUserDB();

    if (!db.progress) db.progress = {};
    if (!db.progress[userId]) db.progress[userId] = {};
    if (!db.progress[userId][courseId]) db.progress[userId][courseId] = [];

    const list = db.progress[userId][courseId];
    const idx = list.indexOf(unitId);

    if (idx === -1) {
      list.push(unitId); // 標記為完成
    } else {
      list.splice(idx, 1); // 取消完成
    }

    this.saveUserDB(db);
    return idx === -1; // true = 剛完成
  }
  // ============================
  // ✅ MistakeBook 模組（錯題本）
  // ============================

  /**
   * ✅ 記錄題目結果（正確 / 錯誤）
   * - 錯誤 → 加入錯題本
   * - 正確 → 從錯題本移除（如果存在）
   * - 正確時加分（可調整）
   */
  recordQuizResult(userId, questionId, isCorrect) {
    const db = this.getUserDB();
    const idx = db.users.findIndex(u => u.id === userId);
    if (idx === -1) return;

    const user = db.users[idx];
    if (!user.mistakeBook) user.mistakeBook = [];

    if (!isCorrect) {
      // ✅ 錯誤 → 加入錯題本（避免重複）
      if (!user.mistakeBook.includes(questionId)) {
        user.mistakeBook.push(questionId);
      }
    } else {
      // ✅ 正確 → 從錯題本移除
      const mIdx = user.mistakeBook.indexOf(questionId);
      if (mIdx !== -1) user.mistakeBook.splice(mIdx, 1);

      // ✅ 正確 → 加分（可調整）
      user.score = (user.score || 0) + 10;
    }

    db.users[idx] = user;
    this.saveUserDB(db);

    // ✅ 若是目前登入者 → 同步 session
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      this._saveSession('currentUser', user);
    }
  }

  /**
   * ✅ 取得使用者的錯題 ID 清單
   */
  getUserMistakes(userId) {
    const db = this.getUserDB();
    const user = db.users.find(u => u.id === userId);
    if (!user || !user.mistakeBook) return [];
    return user.mistakeBook;
  }

  /**
   * ✅ 取得錯題的完整題目（對接題庫）
   * - 這是專業級平台必備的功能
   * - 你可以在 UI 做「錯題再練」、「錯題 AI 講解」
   */
  getMistakeQuestions(userId) {
    const mistakeIds = this.getUserMistakes(userId);
    if (!mistakeIds.length) return [];

    // ✅ 從全域題庫抽題（你可以改成 snapshot）
    const all = this.getAllQuestions(500);

    return all.filter(q => mistakeIds.includes(q.id));
  }
  // ============================
  // ✅ Comments 模組（單元留言）
  // ============================

  /**
   * ✅ 取得某課程 / 單元的留言
   */
  getComments(courseId, unitId) {
    const db = this.getUserDB();
    return (db.comments || []).filter(
      c => c.courseId === courseId && c.unitId === unitId
    );
  }

  /**
   * ✅ 新增留言
   * - 自動帶入使用者名稱與頭像
   * - 自動加入 timestamp
   */
  addComment(courseId, unitId, userId, text) {
    const db = this.getUserDB();
    const user = db.users.find(u => u.id === userId);

    if (!db.comments) db.comments = [];

    db.comments.push({
      id: 'cm_' + Date.now(),
      courseId,
      unitId,
      userId,
      userName: user?.name || '匿名',
      userAvatar: user?.avatar || '',
      text,
      time: new Date().toLocaleString()
    });

    this.saveUserDB(db);
  }
  // ============================
  // ✅ PK 模組（抽題 / 答題紀錄 / 戰績）
  // ============================

  /**
   * ✅ 抽題（PK 模式）
   * - level 1~6 → 對應 difficulty 區間
   * - 使用全域題庫（動態生成）
   * - 可未來加入 snapshot 快取
   */
  getRandomQuestionsForPK({ count, level }) {
    const all = this.getAllQuestions(500); // 全域題庫（可調整）

    const filtered = all.filter(q => {
      const d = q.difficulty || 3;
      if (level <= 2) return d <= 2;
      if (level <= 4) return d >= 2 && d <= 4;
      return d >= 3;
    });

    const pool = filtered.length ? filtered : all;
    return pool.sort(() => Math.random() - 0.5).slice(0, count);
  }

  /**
   * ✅ 記錄單題結果（PK）
   * payload:
   * {
   *   questionId,
   *   correct,
   *   role: 'player' | 'ai',
   *   difficulty,
   *   timestamp
   * }
   */
  recordPKAnswer(userId, payload) {
    const key = `pk_answers_${userId}`;
    const list = this._loadLocal(key, []);
    list.push({
      ...payload,
      timestamp: payload.timestamp || Date.now()
    });
    this._saveLocal(key, list);
  }

  /**
   * ✅ 記錄整場 PK 結果
   * payload:
   * {
   *   playerScore,
   *   aiScore,
   *   difficulty,
   *   totalQuestions,
   *   correctCount,
   *   aiCorrectCount,
   *   timestamp
   * }
   */
  recordPKMatch(userId, payload) {
    const key = `pk_matches_${userId}`;
    const list = this._loadLocal(key, []);
    list.push({
      ...payload,
      timestamp: payload.timestamp || Date.now()
    });
    this._saveLocal(key, list);
  }

  /**
   * ✅ 取得使用者所有 PK 單題紀錄
   */
  getPKAnswers(userId) {
    return this._loadLocal(`pk_answers_${userId}`, []);
  }

  /**
   * ✅ 取得使用者所有 PK 對戰紀錄
   */
  getPKMatches(userId) {
    return this._loadLocal(`pk_matches_${userId}`, []);
  }
} // ✅ 結束 StorageManager class

// ✅ 建立資料層實例
export const db = new StorageManager();



