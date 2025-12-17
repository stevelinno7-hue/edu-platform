// assets/js/router.js
import { db } from './storage.js';
import * as Views from './views.js';

class Router {
    constructor() {
        this.app = document.getElementById('app');
        this.currentPage = 'dashboard';
        this.params = {};
        this.filter = { grade: 'all', subject: 'all' };

        this.routes = {
            'home': Views.HomeView,
            'login': { render: Views.AuthView.renderLogin, init: Views.AuthView.initLogin },
            'register': { render: Views.AuthView.renderRegister, init: Views.AuthView.initRegister },
            'dashboard': Views.DashboardView,
            'course': Views.CourseView,
            'unit': Views.UnitView,
            'quiz': Views.QuizView,
            'discussion': Views.DiscussionView,
            'mistakes': Views.MistakeView,
            'game': Views.GameView,
            'teacher': Views.TeacherView,
            'course-edit': Views.EditorView
        };

        this.initTheme();
    }

    initTheme() {
        document.documentElement.setAttribute(
            'data-theme',
            localStorage.getItem('theme') || 'light'
        );
    }

    navigate(page, params = {}) {
        const user = db.getCurrentUser();

        if ((page === 'teacher' || page === 'course-edit') &&
            (!user || user.role !== 'teacher')) {
            alert('權限不足');
            return this.navigate('dashboard');
        }

        if (['dashboard','course','unit','quiz','discussion','game','mistakes','teacher','course-edit']
            .includes(page) && !user) {
            return this.navigate('login');
        }

        this.currentPage = page;
        this.params = params;
        this.render();
        window.scrollTo(0, 0);
    }

    render() {
        const view = this.routes[this.currentPage];
        const props = (this.currentPage === 'dashboard') ? this.filter : this.params;

        const contentHTML = view.render(props);
        this.app.innerHTML =
            Views.Navbar() +
            `<main class="page-content fade-in">${contentHTML}</main>`;

        this.bindGlobalEvents();

        if (view.init) view.init(this);
    }

    bindGlobalEvents() {
        // 主題切換
        const tBtn = document.getElementById('themeBtn');
        if (tBtn) {
            tBtn.onclick = () => {
                const next =
                    document.documentElement.getAttribute('data-theme') === 'dark'
                        ? 'light'
                        : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
                this.render();
            };
        }

        // 登出
        document.querySelectorAll('[data-action="logout"]').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                db.logout();
            };
        });

        // 內部路由
        document.querySelectorAll('[data-link]').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const target = e.target.closest('[data-link]');
                const page = target.dataset.link;

                const params = {};
                if (target.dataset.courseid) params.courseId = target.dataset.courseid;
                if (target.dataset.unitid) params.unitId = target.dataset.unitid;

                this.navigate(page, params);
            };
        });
    }
}

export const router = new Router();
