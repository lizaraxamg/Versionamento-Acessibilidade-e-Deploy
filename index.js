/**
 * script.js
 * Funcionalidade de Alternar Tema (Modo Escuro / Claro)
 * * Objetivo de Acessibilidade: Permitir que o usuário escolha o tema
 * manualmente, ignorando a preferência do sistema (prefers-color-scheme).
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-theme');
    
    // 1. CHAVE DE ARMAZENAMENTO LOCAL
    const themeKey = 'data-theme';

    /**
     * Define o tema na tag <body> e no localStorage.
     * @param {string} theme - 'light' ou 'dark'
     */
    function applyTheme(theme) {
        document.body.setAttribute(themeKey, theme);
        localStorage.setItem(themeKey, theme);
        
        // Atualiza o ARIA-Label para leitores de tela
        toggleButton.setAttribute('aria-label', 
            theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro');
    }

    /**
     * Inicializa o tema ao carregar a página.
     */
    function initializeTheme() {
        const storedTheme = localStorage.getItem(themeKey);

        if (storedTheme) {
            // Se houver tema salvo, usa-o
            applyTheme(storedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Se não houver tema salvo, usa a preferência do sistema como tema inicial
            applyTheme('dark');
        } else {
            // Padrão é claro
            applyTheme('light');
        }
    }

    /**
     * Alterna o tema de forma manual.
     */
    function toggleTheme() {
        const currentTheme = document.body.getAttribute(themeKey);
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }

    // EVENT LISTENER
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    // INICIALIZAÇÃO
    initializeTheme();
});