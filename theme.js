const THEME_KEY = 'ctcTheme';

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    const toggleButton = document.getElementById('themeToggle');
    if (toggleButton) {
        toggleButton.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
}

function toggleTheme() {
    const isDark = !document.body.classList.contains('dark-theme');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
}

window.addEventListener('DOMContentLoaded', loadTheme);
