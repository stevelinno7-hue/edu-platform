import { db } from './storage.js';
import { router } from './router.js';

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 系統啟動中...');
    
    // 初始化資料庫
    db.init();

    // 檢查是否有登入資訊，決定第一頁去哪 (目前先強制去 home 測試)
    router.render();
    
    console.log('✅ 畫面渲染完成');
});