// Modern Browser Startpage
// Main script: renders UI, manages settings, and persists data to localStorage.

// Browser detection / feature flags

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Default data: categories, links, and colors used when no user data exists

const defaultCategories = [
    { id: 'Essentials', name: 'Essentials', icon: 'fa-solid fa-star' },
    { id: 'Online Tools', name: 'Online Tools', icon: 'fa-solid fa-tools' },
    { id: 'Miscellaneous', name: 'Miscellaneous', icon: 'fa-solid fa-question-circle' },
    { id: 'AI Tools', name: 'AI Tools', icon: 'fa-solid fa-robot' }
];

const defaultLinks = {
    'Essentials': [
        { name: 'Whatsapp', url: 'https://web.whatsapp.com/', icon: 'fa-brands fa-whatsapp' },
        { name: 'Youtube', url: 'https://www.youtube.com/', icon: 'fa-brands fa-youtube' },
        { name: 'Telegram', url: 'https://web.telegram.org/z/', icon: 'fa-brands fa-telegram' },
        { name: 'Gmail', url: 'https://mail.google.com/mail/u/1/#inbox', icon: 'fa-regular fa-envelope' },
        { name: 'Google Drive', url: 'https://drive.google.com/drive/u/0/my-drive', icon: 'fa-brands fa-google-drive' },
        { name: 'Google Sheets', url: 'https://docs.google.com/spreadsheets/u/1/', icon: 'fa-solid fa-table' },
        { name: 'Appstorrent', url: 'https://appstorrent.ru/', icon: 'fa-brands fa-apple' },
        { name: 'Google Keep', url: 'https://keep.google.com/u/0/#home', icon: 'fa-regular fa-note-sticky' },
        { name: 'Monochrome', url: 'https://monochrome.tf/', icon: 'fa-solid fa-link' }
    ],
    'Online Tools': [
        { name: 'Github', url: 'https://github.com/motionkartik', icon: 'fa-brands fa-github' },
        { name: 'Reddit', url: 'https://www.reddit.com/', icon: 'fa-brands fa-reddit-alien' },
        { name: 'Raindrop', url: 'https://app.raindrop.io/my/0', icon: 'fa-solid fa-cloud' },
        { name: 'N3rdMade', url: 'https://tbcpl.lol/', icon: 'fa-solid fa-couch' },
        { name: 'Temp-Mail', url: 'https://temp-mail.org/en/', icon: 'fa-solid fa-envelope-circle-check' },
        { name: 'Virus Total', url: 'https://www.virustotal.com/gui/home/upload', icon: 'fa-solid fa-flag' },
        { name: 'Twitter', url: 'https://twitter.com/', icon: 'fa-solid fa-link' },
        { name: 'Linkedin', url: 'https://www.linkedin.com/in/motionkartik/', icon: 'fa-solid fa-link' },
        { name: 'Huggingface Spaces', url: 'https://huggingface.co/spaces', icon: 'fa-solid fa-link' },
        { name: 'Reddit Piracy', url: 'https://www.reddit.com/r/Piracy/wiki/megathread/', icon: 'fa-solid fa-link' }
    ],
    'Miscellaneous': [
        { name: 'ChatGPT', url: 'https://chatgpt.com/', icon: 'fa-solid fa-bars' },
        { name: 'Nano Banana', url: 'https://aistudio.google.com/prompts/new_chat?model=gemini-2.5-flash-image', icon: 'fa-solid fa-bars' },
        { name: 'Perplexity', url: 'https://www.perplexity.ai/', icon: 'fa-solid fa-bars' },
        { name: 'Grok', url: 'https://grok.com', icon: 'fa-solid fa-bars' },
        { name: 'Qwen', url: 'https://chat.qwen.ai/', icon: 'fa-solid fa-bars' },
        { name: 'Claude', url: 'https://claude.ai/new', icon: 'fa-solid fa-bars' },
        { name: 'DeepSeek', url: 'https://chat.deepseek.com/', icon: 'fa-solid fa-bars' },
        { name: 'Kimi K2', url: 'https://www.kimi.com/', icon: 'fa-solid fa-bars' },
        { name: 'AI Analysis', url: 'https://artificialanalysis.ai/', icon: 'fa-solid fa-bars' },
        { name: 'Civit AI', url: 'https://civitai.com/models', icon: 'fa-solid fa-bars' }
    ],
    'AI Tools': [
        { name: 'Case Convert', url: 'https://convertcase.net/', icon: 'fa-solid fa-link' },
        { name: 'Excalidraw', url: 'https://excalidraw.com/', icon: 'fa-solid fa-link' },
        { name: 'MoviesMod', url: 'https://mmodlist.com/', icon: 'fa-solid fa-link' },
        { name: 'Squoosh', url: 'https://bulk-squoosh.vercel.app/', icon: 'fa-solid fa-link' },
        { name: 'ImgOps', url: 'https://imgops.com/', icon: 'fa-solid fa-link' },
        { name: 'Invoice', url: 'https://invoice-generator.com/', icon: 'fa-solid fa-link' },
        { name: 'Photo Resize', url: 'https://testbook.com/exam-photo-crop-resize-tool', icon: 'fa-solid fa-link' },
        { name: 'Flowcv App', url: 'https://app.flowcv.com/resumes', icon: 'fa-solid fa-link' },
        { name: 'Transfernow', url: 'https://www.transfernow.net/en', icon: 'fa-solid fa-link' },
        { name: 'Yandex Images', url: 'https://yandex.com/images', icon: 'fa-solid fa-link' },
        { name: '9xbuddy', url: 'https://9xbuddy.com/', icon: 'fa-solid fa-link' }
    ]
};

const categoryColors = ['mauve', 'blue', 'red', 'green', 'peach', 'teal', 'pink', 'yellow'];

// Search engine configuration (default engines and URLs)

const allSearchEngines = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: '<i class="fa-brands fa-google"></i>'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        icon: '<span class="nf-icon">󰇥</span>'
    },
    github: {
        name: 'GitHub',
        url: 'https://github.com/search?q=',
        icon: '<i class="fa-brands fa-github"></i>'
    },
    git: {
        name: 'Git',
        url: 'https://git-scm.com/search/results?search=',
        icon: '<i class="fa-brands fa-git-alt"></i>'
    },
    youtube: {
        name: 'YouTube',
        url: 'https://www.youtube.com/results?search_query=',
        icon: '<i class="fa-brands fa-youtube"></i>'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=',
        icon: '<i class="fa-brands fa-microsoft"></i>'
    },
    amazon: {
        name: 'Amazon',
        url: 'https://www.amazon.com/s?k=',
        icon: '<i class="fa-brands fa-amazon"></i>'
    },
    wikipedia: {
        name: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
        icon: '<i class="fa-brands fa-wikipedia-w"></i>'
    },
    archive: {
        name: 'Internet Archive',
        url: 'https://archive.org/search?query=',
        icon: '<i class="fa-solid fa-box-archive"></i>'
    }
};

// Settings management: load/save helpers and defaults (localStorage-backed)

// Escape a string for safe insertion into HTML attributes (prevents markup injection)
function escapeHtml(str) {
    if (str === undefined || str === null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


function loadSettings() {
    const defaults = {
        userName: '',
        colorScheme: 'catppuccin',
        theme: 'dark',
        colorMode: 'multi',
        timeFormat: '12',
        showSeconds: 'false',
        tempUnit: 'F',
        showQuotes: 'true',
        enabledEngines: ['google', 'youtube'],
        preferredEngine: 'google',
        weatherLocation: 'New York,NY,US',
        openWeatherApiKey: '',
        waqiApiKey: '',
        linkBehavior: 'same',
        showKeyboardHints: 'true',
        footerLeft: 'blank',
        footerCenter: 'blank',
        footerRight: 'quotes',
        socialLinks: []
    };

    return {
        userName: localStorage.getItem('userName') ?? defaults.userName,
        colorScheme: localStorage.getItem('colorScheme') ?? defaults.colorScheme,
        theme: localStorage.getItem('theme') ?? defaults.theme,
        colorMode: localStorage.getItem('colorMode') ?? defaults.colorMode,
        timeFormat: localStorage.getItem('timeFormat') ?? defaults.timeFormat,
        showSeconds: localStorage.getItem('showSeconds') ?? defaults.showSeconds,
        tempUnit: localStorage.getItem('tempUnit') ?? defaults.tempUnit,
        showQuotes: localStorage.getItem('showQuotes') ?? defaults.showQuotes,
        enabledEngines: JSON.parse(localStorage.getItem('enabledEngines')) ?? defaults.enabledEngines,
        preferredEngine: localStorage.getItem('preferredEngine') ?? defaults.preferredEngine,
        weatherLocation: localStorage.getItem('weatherLocation') ?? defaults.weatherLocation,
        openWeatherApiKey: localStorage.getItem('openWeatherApiKey') ?? defaults.openWeatherApiKey,
        waqiApiKey: localStorage.getItem('waqiApiKey') ?? defaults.waqiApiKey,
        linkBehavior: localStorage.getItem('linkBehavior') ?? defaults.linkBehavior,
        showKeyboardHints: localStorage.getItem('showKeyboardHints') ?? defaults.showKeyboardHints,
        footerLeft: localStorage.getItem('footerLeft') ?? defaults.footerLeft,
        footerCenter: localStorage.getItem('footerCenter') ?? defaults.footerCenter,
        footerRight: localStorage.getItem('footerRight') ?? defaults.footerRight,
        showTodoSidebar: localStorage.getItem('showTodoSidebar') ?? 'true',
        socialLinks: JSON.parse(localStorage.getItem('socialLinks')) ?? defaults.socialLinks
    };
}

function saveSettings(key, value) {
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
    settings[key] = value;
}

function loadCategories() {
    const saved = localStorage.getItem('categories');
    let cats;
    if (!saved) {
        cats = JSON.parse(JSON.stringify(defaultCategories));
    } else {
        cats = JSON.parse(saved);
    }

    // Migrate old HTML format to simple class format and ensure visibility flag
    return cats.map(cat => {
        // Check if icon is in old HTML format
        if (cat.icon && typeof cat.icon === 'string' && cat.icon.includes('<i class="')) {
            const match = cat.icon.match(/class="([^"]+)"/);
            if (match) {
                cat.icon = match[1];
            }
        }
        if (cat.visible === undefined) cat.visible = true;
        return cat;
    });
}

function saveCategories(cats) {
    localStorage.setItem('categories', JSON.stringify(cats));
}

function loadLinks() {
    const saved = localStorage.getItem('links');
    const lnks = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultLinks));

    // Ensure each link has a visible flag (default true) and a stable id
    let mutated = false;
    Object.keys(lnks).forEach(catId => {
        lnks[catId] = lnks[catId].map(link => {
            if (link.visible === undefined) link.visible = true;
            if (!link.id) {
                // Assign a stable-ish id for drag operations
                link.id = 'link_' + Math.random().toString(36).substr(2, 9);
                mutated = true;
            }
            return link;
        });
    });

    // Persist if we added ids
    if (mutated) saveLinks(lnks);

    return lnks;
}

function saveLinks(lnks) {
    localStorage.setItem('links', JSON.stringify(lnks));
}

function loadTodoLists() {
    const saved = localStorage.getItem('todoLists');
    if (saved) {
        return JSON.parse(saved);
    }
    // Migrate old single list if exists
    const oldTodos = localStorage.getItem('todos');
    const oldPos = localStorage.getItem('todo-sidebar-pos');
    const items = oldTodos ? JSON.parse(oldTodos) : [];
    let pos = { left: '20px', top: '50%' };
    if (oldPos) {
        try { pos = JSON.parse(oldPos); } catch (e) {}
    }

    return [{
        id: 'list_' + Date.now(),
        title: 'Tasks',
        items: items,
        pos: pos,
        active: true
    }];
}

function saveTodoLists(lists) {
    localStorage.setItem('todoLists', JSON.stringify(lists));
}

// Initialize settings
let settings = loadSettings();
let categories = loadCategories();
let links = loadLinks();
let todoLists = loadTodoLists();
let currentEngine = settings.preferredEngine;

// ========================================
// Theme Management
// ========================================

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveSettings('theme', theme);
}

function applyColorScheme(scheme) {
    document.documentElement.setAttribute('data-scheme', scheme);
    saveSettings('colorScheme', scheme);
    // Update color mode visibility based on scheme
    updateColorModeVisibility();
}

function updateColorModeVisibility() {
    const colorModeItem = document.querySelector('[data-setting="colorMode"]')?.closest('.setting-item');
    if (colorModeItem) {
        // Hide color mode option for monochrome scheme
        if (settings.colorScheme === 'monochrome') {
            colorModeItem.style.display = 'none';
        } else {
            colorModeItem.style.display = 'flex';
        }
    }
}

function applyColorMode(mode) {
    document.documentElement.setAttribute('data-color-mode', mode);
    saveSettings('colorMode', mode);
    renderLinksGrid();
}

// Apply saved theme and color scheme immediately
applyTheme(settings.theme);
applyColorScheme(settings.colorScheme);

// ========================================
// DOM Elements
// ========================================

let searchInput, timeElement, dateElement, greetingElement, weatherElement, quoteElement, linksGrid;

// ========================================
// Time & Date Functions
// ========================================

function updateDateTime() {
    if (!timeElement || !dateElement) return;

    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    let timeString;

    if (settings.timeFormat === '12') {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        if (settings.showSeconds === 'true') {
            timeString = `${hours}:${minutes}:${seconds} ${period}`;
        } else {
            timeString = `${hours}:${minutes} ${period}`;
        }
    } else {
        if (settings.showSeconds === 'true') {
            timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
        } else {
            timeString = `${hours.toString().padStart(2, '0')}:${minutes}`;
        }
    }

    timeElement.textContent = timeString;

    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);

    updateGreeting(now.getHours());
}

function updateGreeting(hour) {
    if (!greetingElement) return;

    let greeting, iconHtml;

    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
        iconHtml = '<span class="nf-icon">󰖜</span>';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
        iconHtml = '<i class="fa-solid fa-sun"></i>';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening';
        iconHtml = '<span class="nf-icon">󰖛</span>';
    } else {
        greeting = 'Good night';
        iconHtml = '<i class="fa-solid fa-moon"></i>';
    }

    const userName = settings.userName;
    greetingElement.textContent = userName ? `${greeting}, ${userName}` : greeting;

    // NOTE: greeting icon will be managed by weather updates (showing current weather icon)
}

// ========================================
// Search Functions
// ========================================

function performSearch(query) {
    if (!query.trim()) return;

    // Use Chrome Search API if available (respects user's default search engine)
    if (typeof chrome !== 'undefined' && chrome.search && chrome.search.query) {
        chrome.search.query({
            text: query,
            disposition: 'CURRENT_TAB'
        });
    } else {
        // Fallback for Firefox or when Chrome Search API is not available
        const merged = getAllEnginesMerged();
        const engine = merged[currentEngine] || merged[settings.preferredEngine];
        if (!engine || !engine.url) {
            console.warn('No search engine URL found for', currentEngine, engine);
            return;
        }

        const searchUrl = engine.url + encodeURIComponent(query);
        window.location.href = searchUrl;
    }
}

function setSearchEngine(engine) {
    const merged = getAllEnginesMerged();
    if (!merged[engine]) return;
    if (!settings.enabledEngines.includes(engine)) return;

    currentEngine = engine;
    saveSettings('preferredEngine', engine);

    document.querySelectorAll('.search-engines .engine').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.engine === engine);
    });

    if (searchInput) {
        searchInput.placeholder = `Search ${merged[engine].name}... `;
    }
}

function renderSearchEngines() {
    const container = document.querySelector('.search-engines');
    if (!container) return;

    const merged = getAllEnginesMerged();
    container.innerHTML = settings.enabledEngines.map((engineId, index) => {
        const engine = merged[engineId];
        if (!engine) return '';
        return `
            <button class="engine ${engineId === currentEngine ? 'active' : ''}" 
                    data-engine="${engineId}" 
                    title="${engine.name} (${index + 1})">
                ${engine.icon}
            </button>
        `;
    }).join('');

    // Rebind click events
    container.querySelectorAll('.engine').forEach(btn => {
        btn.addEventListener('click', () => {
            setSearchEngine(btn.dataset.engine);
            if (searchInput) searchInput.focus();
        });
    });

    // Update keyboard hints
    updateKeyboardHints();
}

// --- Custom Search Engines (persisted) ---
function loadCustomSearchEngines() {
    try {
        return JSON.parse(localStorage.getItem('customSearchEngines')) || {};
    } catch (e) {
        return {};
    }
}

function saveCustomSearchEngines(obj) {
    localStorage.setItem('customSearchEngines', JSON.stringify(obj));
}

function getAllEnginesMerged() {
    const custom = loadCustomSearchEngines();
    // Merge without mutating original. Custom entries override built-ins.
    const merged = Object.assign({}, allSearchEngines);
    Object.keys(custom || {}).forEach(key => {
        const val = custom[key];
        if (val && val.deleted) {
            delete merged[key];
        } else if (val) {
            merged[key] = Object.assign({}, merged[key] || {}, val);
        }
    });
    return merged;
}

function renderSearchEngineSettings() {
    const container = document.getElementById('search-engine-options');
    if (!container) return;

    const merged = getAllEnginesMerged();
    // Render as list items: checkbox (left), icon preview, icon HTML, name, url, actions
    container.innerHTML = Object.keys(merged).map(id => {
        const engine = merged[id];
        const enabled = settings.enabledEngines.includes(id);
        return `
            <div class="engine-item" data-id="${id}">
                <label class="social-checkbox engine-col-checkbox">
                    <input type="checkbox" class="engine-visible-checkbox" data-engine="${id}" ${enabled ? 'checked' : ''}>
                </label>
                <span class="engine-icon-preview">${engine.icon || ''}</span>
                <input class="engine-icon-input monospace" data-field="icon" value="${escapeHtml(engine.icon || '')}" />
                <input class="engine-name-input" data-field="name" value="${escapeHtml(engine.name || '')}" />
                <input class="engine-url-input" data-field="url" value="${escapeHtml(engine.url || '')}" />
                <div class="engine-actions">
                    <button class="engine-delete" title="Delete engine"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');

    // Bind events for the new layout
    container.querySelectorAll('.engine-item').forEach(item => {
        const id = item.dataset.id;
        const isCustom = !!loadCustomSearchEngines()[id];

        // Inputs
        const iconInput = item.querySelector('.engine-icon-input');
        const nameInput = item.querySelector('.engine-name-input');
        const urlInput = item.querySelector('.engine-url-input');

        const saveCustom = () => {
            const custom = loadCustomSearchEngines();
            custom[id] = custom[id] || {};
            if (iconInput) custom[id].icon = iconInput.value;
            if (nameInput) custom[id].name = nameInput.value;
            if (urlInput) custom[id].url = urlInput.value;
            saveCustomSearchEngines(custom);
            renderSearchEngines();
        };

        // Allow editing for all engines: save overrides to custom store
        [iconInput, nameInput, urlInput].forEach(el => { if (el) el.addEventListener('input', saveCustom); });

        // Visibility checkbox
        const visCheckbox = item.querySelector('.engine-visible-checkbox');
        if (visCheckbox) {
            visCheckbox.addEventListener('change', (e) => {
                const enabled = settings.enabledEngines || [];
                const idx = enabled.indexOf(id);
                if (e.target.checked && idx === -1) {
                    enabled.push(id);
                } else if (!e.target.checked && idx !== -1) {
                    if (enabled.length <= 1) {
                        showNotification('At least one engine must remain enabled', 'error');
                        // revert
                        e.target.checked = true;
                        return;
                    }
                    enabled.splice(idx, 1);
                }
                saveSettings('enabledEngines', enabled);
                renderSearchEngineSettings();
                renderSearchEngines();
            });
        }

        // Delete for all engines: mark as deleted in custom store (so built-ins can be removed)
        const delBtn = item.querySelector('.engine-delete');
        if (delBtn) {
            delBtn.addEventListener('click', () => {
                const custom = loadCustomSearchEngines();
                custom[id] = custom[id] || {};
                custom[id].deleted = true;
                saveCustomSearchEngines(custom);
                // remove from enabled list
                const enabled = (settings.enabledEngines || []).filter(e => e !== id);
                if (enabled.length === 0) {
                    showNotification('At least one engine must remain enabled', 'error');
                    return;
                }
                saveSettings('enabledEngines', enabled);
                renderSearchEngineSettings();
                renderSearchEngines();
                showNotification('Engine removed', 'success');
            });
        }
    });

    // Add engine form handling (keeps previous behavior)
    const addBtn = document.getElementById('add-engine-btn');
    if (addBtn) {
        addBtn.onclick = (e) => {
            e.preventDefault();
            const id = (document.getElementById('new-engine-id') || {}).value?.trim();
            const name = (document.getElementById('new-engine-name') || {}).value?.trim();
            const url = (document.getElementById('new-engine-url') || {}).value?.trim();
            const icon = (document.getElementById('new-engine-icon') || {}).value?.trim() || '<i class="fa-solid fa-magnifying-glass"></i>';
            if (!id || !name || !url) {
                showNotification('Please provide id, name and url for the engine', 'error');
                return;
            }
            const existingCustom = loadCustomSearchEngines();
            if (allSearchEngines[id] || existingCustom[id]) {
                showNotification('Engine id already exists', 'error');
                return;
            }
            existingCustom[id] = { name, url, icon };
            saveCustomSearchEngines(existingCustom);
            // enable it by default
            const enabled = Array.from(settings.enabledEngines || []);
            enabled.push(id);
            saveSettings('enabledEngines', enabled);
            renderSearchEngineSettings();
            renderSearchEngines();
            showNotification('Engine added', 'success');
            // clear form
            ['new-engine-id', 'new-engine-name', 'new-engine-url', 'new-engine-icon'].forEach(k => { const el = document.getElementById(k); if (el) el.value = ''; });
        };
    }
    // Ensure the add-engine toggle works while this panel is active (bind once)
    try {
        const toggleAdd = document.getElementById('toggle-add-engine');
        const addContainer = document.getElementById('add-engine-container');
        if (toggleAdd && addContainer && !toggleAdd.dataset.bound) {
            // Previously this revealed inputs; keep the element but change behavior
            toggleAdd.addEventListener('click', (e) => {
                e.preventDefault();
                // Add a placeholder engine row directly (like Categories/Links)
                addSearchEnginePlaceholder();
            });
            toggleAdd.dataset.bound = 'true';
        }
    } catch (e) {
        console.error('Error binding add-engine toggle', e);
    }
}

// Add a new placeholder search engine row (similar UX to Categories/Links)
function addSearchEnginePlaceholder() {
    const id = 'se_' + Date.now();
    const custom = loadCustomSearchEngines();
    // default placeholder values
    custom[id] = {
        name: 'New Search Engine',
        url: 'https://',
        icon: '<i class="fa-solid fa-magnifying-glass"></i>'
    };
    saveCustomSearchEngines(custom);
    // enable by default
    const enabled = Array.from(settings.enabledEngines || []);
    enabled.push(id);
    saveSettings('enabledEngines', enabled);
    // re-render and focus the name input of the newly added row
    renderSearchEngineSettings();
    renderSearchEngines();
    setTimeout(() => {
        const nameInput = document.querySelector(`.engine-item[data-id="${id}"] .engine-name-input`);
        if (nameInput) nameInput.focus();
    }, 50);
}

function updateKeyboardHints() {
    const hintsContainer = document.querySelector('.keyboard-hints');
    if (!hintsContainer) return;

    // Show or hide keyboard hints based on setting
    if (settings.showKeyboardHints === 'false') {
        hintsContainer.style.display = 'none';
        return;
    } else {
        hintsContainer.style.display = 'flex';
    }

    const engineCount = settings.enabledEngines.length;
    const engineHint = engineCount > 1 ? `<kbd>1-${engineCount}</kbd> Engine` : '';

    hintsContainer.innerHTML = `
        <span class="hint"><kbd>/</kbd> Search</span>
        ${engineHint ? `<span class="hint">${engineHint}</span>` : ''}
        <span class="hint"><kbd>Esc</kbd> Clear</span>
    `;
}

// ========================================
// Weather Function (OpenWeather API Integration)
// ========================================

let weatherThrottleTimeout;

async function updateWeather() {
    if (!weatherElement) return;
    
    // Throttle: don't update more than once every 30 seconds manually
    if (weatherThrottleTimeout) return;

    // Show skeletons
    const widgetElement = weatherElement.parentElement;
    if (widgetElement) {
        const iconElement = widgetElement.querySelector('.widget-icon');
        if (iconElement) {
            iconElement.innerHTML = '<div class="skeleton skeleton-icon"></div>';
        }
    }
    weatherElement.innerHTML = '<div class="skeleton skeleton-text" style="width: 150px;"></div>';

    // Check if API key is configured
    if (!settings.openWeatherApiKey || !settings.weatherLocation) {
        // Fall back to mock weather data if no API key or location
        setTimeout(showMockWeather, 500); // Slight delay to show skeleton
        return;
    }

    const query = `q=${encodeURIComponent(settings.weatherLocation)}`;
    fetchWeather(query);
    
    weatherThrottleTimeout = setTimeout(() => {
        weatherThrottleTimeout = null;
    }, 30000); 
}

async function fetchWeather(query) {
    try {
        const unit = settings.tempUnit === 'C' ? 'metric' : 'imperial';
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${settings.openWeatherApiKey}&units=${unit}`
        );

        if (!response.ok) {
            console.error('Weather API error:', response.status, response.statusText);
            throw new Error('Weather API error');
        }

        const data = await response.json();

        // Get temperature, condition, and icon info
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main; 
        const cityName = data.name || settings.weatherLocation;
        const humidity = data.main.humidity;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const humidityIconUrl = 'https://openweathermap.org/img/widget_icons/humidity-low.svg';

        const tempUnit = unit === 'metric' ? '°C' : '°F';

        // Update UI
        const widgetElement = weatherElement.parentElement;
        if (widgetElement) {
            const iconElement = widgetElement.querySelector('.widget-icon');
            if (iconElement) {
                iconElement.innerHTML = `<img src="${iconUrl}" alt="" style="width:2em;height:2em;margin:-0.25em 0;vertical-align:middle;">`;
            }
        }

        let weatherContent = `${cityName}, ${temp}${tempUnit} ${condition}`;
        if (humidity !== undefined) {
            weatherContent += ` | <img src="${humidityIconUrl}" class="humidity-icon" alt="Humidity"> ${humidity}%`;
        }
        
        weatherElement.innerHTML = weatherContent;
        
        // Mirror into greeting
        const greetingIcon = document.getElementById('greeting-icon');
        if (greetingIcon && widgetElement) {
            const iconElement = widgetElement.querySelector('.widget-icon');
            if (iconElement) greetingIcon.innerHTML = iconElement.innerHTML;
        }

        // AQI
        try {
            const aqiData = await fetchAQI({ lat: data.coord?.lat, lon: data.coord?.lon, city: cityName });
            if (aqiData && typeof aqiData.aqi === 'number') {
                weatherElement.innerHTML = `${weatherElement.innerHTML} | ${aqiData.aqi} AQI`;
            }
        } catch (err) {}
    } catch (err) {
        console.error('Weather fetch error:', err);
        showMockWeather();
    }
}

// Fetch AQI data from WAQI (uses settings.waqiApiKey)
async function fetchAQI(location) {
    if (!settings.waqiApiKey || !location) return null;
    try {
        let url;
        // Allow passing coords object {lat,lon} or a city string
        if (typeof location === 'object' && location.lat && location.lon) {
            url = `https://api.waqi.info/feed/geo:${location.lat};${location.lon}/?token=${encodeURIComponent(settings.waqiApiKey)}`;
        } else if (typeof location === 'object' && location.city) {
            url = `https://api.waqi.info/feed/${encodeURIComponent(location.city)}/?token=${encodeURIComponent(settings.waqiApiKey)}`;
        } else {
            url = `https://api.waqi.info/feed/${encodeURIComponent(location)}/?token=${encodeURIComponent(settings.waqiApiKey)}`;
        }

        console.debug('WAQI request URL:', url);
        const resp = await fetch(url);
        if (!resp.ok) return null;
        const data = await resp.json();
        if (data && data.status && data.status !== 'ok') {
            console.warn('WAQI API returned non-ok status:', data.status, data);
        }
        if (data && data.status === 'ok' && data.data) {
            return {
                aqi: data.data.aqi,
                dominentpol: data.data.dominentpol,
                city: data.data.city && data.data.city.name
            };
        }
    } catch (e) {
        console.error('AQI fetch error', e);
    }
    return null;
}

function showMockWeather() {
    if (!weatherElement) return;

    const mockWeatherData = [
        { tempF: 72, condition: 'Partly Cloudy', icon: 'fa-cloud-sun' },
        { tempF: 64, condition: 'Cloudy', icon: 'fa-cloud' },
        { tempF: 77, condition: 'Sunny', icon: 'fa-sun' },
        { tempF: 59, condition: 'Rainy', icon: 'fa-cloud-rain' },
        { tempF: 68, condition: 'Clear', icon: 'fa-moon' },
        { tempF: 45, condition: 'Thunderstorms', icon: 'fa-cloud-bolt' },
        { tempF: 28, condition: 'Snow', icon: 'fa-snowflake' },
        { tempF: 55, condition: 'Windy', icon: 'fa-wind' }
    ];

    const weather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)];

    let temp, unit;
    if (settings.tempUnit === 'C') {
        temp = Math.round((weather.tempF - 32) * 5 / 9);
        unit = '°C';
    } else {
        temp = weather.tempF;
        unit = '°F';
    }

    weatherElement.innerHTML = `${temp}${unit} ${weather.condition} | <img src="https://openweathermap.org/img/widget_icons/humidity-low.svg" class="humidity-icon" alt="Humidity"> 00% | 00 AQI`;

    // Get the parent widget and find the icon element
    const widgetElement = weatherElement.parentElement;
    if (widgetElement) {
        const iconElement = widgetElement.querySelector('.widget-icon');
        if (iconElement) {
            iconElement.innerHTML = `<i class="fa-solid ${weather.icon}"></i>`;
        }
        // Mirror icon into greeting icon
        const greetingIcon = document.getElementById('greeting-icon');
        if (greetingIcon) {
            const iconElement = widgetElement.querySelector('.widget-icon');
            if (iconElement) greetingIcon.innerHTML = iconElement.innerHTML;
        }
    }
}

// ========================================
// Quotes Function
// ========================================

const quotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"First, solve the problem.  Then, write the code." - John Johnson',
    '"Simplicity is the soul of efficiency." - Austin Freeman',
    '"Make it work, make it right, make it fast." - Kent Beck',
    '"Talk is cheap. Show me the code." - Linus Torvalds',
    '"Creativity is intelligence having fun." - Albert Einstein',
    '"Done is better than perfect." - Sheryl Sandberg',
    '"Stay hungry, stay foolish." - Steve Jobs',
    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
];

function updateQuote() {
    const quoteWidget = document.querySelector('.quote-widget');
    if (!quoteWidget || !quoteElement) return;

    if (settings.showQuotes === 'true') {
        quoteWidget.style.display = 'flex';
        
        // Show skeleton briefly
        quoteElement.innerHTML = '<div class="skeleton skeleton-text" style="width: 250px;"></div>';
        
        setTimeout(() => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = randomQuote;
        }, 300);
    } else {
        quoteWidget.style.display = 'none';
    }
}

// ========================================
// Todo List Functions
// ========================================

function renderTodosWidget() {
    let todoWidget = document.querySelector('.todo-widget');
    if (!todoWidget) {
        todoWidget = document.createElement('div');
        todoWidget.className = 'widget todo-widget';
        todoWidget.innerHTML = '<div class="todo-items-footer"></div>';
    }

    const itemsContainer = todoWidget.querySelector('.todo-items-footer');
    if (!itemsContainer) return;

    // Filter incomplete todos across all active lists
    const activeTodosCount = todoLists.reduce((acc, list) => {
        return acc + list.items.filter(t => !t.completed).length;
    }, 0);

    if (activeTodosCount > 0) {
        itemsContainer.innerHTML = `
            <span class="widget-icon"><i class="fa-solid fa-check-double"></i></span>
            <span class="widget-text">${activeTodosCount} task${activeTodosCount > 1 ? 's' : ''} remaining</span>
        `;
    } else {
        itemsContainer.innerHTML = `
            <span class="widget-icon"><i class="fa-solid fa-circle-check"></i></span>
            <span class="widget-text">All done!</span>
        `;
    }

    todoWidget.onclick = () => {
        // Toggle the first sidebar as a default behavior
        const sidebars = document.querySelectorAll('.todo-sidebar');
        if (sidebars.length > 0) {
            sidebars.forEach(sb => sb.classList.toggle('active'));
        }
    };

    return todoWidget;
}

function renderTodoSidebar() {
    // Remove existing sidebars
    document.querySelectorAll('.todo-sidebar').forEach(el => el.remove());

    if (settings.showTodoSidebar === 'false') return;

    todoLists.forEach(list => {
        createSidebarInstance(list);
    });
}

function createSidebarInstance(list) {
    const sidebar = document.createElement('div');
    sidebar.className = 'todo-sidebar active';
    sidebar.id = `sidebar-${list.id}`;
    sidebar.setAttribute('data-list-id', list.id);

    // Apply position
    if (list.pos) {
        sidebar.style.left = list.pos.left;
        sidebar.style.top = list.pos.top;
        sidebar.style.transform = 'none';
    }

    sidebar.innerHTML = `
        <div class="sidebar-header" id="header-${list.id}">
            <div class="header-drag-handle" title="Drag to move">
                <i class="fa-solid fa-grip-lines"></i>
            </div>
            <h3 contenteditable="true" class="list-title">${escapeHtml(list.title)}</h3>
            <div class="header-actions">
                <button class="header-add-list-btn" onclick="addNewTaskList()" title="New Task List">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <button class="header-delete-list-btn" onclick="deleteTaskList('${list.id}')" title="Delete This List">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        <div class="sidebar-content" id="list-content-${list.id}">
            <div class="sidebar-quick-add">
                <input type="text" class="sidebar-todo-input" placeholder="Quick add task..." aria-label="Quick add task">
                <button class="sidebar-quick-add-btn"><i class="fa-solid fa-plus"></i></button>
            </div>
            <div class="sidebar-todo-list">
                ${list.items.length === 0 ? '<div class="empty-state">No tasks yet</div>' : list.items.map(todo => `
                    <div class="sidebar-todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                        <i class="fa-solid fa-grip-vertical drag-handle"></i>
                        <label class="todo-checkbox">
                            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                            <span class="checkmark"></span>
                        </label>
                        <span class="todo-text">${escapeHtml(todo.text)}</span>
                        <button class="sidebar-todo-delete" data-id="${todo.id}" title="Delete Task">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="sidebar-footer">
            <button class="toolbar-btn sidebar-delete-all-btn" title="Delete All Tasks">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;

    document.body.appendChild(sidebar);

    // Bind Header Events
    const titleEl = sidebar.querySelector('.list-title');
    titleEl.onblur = () => {
        list.title = titleEl.innerText.trim() || 'Tasks';
        saveTodoLists(todoLists);
    };
    titleEl.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); titleEl.blur(); } };

    // Bind Quick Add
    const input = sidebar.querySelector('.sidebar-todo-input');
    const addBtn = sidebar.querySelector('.sidebar-quick-add-btn');
    const handleAdd = () => {
        const val = input.value.trim();
        if (val) {
            list.items.push({ text: val, completed: false, id: Date.now() });
            saveTodoLists(todoLists);
            renderTodoSidebar();
            updateFooter();
        }
    };
    addBtn.onclick = handleAdd;
    input.onkeydown = (e) => { if (e.key === 'Enter') handleAdd(); };

    // Bind Item Events
    const listContainer = sidebar.querySelector('.sidebar-todo-list');
    listContainer.querySelectorAll('.todo-checkbox input').forEach(check => {
        check.onchange = (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = list.items.find(t => t.id === id);
            if (item) {
                item.completed = e.target.checked;
                saveTodoLists(todoLists);
                renderTodoSidebar();
                updateFooter();
            }
        };
    });

    listContainer.querySelectorAll('.sidebar-todo-delete').forEach(btn => {
        btn.onclick = () => {
            const id = parseInt(btn.dataset.id);
            list.items = list.items.filter(t => t.id !== id);
            saveTodoLists(todoLists);
            renderTodoSidebar();
            updateFooter();
        };
    });

    // Bind Delete All
    sidebar.querySelector('.sidebar-delete-all-btn').onclick = () => {
        if (list.items.length === 0) return;
        if (confirm(`Delete all tasks in "${list.title}"?`)) {
            list.items = [];
            saveTodoLists(todoLists);
            renderTodoSidebar();
            updateFooter();
        }
    };

    // Init Dragging (Window)
    initDraggableSidebarInstance(sidebar, sidebar.querySelector('.sidebar-header'), list);

    // Init Sortable (Items)
    if (typeof Sortable !== 'undefined' && list.items.length > 0) {
        Sortable.create(listContainer, {
            animation: 150,
            handle: '.drag-handle',
            draggable: '.sidebar-todo-item',
            onEnd: () => {
                const newOrder = Array.from(listContainer.querySelectorAll('.sidebar-todo-item'))
                    .map(item => parseInt(item.dataset.id));
                list.items = newOrder.map(id => list.items.find(t => t.id === id)).filter(Boolean);
                saveTodoLists(todoLists);
                updateFooter();
            }
        });
    }
}

function addNewTaskList() {
    const newList = {
        id: 'list_' + Date.now(),
        title: 'New List',
        items: [],
        pos: { left: '50%', top: '50%' },
        active: true
    };
    todoLists.push(newList);
    saveTodoLists(todoLists);
    renderTodoSidebar();
}

function deleteTaskList(id) {
    const list = todoLists.find(l => l.id === id);
    if (!list) return;

    if (confirm(`Delete the entire task list "${list.title}"?`)) {
        todoLists = todoLists.filter(l => l.id !== id);
        
        if (todoLists.length === 0) {
            // If deleting the last list, turn off the sidebar setting
            saveSettings('showTodoSidebar', 'false');
            updateToggleStates();
            
            // Add a default empty list back so it's ready if they turn it on later
            todoLists = [{
                id: 'list_' + Date.now(),
                title: 'Tasks',
                items: [],
                pos: { left: '20px', top: '50%' },
                active: true
            }];
        }
        
        saveTodoLists(todoLists);
        renderTodoSidebar();
        updateFooter();
    }
}

function initDraggableSidebarInstance(sidebar, header, list) {
    let isDragging = false;
    let initialX;
    let initialY;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        if (e.target.closest('.header-drag-handle')) {
            const rect = sidebar.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;
            isDragging = true;
            sidebar.style.transition = 'none';
            sidebar.style.zIndex = 1001; // Bring to front
            // Reset other sidebars z-index
            document.querySelectorAll('.todo-sidebar').forEach(sb => {
                if (sb !== sidebar) sb.style.zIndex = 1000;
            });
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            let newX = e.clientX - initialX;
            let newY = e.clientY - initialY;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const rect = sidebar.getBoundingClientRect();

            if (newX < 0) newX = 0;
            if (newX + rect.width > viewportWidth) newX = viewportWidth - rect.width;
            if (newY < 0) newY = 0;
            if (newY + rect.height > viewportHeight) newY = viewportHeight - rect.height;

            sidebar.style.left = `${newX}px`;
            sidebar.style.top = `${newY}px`;
            sidebar.style.transform = 'none';
        }
    }

    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            sidebar.style.transition = 'opacity 0.3s ease';
            list.pos = {
                left: sidebar.style.left,
                top: sidebar.style.top
            };
            saveTodoLists(todoLists);
        }
    }
}
function renderSocialLinks() {
    // Get or create social links container
    let socialWidget = document.querySelector('.social-widget');

    if (!socialWidget) {
        socialWidget = document.createElement('div');
        socialWidget.className = 'widget social-widget';
        socialWidget.innerHTML = '<div class="social-icons"></div>';
    }

    const iconsContainer = socialWidget.querySelector('.social-icons');
    if (!iconsContainer) return;

    // Filter visible social links
    const visibleLinks = settings.socialLinks.filter(link => link.visible && link.url);

    if (visibleLinks.length > 0) {
        const target = settings.linkBehavior === 'new-tab' ? '_blank' : (settings.linkBehavior === 'new-window' ? '_blank' : '_self');
        iconsContainer.innerHTML = visibleLinks.map(link => {
            return `<a href="${link.url}" target="${target}" title="${link.name}" class="social-icon" data-link-behavior="${settings.linkBehavior}"><i class="${link.icon}"></i></a>`;
        }).join('');

        // Add click handlers for social links
        iconsContainer.querySelectorAll('.social-icon').forEach(link => {
            link.addEventListener('click', function (e) {
                const behavior = this.getAttribute('data-link-behavior');
                if (behavior === 'new-tab' || behavior === 'new-window') {
                    e.preventDefault();
                    window.open(this.href, '_blank', 'noopener,noreferrer');
                }
            });
        });
    } else {
        iconsContainer.innerHTML = '';
    }

    return socialWidget;
}

// ========================================
// Footer Management
// ========================================

function updateFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Clear existing content
    footer.innerHTML = '';

    // Create sections based on settings
    const sections = [
        { position: 'left', setting: settings.footerLeft },
        { position: 'center', setting: settings.footerCenter },
        { position: 'right', setting: settings.footerRight }
    ];

    sections.forEach(section => {
        const widget = createFooterWidget(section.setting);
        if (widget) {
            widget.style.flex = section.position === 'center' ? '1' : 'initial';
            widget.style.justifyContent = section.position === 'center' ? 'center' : (section.position === 'right' ? 'flex-end' : 'flex-start');
            footer.appendChild(widget);
        }
    });

    // Hide footer if no widgets were added
    if (!footer.hasChildNodes()) {
        footer.style.display = 'none';
    } else {
        footer.style.display = '';
    }
}

function createFooterWidget(type) {
    if (type === 'blank') return null;

    if (type === 'weather') {
        // If a weather widget already exists (e.g., header), do not create another in footer
        if (document.getElementById('weather')) return null;
        const widget = document.createElement('div');
        widget.className = 'widget weather-widget';
        widget.innerHTML = `
            <span class="widget-icon"><i class="fa-solid fa-cloud-sun"></i></span>
            <span class="widget-text" id="weather">Loading...</span>
        `;
        // Reassign weatherElement
        setTimeout(() => {
            weatherElement = document.getElementById('weather');
            updateWeather();
        }, 0);
        return widget;
    }

    if (type === 'quotes') {
        const widget = document.createElement('div');
        widget.className = 'widget quote-widget';
        widget.innerHTML = `
            <span class="widget-icon"><i class="fa-solid fa-quote-left"></i></span>
            <span class="widget-text" id="quote">"The only way to do great work is to love what you do."</span>
        `;
        // Reassign quoteElement
        setTimeout(() => {
            quoteElement = document.getElementById('quote');
            updateQuote();
        }, 0);
        return widget;
    }

    if (type === 'socials') {
        return renderSocialLinks();
    }

    if (type === 'todos') {
        return renderTodosWidget();
    }

    return null;
}

// Links grid rendering: builds the main page tiles from `categories` and `links`

function renderLinksGrid() {
    if (!linksGrid) return;

    const colorMode = settings.colorMode;
    const linkTarget = settings.linkBehavior === 'new-tab' ? '_blank' : (settings.linkBehavior === 'new-window' ? '_blank' : '_self');
    const visibleCategories = categories.filter(c => c.visible !== false);
    
    const fragment = document.createDocumentFragment();

    visibleCategories.forEach((category, index) => {
        const categoryLinks = (links[category.id] || []).filter(l => l.visible !== false);
        const colorClass = colorMode === 'multi' ? categoryColors[index % categoryColors.length] : 'mauve';

        const section = document.createElement('section');
        section.className = 'link-group';
        section.dataset.category = category.id;
        section.dataset.color = colorClass;

        const h2 = document.createElement('h2');
        h2.className = 'group-title';
        
        let quickAddHtml = '';
        if (settings.showQuickAddButtons === 'true') {
            quickAddHtml = `<button class="category-quick-add" title="Add Link to ${category.name}" data-category="${category.id}"><i class="fa-solid fa-plus"></i></button>`;
        }

        h2.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--spacing-sm); flex: 1;">
                <span class="title-icon"><i class="${category.icon}"></i></span>
                ${category.name}
            </div>
            ${quickAddHtml}
        `;
        section.appendChild(h2);

        // Add listener for category quick add
        const quickAddBtn = h2.querySelector('.category-quick-add');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const catId = quickAddBtn.dataset.category;
                openLinkSettingsForCategory(catId);
            });
        }

        const linksDiv = document.createElement('div');
        linksDiv.className = `links ${categoryLinks.length === 1 ? 'single-link' : ''}`;

        categoryLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'link-card';
            a.target = linkTarget;
            a.dataset.linkBehavior = settings.linkBehavior;
            a.dataset.linkId = link.id;
            a.innerHTML = `
                <span class="link-icon"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
                <span class="link-text">${link.name}</span>
            `;
            
            a.addEventListener('click', function (e) {
                const behavior = this.getAttribute('data-link-behavior');
                if (behavior === 'new-tab' || behavior === 'new-window') {
                    e.preventDefault();
                    window.open(this.href, '_blank', 'noopener,noreferrer');
                }
            });
            
            linksDiv.appendChild(a);
        });

        section.appendChild(linksDiv);
        fragment.appendChild(section);
    });

    linksGrid.innerHTML = '';
    linksGrid.appendChild(fragment);

    updateGridLayout();
    initDragAndDropMain();
}

function openLinkSettingsForCategory(catId) {
    const overlay = document.getElementById('settings-overlay');
    if (!overlay) return;
    
    overlay.classList.add('active');
    
    // Switch to links tab
    const linksTab = document.querySelector('[data-tab="links"]');
    if (linksTab) linksTab.click();
    
    // Select the category
    const select = document.getElementById('link-category-select');
    if (select) {
        select.value = catId;
        renderLinksForCategory(catId);
        
        // Trigger add link
        addLink();
        
        // Focus the name input of the newly added link
        setTimeout(() => {
            const container = document.getElementById('links-list');
            const lastItem = container?.lastElementChild;
            const nameInput = lastItem?.querySelector('input[data-field="name"]');
            if (nameInput) nameInput.focus();
        }, 100);
    }
}

function updateGridLayout() {
    if (!linksGrid) return;

    const categoryCount = categories.filter(c => c.visible !== false).length;

    linksGrid.classList.remove('grid-single', 'grid-even', 'grid-odd');

    if (categoryCount === 1) {
        linksGrid.classList.add('grid-single');
    } else if (categoryCount % 2 === 0) {
        linksGrid.classList.add('grid-even');
    } else {
        linksGrid.classList.add('grid-odd');
    }
}

// Settings modal UI: open/close, tab handling, and control bindings

function initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsClose = document.getElementById('settings-close');

    if (!settingsBtn || !settingsOverlay || !settingsClose) return;

    // Focus trap variables
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let firstFocusableElement;
    let lastFocusableElement;

    function updateFocusableElements() {
        const elements = settingsOverlay.querySelectorAll(focusableElements);
        firstFocusableElement = elements[0];
        lastFocusableElement = elements[elements.length - 1];
    }

    // Open settings
    settingsBtn.addEventListener('click', () => {
        settingsOverlay.classList.add('active');
        updateFocusableElements();
        // Focus first element or a specific tab
        if (firstFocusableElement) firstFocusableElement.focus();
        
        // Ensure search engines settings are rendered before populating values
        renderSearchEngineSettings();
        populateSettingsUI();
    });

    // Close settings
    settingsClose.addEventListener('click', () => {
        settingsOverlay.classList.remove('active');
        settingsBtn.focus(); // Return focus to trigger button
    });

    // Close on overlay click
    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            settingsOverlay.classList.remove('active');
            settingsBtn.focus();
        }
    });

    // Close on Escape key and Focus Trap
    document.addEventListener('keydown', (e) => {
        if (!settingsOverlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            settingsOverlay.classList.remove('active');
            settingsBtn.focus();
        }

        if (e.key === 'Tab') {
            updateFocusableElements(); // Elements might have changed (e.g. new todo)
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // Tab switching
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');

            if (tabId === 'categories') {
                renderCategoriesSettings();
            } else if (tabId === 'links') {
                renderLinksSettings();
            } else if (tabId === 'social') {
                renderSocialLinksSettings();
            } else if (tabId === 'todos') {
                renderTodosSettings();
            } else if (tabId === 'footer') {
                renderFooterSettings();
            } else if (tabId === 'search-engines') {
                renderSearchEngineSettings();
            } else if (tabId === 'help') {
                // Help tab - content is static in HTML
            }
        });
    });

    // Toggle button handlers
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const setting = btn.dataset.setting;
            const value = btn.dataset.value;

            saveSettings(setting, value);
            updateToggleStates();

            if (setting === 'colorScheme') {
                applyColorScheme(value);
            } else if (setting === 'theme') {
                applyTheme(value);
            } else if (setting === 'colorMode') {
                applyColorMode(value);
            } else if (setting === 'timeFormat') {
                updateDateTime();
            } else if (setting === 'showSeconds') {
                updateDateTime();
            } else if (setting === 'tempUnit') {
                updateWeather();
            } else if (setting === 'showQuotes') {
                updateQuote();
            } else if (setting === 'linkBehavior') {
                renderLinksGrid();
            } else if (setting === 'showKeyboardHints') {
                updateKeyboardHints();
            } else if (setting === 'showTodoSidebar') {
                renderTodoSidebar();
            } else if (setting === 'footerLeft' || setting === 'footerCenter' || setting === 'footerRight') {
                updateFooter();
            }
        });
    });

    // Name input handler
    const nameInput = document.getElementById('setting-name');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            saveSettings('userName', e.target.value);
            updateGreeting(new Date().getHours());
        });
    }

    // Color scheme dropdown handler
    const colorSchemeSelect = document.getElementById('color-scheme-select');
    if (colorSchemeSelect) {
        colorSchemeSelect.addEventListener('change', (e) => {
            applyColorScheme(e.target.value);
        });
    }

    // Weather location input handler
    const locationInput = document.getElementById('setting-weather-location');
    if (locationInput) {
        locationInput.addEventListener('input', (e) => {
            saveSettings('weatherLocation', e.target.value);
        });

        // Update weather when user finishes typing (on blur)
        locationInput.addEventListener('blur', () => {
            updateWeather();
        });
    }

    // OpenWeather API key input handler
    const apiKeyInput = document.getElementById('setting-weather-api-key');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('input', (e) => {
            saveSettings('openWeatherApiKey', e.target.value.trim());
        });

        // Update weather when user finishes typing (on blur)
        apiKeyInput.addEventListener('blur', () => {
            updateWeather();
        });
    }

    // WAQI API key input handler
    const waqiKeyInput = document.getElementById('setting-waqi-api-key');
    if (waqiKeyInput) {
        waqiKeyInput.addEventListener('input', (e) => {
            saveSettings('waqiApiKey', e.target.value.trim());
        });

        waqiKeyInput.addEventListener('blur', () => {
            updateWeather();
        });
    }

    // Todo add handler
    const addTodoBtn = document.getElementById('add-todo-btn');
    const newTodoInput = document.getElementById('new-todo-input');
    if (addTodoBtn && newTodoInput) {
        addTodoBtn.addEventListener('click', addTodo);
        newTodoInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTodo();
            }
        });
    }

    // Search engine checkboxes are handled by renderSearchEngineSettings()

    // Add category button
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', addCategory);
    }

    // Add link button
    const addLinkBtn = document.getElementById('add-link-btn');
    if (addLinkBtn) {
        addLinkBtn.addEventListener('click', addLink);
    }

    // Category selector for links
    const linkCategorySelect = document.getElementById('link-category-select');
    if (linkCategorySelect) {
        linkCategorySelect.addEventListener('change', (e) => {
            const addLinkBtn = document.getElementById('add-link-btn');
            if (addLinkBtn) {
                addLinkBtn.disabled = !e.target.value;
            }
            renderLinksForCategory(e.target.value);
        });
    }

    updateToggleStates();
}

function populateSettingsUI() {
    // Populate name input
    const nameInput = document.getElementById('setting-name');
    if (nameInput) {
        nameInput.value = settings.userName;
    }

    // Populate color scheme dropdown
    const colorSchemeSelect = document.getElementById('color-scheme-select');
    if (colorSchemeSelect) {
        colorSchemeSelect.value = settings.colorScheme;
    }

    // Populate weather location input
    const locationInput = document.getElementById('setting-weather-location');
    if (locationInput) {
        locationInput.value = settings.weatherLocation;
    }

    // Populate OpenWeather API key input
    const apiKeyInput = document.getElementById('setting-weather-api-key');
    if (apiKeyInput) {
        apiKeyInput.value = settings.openWeatherApiKey;
    }
    // Populate WAQI API key input
    const waqiKeyInput = document.getElementById('setting-waqi-api-key');
    if (waqiKeyInput) {
        waqiKeyInput.value = settings.waqiApiKey || '';
    }

    // Populate search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.checked = settings.enabledEngines.includes(checkbox.dataset.engine);
    });

    updateToggleStates();
}

function updateToggleStates() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const setting = btn.dataset.setting;
        const value = btn.dataset.value;
        btn.classList.toggle('active', settings[setting] === value);
    });
}

// Category management: rendering and CRUD operations for categories

function renderCategoriesSettings() {
    const container = document.getElementById('categories-list');
    const addBtn = document.getElementById('add-category-btn');

    if (!container) return;

    container.innerHTML = categories.map((category, index) => `
        <div class="category-item" data-id="${category.id}">
            <div class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></div>
            <label class="category-checkbox">
                <input type="checkbox" data-id="${category.id}" ${category.visible ? 'checked' : ''}>
            </label>
            <span class="icon-preview"><i class="${category.icon}"></i></span>
            <input type="text" class="icon-input" value="${category.icon}" placeholder="fa-solid fa-folder" data-field="icon">
            <input type="text" value="${category.name}" placeholder="Category Name" maxlength="1001" data-field="name">
            <button class="delete-btn" title="Delete Category" ${categories.length <= 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (addBtn) {
        addBtn.disabled = categories.length >= 1001;
    }

    // Bind events
    container.querySelectorAll('.category-item').forEach(item => {
        const categoryId = item.dataset.id;
        const iconPreview = item.querySelector('.icon-preview i');
        const checkbox = item.querySelector('.category-checkbox input');

        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                const cat = categories.find(c => c.id === categoryId);
                if (cat) {

                    cat.visible = e.target.checked;
                    saveCategories(categories);
                    renderLinksGrid();
                }
            });
        }

        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset.field;
                const category = categories.find(c => c.id === categoryId);
                if (category) {
                    category[field] = input.value;
                    saveCategories(categories);
                    renderLinksGrid();
                    updateLinkCategorySelect();

                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview.className = input.value || 'fa-solid fa-folder';
                    }
                }
            });
        });

        item.querySelector('.delete-btn').addEventListener('click', () => {
            if (categories.length > 1) {
                deleteCategory(categoryId);
            }
        });
    });

    // Enable drag-and-drop in settings categories list
    initDragAndDropSettings();
}

function addCategory() {
    if (categories.length >= 1001) return;

    const newId = 'cat_' + Date.now();
    categories.push({
        id: newId,
        name: 'New Category',
        icon: 'fa-solid fa-folder'
    });
    links[newId] = [];

    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}

function deleteCategory(categoryId) {
    categories = categories.filter(c => c.id !== categoryId);
    delete links[categoryId];

    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}

// Link management: render, add, edit, delete links; keep `links` in sync with localStorage

// Extract and format a clean domain name from a URL for autofill
function getNameFromUrl(url) {
    try {
        const hostname = new URL(url).hostname;
        const parts = hostname.replace(/^www\./, '').split('.');
        let name = "";

        if (parts.length >= 2) {
            // Example: gemini.google.com -> Google Gemini
            // Example: mail.google.com -> Google Mail
            const domain = parts[parts.length - 2];
            const subdomain = parts[0];

            if (parts.length > 2 && subdomain !== 'www') { // Check for actual subdomain
                name = `${domain.charAt(0).toUpperCase() + domain.slice(1)} ${subdomain.charAt(0).toUpperCase() + subdomain.slice(1)}`;
            } else { // No significant subdomain or just www
                name = domain.charAt(0).toUpperCase() + domain.slice(1);
            }
        } else {
            // Fallback for simple domains like example.com
            name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }
        return name;
    } catch (e) {
        return ""; // Return empty for invalid URLs
    }
}

function renderLinksSettings() {
    updateLinkCategorySelect();
    const select = document.getElementById('link-category-select');
    if (select && select.value) {
        renderLinksForCategory(select.value);
    } else {
        const container = document.getElementById('links-list');
        if (container) container.innerHTML = '';
    }
}

function updateLinkCategorySelect() {
    const select = document.getElementById('link-category-select');
    if (!select) return;

    const currentValue = select.value;

    select.innerHTML = '<option value="">-- Select a category --</option>' +
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    if (categories.find(c => c.id === currentValue)) {
        select.value = currentValue;
    }
}

function renderLinksForCategory(categoryId) {
    const container = document.getElementById('links-list');
    const addBtn = document.getElementById('add-link-btn');

    if (!container) return;

    if (!categoryId) {
        container.innerHTML = '';
        if (addBtn) addBtn.disabled = true;
        return;
    }

    const categoryLinks = links[categoryId] || [];

    container.innerHTML = categoryLinks.map((link, index) => `
        <div class="link-item" data-index="${index}" data-link-id="${link.id}">
            <div class="drag-handle" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></div>
            <button class="visibility-toggle ${link.visible === false ? 'hidden' : ''}" title="${link.visible === false ? 'Show link' : 'Hide link'}" data-index="${index}">
                <i class="fa-solid ${link.visible === false ? 'fa-eye-slash' : 'fa-eye'}"></i>
            </button>
            <span class="icon-preview"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
            <input type="text" class="icon-input" value="${link.icon || 'fa-solid fa-link'}" placeholder="icon class" data-field="icon" title="Icon Class">
            <input type="text" value="${link.name}" placeholder="Link Name" maxlength="1001" data-field="name" title="Link Name">
            <input type="url" class="url-input" value="${link.url}" placeholder="https://..." data-field="url" title="URL">
            <button class="delete-btn" title="Delete Link">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (addBtn) {
        addBtn.disabled = categoryLinks.length >= 1001;
    }

    // Bind events
    container.querySelectorAll('.link-item').forEach(item => {
        const index = parseInt(item.dataset.index);
        const linkId = item.dataset.linkId;
        const linkObj = categoryLinks[index];
        const iconPreview = item.querySelector('.icon-preview i');
        const visBtn = item.querySelector('.visibility-toggle');
        const nameInput = item.querySelector('input[data-field="name"]');

        if (!linkObj) return;

        // Track if the user has manually edited the name field
        let nameEdited = linkObj.name !== '';

        if (visBtn) {
            visBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                linkObj.visible = linkObj.visible === false ? true : false;
                saveLinks(links);
                renderLinksForCategory(categoryId);
                renderLinksGrid();
            });
        }

        item.querySelectorAll('input').forEach(input => {
            const field = input.dataset.field;

            // Track manual name edits
            if (field === 'name') {
                input.addEventListener('input', () => {
                    nameEdited = true;
                });
            }

            // URL input: trigger autofill of name if not manually edited
            if (field === 'url') {
                input.addEventListener('input', () => {
                    if (links[categoryId] && links[categoryId][index]) {
                        links[categoryId][index][field] = input.value;

                        // Auto-fill name only if user hasn't manually edited it
                        if (!nameEdited && nameInput) {
                            const autoName = getNameFromUrl(input.value);
                            if (autoName) {
                                nameInput.value = autoName;
                                links[categoryId][index].name = autoName;
                            }
                        }

                        saveLinks(links);
                        renderLinksGrid();
                    }
                });
            } else {
                input.addEventListener('input', () => {
                    if (links[categoryId] && links[categoryId][index]) {
                        links[categoryId][index][field] = input.value;
                        saveLinks(links);
                        renderLinksGrid();

                        // Update icon preview
                        if (field === 'icon' && iconPreview) {
                            iconPreview.className = input.value || 'fa-solid fa-link';
                        }
                    }
                });
            }
        });
        item.querySelector('.delete-btn').addEventListener('click', () => {
            deleteLink(categoryId, index);
        });
    });

    // Initialize drag-and-drop for the links list in settings
    initDragAndDropSettings();
}

function addLink() {
    const select = document.getElementById('link-category-select');
    const categoryId = select ? select.value : null;
    if (!categoryId) return;

    if (!links[categoryId]) {
        links[categoryId] = [];
    }

    if (links[categoryId].length >= 1001) return;

    const newId = 'link_' + Math.random().toString(36).substr(2, 9);
    links[categoryId].push({
        id: newId,
        name: '', // Start with empty name to allow autofill
        url: 'https://',
        icon: 'fa-solid fa-link',
        visible: true
    });

    saveLinks(links);
    renderLinksForCategory(categoryId);
    renderLinksGrid();
}

function deleteLink(categoryId, index) {
    if (links[categoryId]) {
        links[categoryId].splice(index, 1);
        saveLinks(links);
        renderLinksForCategory(categoryId);
        renderLinksGrid();
    }
}

// ========================================
// Social Links Management
// ========================================

const defaultSocialPlatforms = [
    { name: 'Facebook', icon: 'fa-brands fa-facebook', visible: false, url: '' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', visible: false, url: '' },
    { name: 'Twitter/X', icon: 'fa-brands fa-x-twitter', visible: false, url: '' },
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin', visible: false, url: '' },
    { name: 'GitHub', icon: 'fa-brands fa-github', visible: false, url: '' },
    { name: 'YouTube', icon: 'fa-brands fa-youtube', visible: false, url: '' },
    { name: 'TikTok', icon: 'fa-brands fa-tiktok', visible: false, url: '' },
    { name: 'Discord', icon: 'fa-brands fa-discord', visible: false, url: '' },
    { name: 'Reddit', icon: 'fa-brands fa-reddit-alien', visible: false, url: '' },
    { name: 'Mastodon', icon: 'fa-brands fa-mastodon', visible: false, url: '' }
];

function initializeSocialLinks() {
    if (!settings.socialLinks || settings.socialLinks.length === 0) {
        settings.socialLinks = JSON.parse(JSON.stringify(defaultSocialPlatforms));
        saveSettings('socialLinks', settings.socialLinks);
    }
}

function renderSocialLinksSettings() {
    const container = document.getElementById('social-links-list');
    if (!container) return;

    if (!settings.socialLinks || settings.socialLinks.length === 0) {
        initializeSocialLinks();
    }

    container.innerHTML = settings.socialLinks.map((social, index) => `
        <div class="social-link-item" data-index="${index}">
            <label class="social-checkbox">
                <input type="checkbox" ${social.visible ? 'checked' : ''} data-index="${index}">
            </label>
            <span class="icon-preview"><i class="${social.icon}"></i></span>
            <span class="social-name">${social.name}</span>
            <input type="url" class="social-url-input" value="${social.url || ''}" placeholder="https://..." data-index="${index}">
        </div>
    `).join('');

    // Bind events
    container.querySelectorAll('.social-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            settings.socialLinks[index].visible = e.target.checked;
            saveSettings('socialLinks', settings.socialLinks);
            updateFooter();
        });
    });

    container.querySelectorAll('.social-url-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            settings.socialLinks[index].url = e.target.value;
            saveSettings('socialLinks', settings.socialLinks);
            updateFooter();
        });
    });
}

// ========================================
// Footer Settings Management
// ========================================

function renderFooterSettings() {
    // Update dropdowns
    const footerLeftSelect = document.getElementById('footer-left-select');
    const footerCenterSelect = document.getElementById('footer-center-select');
    const footerRightSelect = document.getElementById('footer-right-select');

    if (footerLeftSelect) {
        footerLeftSelect.value = settings.footerLeft;
        footerLeftSelect.addEventListener('change', (e) => {
            saveSettings('footerLeft', e.target.value);
            updateFooter();
        });
    }

    if (footerCenterSelect) {
        footerCenterSelect.value = settings.footerCenter;
        footerCenterSelect.addEventListener('change', (e) => {
            saveSettings('footerCenter', e.target.value);
            updateFooter();
        });
    }

    if (footerRightSelect) {
        footerRightSelect.value = settings.footerRight;
        footerRightSelect.addEventListener('change', (e) => {
            saveSettings('footerRight', e.target.value);
            updateFooter();
        });
    }
}

// ========================================
// Keyboard Shortcuts
// ========================================

function handleKeyboard(event) {
    const settingsOverlay = document.getElementById('settings-overlay');
    const isSettingsOpen = settingsOverlay && settingsOverlay.classList.contains('active');

    if (event.key === '/' && document.activeElement !== searchInput && !isSettingsOpen) {
        event.preventDefault();
        if (searchInput) searchInput.focus();
    }

    if (event.key === 'Escape' && searchInput) {
        searchInput.value = '';
        searchInput.blur();
    }

    // Dynamic engine switching based on enabled engines
    if (document.activeElement !== searchInput && !isSettingsOpen) {
        const num = parseInt(event.key);
        if (num >= 1 && num <= settings.enabledEngines.length) {
            setSearchEngine(settings.enabledEngines[num - 1]);
        }
    }
}

// ========================================
// Event Listeners
// ========================================

function initEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = searchInput.value;
                if (!executeCommand(value)) {
                    performSearch(value);
                } else {
                    searchInput.value = '';
                }
            }
        });
    }

    document.addEventListener('keydown', handleKeyboard);

    // Backup & Restore buttons
    const backupBtn = document.getElementById('backup-button');
    const restoreBtn = document.getElementById('restore-button');
    const restoreFileInput = document.getElementById('restore-file-input');

    if (backupBtn) {
        backupBtn.addEventListener('click', exportSettings);
    }

    if (restoreBtn && restoreFileInput) {
        restoreBtn.addEventListener('click', () => {
            restoreFileInput.click();
        });

        restoreFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                importSettings(file);
                // Reset input so same file can be selected again
                e.target.value = '';
            }
        });
    }
}

// ========================================
// Command palette
// ========================================

const commands = {
    'theme dark': () => applyTheme('dark'),
    'theme light': () => applyTheme('light'),
    'new tab': () => window.open('about:blank', '_blank'),
    'github': () => window.location.href = 'https://github.com',
    'settings': () => document.getElementById('settings-overlay').classList.add('active'),
};

function executeCommand(input) {
    const cmd = input.toLowerCase().trim();
    if (cmd.startsWith(':')) {
        const command = cmd.slice(1);
        if (commands[command]) {
            commands[command]();
            return true;
        }
    }
    return false;
}

// Initialization: wire up DOM references, render initial UI, and start timers

function init() {
    // Get DOM elements
    searchInput = document.getElementById('search');
    timeElement = document.getElementById('time');
    dateElement = document.getElementById('date');
    greetingElement = document.getElementById('greeting');
    weatherElement = document.getElementById('weather');
    quoteElement = document.getElementById('quote');
    linksGrid = document.getElementById('links-grid');

    // Hide "New Window" option on Safari (it behaves the same as "New Tab")
    if (isSafari) {
        const newWindowBtn = document.getElementById('new-window-btn');
        if (newWindowBtn) {
            newWindowBtn.style.display = 'none';
            // If current setting is 'new-window', change it to 'new-tab'
            if (settings.linkBehavior === 'new-window') {
                saveSettings('linkBehavior', 'new-tab');
            }
        }
    }

    // Render dynamic content
    renderLinksGrid();
    renderSearchEngines();

    // Update time immediately and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Add click handler to time element to toggle format
    if (timeElement) {
        timeElement.style.cursor = 'pointer';
        timeElement.title = 'Click to toggle time format';
        timeElement.addEventListener('click', () => {
            const newFormat = settings.timeFormat === '12' ? '24' : '12';
            saveSettings('timeFormat', newFormat);
            updateDateTime();
            updateToggleStates();
        });
    }

    // Update weather
    updateWeather();
    setInterval(updateWeather, 600000);

    // Set random quote
    updateQuote();

    // Update footer layout
    updateFooter();

    // Init Sidebar
    renderTodoSidebar();

    // Restore preferred search engine
    if (settings.enabledEngines.includes(settings.preferredEngine)) {
        setSearchEngine(settings.preferredEngine);
    } else if (settings.enabledEngines.length > 0) {
        setSearchEngine(settings.enabledEngines[0]);
    }

    // Initialize event listeners
    initEventListeners();

    // Initialize settings
    initSettings();

    // Focus search input after a brief delay
    setTimeout(() => {
        if (searchInput) searchInput.focus();
    }, 700);

    // Initialize Autocomplete
    initAutocomplete();
}

// Drag & drop (SortableJS) integration
// - Reorders categories and links on the main grid
// - Supports cross-category moves for links
// - Persists resulting order to localStorage via `saveCategories` / `saveLinks`

function initDragAndDropMain() {
    if (typeof Sortable === 'undefined') return;

    // Categories reorder on main grid
    try {
        Sortable.create(linksGrid, {
            animation: 150,
            handle: '.group-title',
            draggable: 'section.link-group',
            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            onEnd: function (evt) {
                // Rebuild categories order based on DOM
                const newOrder = Array.from(document.querySelectorAll('#links-grid .link-group')).map(el => el.dataset.category);
                categories = newOrder.map(id => categories.find(c => c.id === id)).filter(Boolean);
                saveCategories(categories);
                renderCategoriesSettings();
            }
        });
    } catch (e) {
        console.warn('Could not init category Sortable on main grid', e);
    }

    // Per-category links: allow moving between categories
    document.querySelectorAll('#links-grid .link-group .links').forEach(container => {
        try {
            Sortable.create(container, {
                group: 'links',
                animation: 150,
                draggable: '.link-card',
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                onAdd: function (evt) {
                    const fromGroup = evt.from.closest('.link-group').dataset.category;
                    const toGroup = evt.to.closest('.link-group').dataset.category;
                    const linkId = evt.item.dataset.linkId;
                    if (!linkId) return;

                    // Remove from source
                    const srcArr = links[fromGroup] || [];
                    const linkObjIndex = srcArr.findIndex(l => l.id === linkId);
                    if (linkObjIndex === -1) return;
                    const [moved] = srcArr.splice(linkObjIndex, 1);

                    // Insert into destination at new index
                    const destArr = links[toGroup] || (links[toGroup] = []);
                    destArr.splice(evt.newIndex, 0, moved);

                    saveLinks(links);
                    renderLinksSettings();
                },
                onUpdate: function (evt) {
                    // Reorder within same category
                    const groupId = evt.from.closest('.link-group').dataset.category;
                    const arr = links[groupId] || [];
                    // Build new order from DOM
                    const newOrder = Array.from(evt.from.querySelectorAll('.link-card')).map(a => a.dataset.linkId);
                    links[groupId] = newOrder.map(id => arr.find(l => l.id === id)).filter(Boolean);
                    saveLinks(links);
                    renderLinksSettings();
                }
            });
        } catch (e) {
            console.warn('Could not init Sortable for links container', e);
        }
    });
}

function initDragAndDropSettings() {
    if (typeof Sortable === 'undefined') return;

    // Categories list in settings
    const catsContainer = document.getElementById('categories-list');
    if (catsContainer) {
        try {
            Sortable.create(catsContainer, {
                animation: 150,
                handle: '.drag-handle',
                draggable: '.category-item',
                ghostClass: 'sortable-ghost',
                onEnd: function () {
                    const newOrder = Array.from(catsContainer.querySelectorAll('.category-item')).map(el => el.dataset.id);
                    categories = newOrder.map(id => categories.find(c => c.id === id)).filter(Boolean);
                    saveCategories(categories);
                    renderLinksGrid();
                }
            });
        } catch (e) {
            console.warn('Could not init Sortable for settings categories', e);
        }
    }

    // Links list in settings (only for selected category)
    const linksContainer = document.getElementById('links-list');
    if (linksContainer) {
        try {
            Sortable.create(linksContainer, {
                animation: 150,
                handle: '.drag-handle',
                draggable: '.link-item',
                ghostClass: 'sortable-ghost',
                onEnd: function () {
                    const select = document.getElementById('link-category-select');
                    const catId = select ? select.value : null;
                    if (!catId) return;
                    const newOrder = Array.from(linksContainer.querySelectorAll('.link-item')).map(el => el.dataset.linkId);
                    const arr = links[catId] || [];
                    links[catId] = newOrder.map(id => arr.find(l => l.id === id)).filter(Boolean);
                    saveLinks(links);
                    renderLinksGrid();
                    renderLinksForCategory(catId);
                }
            });
        } catch (e) {
            console.warn('Could not init Sortable for settings links', e);
        }
    }
}

// ========================================
// Backup & Restore Functions
// ========================================

function exportSettings() {
    // Gather all data
    const exportData = {
        version: '1.1.0',
        exportDate: new Date().toISOString(),
        settings: {
            userName: localStorage.getItem('userName'),
            colorScheme: localStorage.getItem('colorScheme'),
            theme: localStorage.getItem('theme'),
            colorMode: localStorage.getItem('colorMode'),
            timeFormat: localStorage.getItem('timeFormat'),
            showSeconds: localStorage.getItem('showSeconds'),
            tempUnit: localStorage.getItem('tempUnit'),
            showQuotes: localStorage.getItem('showQuotes'),
            enabledEngines: localStorage.getItem('enabledEngines'),
            preferredEngine: localStorage.getItem('preferredEngine'),
            weatherLocation: localStorage.getItem('weatherLocation'),
            openWeatherApiKey: localStorage.getItem('openWeatherApiKey'),
            waqiApiKey: localStorage.getItem('waqiApiKey'),
            linkBehavior: localStorage.getItem('linkBehavior'),
            showKeyboardHints: localStorage.getItem('showKeyboardHints'),
            footerLeft: localStorage.getItem('footerLeft'),
            footerCenter: localStorage.getItem('footerCenter'),
            footerRight: localStorage.getItem('footerRight'),
            socialLinks: localStorage.getItem('socialLinks')
        },
        categories: localStorage.getItem('categories'),
        links: localStorage.getItem('links')
    };

    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `startpage-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show confirmation
    showNotification('Settings exported successfully!', 'success');
}

function validateImportData(data) {
    if (!data || typeof data !== 'object') return false;
    if (!data.version || !data.settings) return false;
    
    // Basic settings structure validation
    const requiredSettings = ['theme', 'colorScheme', 'preferredEngine'];
    for (const key of requiredSettings) {
        if (data.settings[key] === undefined && localStorage.getItem(key) === null) {
            console.warn(`Missing required setting: ${key}`);
            // We can still proceed if some are missing, but this is a red flag
        }
    }
    
    // Validate categories and links if present
    if (data.categories) {
        try {
            const cats = JSON.parse(data.categories);
            if (!Array.isArray(cats)) return false;
        } catch (e) { return false; }
    }
    
    if (data.links) {
        try {
            const lnks = JSON.parse(data.links);
            if (typeof lnks !== 'object') return false;
        } catch (e) { return false; }
    }
    
    return true;
}

function importSettings(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const importData = JSON.parse(e.target.result);

            // Validate data structure
            if (!validateImportData(importData)) {
                throw new Error('Invalid or corrupted backup file format');
            }

            // Confirm before overwriting
            if (!confirm('This will replace all your current settings, categories, and links. Continue?')) {
                return;
            }

            // Import settings
            Object.entries(importData.settings).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    localStorage.setItem(key, value);
                }
            });

            // Import categories and links
            if (importData.categories) {
                localStorage.setItem('categories', importData.categories);
            }
            if (importData.links) {
                localStorage.setItem('links', importData.links);
            }

            // Show success message and reload
            showNotification('Settings imported successfully! Reloading...', 'success');
            setTimeout(() => {
                location.reload();
            }, 1500);

        } catch (error) {
            showNotification('Error importing settings: ' + error.message, 'error');
        }
    };

    reader.readAsText(file);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--surface0);
        border: 1px solid var(--${type === 'success' ? 'green' : type === 'error' ? 'red' : 'primary'});
        border-radius: var(--radius-md);
        color: var(--text);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// Start the application
// ========================================

document.addEventListener('DOMContentLoaded', init);

// ========================================
// Autocomplete Functions
// ========================================

const autocompleteList = document.getElementById('autocomplete-list');
let currentFocus = -1;
let originalQuery = '';

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const context = this;
        const later = () => {
            clearTimeout(timeout);
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// JSONP helper
function jsonp(url, callbackName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const name = callbackName || 'jsonp_callback_' + Math.round(100000 * Math.random());

        if (url.match(/\?/)) url += '&callback=' + name;
        else url += '?callback=' + name;

        window[name] = function (data) {
            delete window[name];
            document.body.removeChild(script);
            resolve(data);
        };

        script.src = url;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function closeAutocomplete() {
    if (autocompleteList) {
        autocompleteList.innerHTML = '';
        currentFocus = -1;
        originalQuery = '';
    }
}

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) {
        currentFocus = -1;
        if (searchInput) searchInput.value = originalQuery;
        return;
    }
    if (currentFocus < -1) {
        currentFocus = (x.length - 1);
    }
    
    if (currentFocus === -1) {
        if (searchInput) searchInput.value = originalQuery;
        return;
    }

    x[currentFocus].classList.add("active");
    // Scroll to active item if needed
    x[currentFocus].scrollIntoView({ block: 'nearest' });
    
    // Update input field with the active suggestion
    if (searchInput) {
        const suggestionSpan = x[currentFocus].querySelector('span');
        if (suggestionSpan) {
            searchInput.value = suggestionSpan.textContent;
        }
    }
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }
}

async function fetchSuggestions(query) {
    console.log("Fetching suggestions for:", query);
    if (!query) {
        closeAutocomplete();
        return;
    }
    
    // Store the user's typed query
    originalQuery = query;

    // Only use Google suggestions if Google is the current engine (optional, but makes sense for "Google Autocomplete")
    // For now, we'll use it generally or check currentEngine. 
    // The user asked for "Google Search Autocomplete", implying the source is Google.

    try {
        console.log("Sending JSONP request...");
        const data = await jsonp(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`);
        console.log("JSONP response:", data);
        // data format: ["query", ["suggestion1", "suggestion2", ...]]
        if (data && data[1]) {
            renderSuggestions(data[1]);
        }
    } catch (e) {
        console.error("Autocomplete error:", e);
    }
}

function renderSuggestions(suggestions) {
    if (!autocompleteList) return;
    autocompleteList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> <span>${suggestion}</span>`; // simple bolding could be added here
        div.addEventListener('click', function () {
            if (searchInput) {
                searchInput.value = suggestion;
                performSearch(suggestion);
                closeAutocomplete();
            }
        });
        autocompleteList.appendChild(div);
    });
}

// Attach event listeners to search input
function initAutocomplete() {
    if (searchInput) {
        // Input event for fetching suggestions
        searchInput.addEventListener('input', debounce(function (e) {
            currentFocus = -1; // Reset focus on new input
            fetchSuggestions(e.target.value);
        }, 200)); // 200ms debounce

        // Keydown for navigation
        searchInput.addEventListener('keydown', function (e) {
            let x = autocompleteList ? autocompleteList.getElementsByTagName('div') : null;
            if (e.key === "ArrowDown") {
                currentFocus++;
                addActive(x);
            } else if (e.key === "ArrowUp") {
                currentFocus--;
                addActive(x);
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                } else {
                    performSearch(this.value);
                    closeAutocomplete();
                }
            } else if (e.key === "Escape") {
                closeAutocomplete();
            }
        });

        // Close when clicking elsewhere
        document.addEventListener("click", function (e) {
            if (e.target !== searchInput && e.target !== autocompleteList) {
                closeAutocomplete();
            }
        });
    }
}
