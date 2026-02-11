// Traducciones
const i18n = {
    es: { notes: "Notas", links: "Links", discovery: "Descubrimiento", calendar: "Calendario" },
    en: { notes: "Notes", links: "Links", discovery: "Discovery", calendar: "Calendar" },
    zh: { notes: "笔记", links: "链接", discovery: "发现", calendar: "日历" }
    // ... completar Filipino, Malayo, Hindú
};

let currentLang = 'es';

function changeLang() {
    currentLang = document.getElementById('lang-selector').value;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = i18n[currentLang][key];
    });
}

// Lógica de Guardado Estilo Pocket (Share Target)
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    if(params.get('url')) {
        document.getElementById('share-modal').style.display = 'block';
        document.getElementById('share-url-text').innerText = params.get('url');
    }
    renderDashPhrases();
    fetchDiscoveryNews();
};

function confirmQuickSave() {
    const params = new URLSearchParams(window.location.search);
    const url = params.get('url');
    const title = params.get('title') || "Guardado rápido";
    
    saveLinkToVico(title, url);
    
    const confirm = document.getElementById('save-confirm');
    confirm.style.display = 'block';
    
    setTimeout(() => {
        // Cierra la App automáticamente en Android
        window.close();
    }, 2500);
}

// Función TTS (Text to Speech) para noticias
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = currentLang === 'es' ? 'es-ES' : 'en-US';
    window.speechSynthesis.speak(speech);
}

// Discovery Avanzado con fuentes múltiples
async function fetchDiscoveryNews() {
    const cat = document.getElementById('discovery-cat').value;
    const container = document.getElementById('discovery-container');
    container.innerHTML = "<p class='text-center p-10 animate-pulse'>Sincronizando fuentes...</p>";

    // Simulación de 10 fuentes (Wired, Xataka, Nvidia News, Ainewsup, etc.)
    const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.wired.com/feed/rss`);
    const data = await res.json();

    container.innerHTML = data.items.map(item => `
        <div class="keep-card glass mb-4 p-3">
            <img src="${item.thumbnail || 'icon.png'}" class="centered">
            <h4 class="text-xs font-bold">${item.title}</h4>
            <div class="flex gap-2 mt-2">
                <button onclick="speakText('${item.title}')" class="bg-blue-500/20 p-2 rounded-lg text-[10px]"><i class="fa-solid fa-volume-high"></i> TTS</button>
                <button onclick="window.open('${item.link}')" class="bg-blue-500 p-2 rounded-lg text-[10px]">LEER MÁS</button>
                <button onclick="saveLinkToVico('${item.title}', '${item.link}')" class="bg-green-600 p-2 rounded-lg text-[10px]">GUARDAR</button>
            </div>
        </div>
    `).join('');
}

// Análisis 2.0 - Gráficos con detalles internos
function updateCharts(dataIA) {
    // Implementación de Chart.js con drawCallback para escribir países/fechas dentro del doughnut
    // Reparación botón extender
    document.getElementById('extend-btn').onclick = () => extendAnalysisIA(dataIA.originalPrompt);
}

// Sistema de Notificaciones Calendario
function addReminder() {
    const date = document.getElementById('cal-date').value;
    const text = document.getElementById('cal-text').value;
    
    if (Notification.permission === "granted") {
        const timeDiff = new Date(date).getTime() - new Date().getTime();
        setTimeout(() => {
            new Notification("VICO Recordatorio", { body: text, icon: 'icon.png' });
            playSoftSound();
        }, timeDiff);
    }
}
