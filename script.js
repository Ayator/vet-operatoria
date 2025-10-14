// ---- File structure mapping by unit ----
const fileStructure = {
    clase01: [
        "Presentación clase 1"
    ],
    clase02: [
        "Clase 2 - Exploración Física del Paciente"
    ],
    clase03: [
        "Presentación clase 3 - Anemia Infecciosa Equina"
    ],
    clase04: [
        "Presentación clase n° 4 - Influenza Equina",
        "Presentación clase - Hemorragia pulmonar inducida por ejercicio",
        "Congestión, edema, enfisema pulmonar y asma equina"
    ],
    clase05: [
        "Presentación clase 5 - Leptospirosis equina"
    ],
    clase06: [
        "Afecciones del aparato genitourinario"
    ],
    clase07: [
        "Presentación Clase 7 - Piroplasmosis equina",
        "Presentación clase 7 - Tripanosomiasis equina"
    ],
    clase08: [
        "Presentación clase 8 - Uveitis Recurrente Equina"
    ],
    clase09: [
        "Presentación clase 9 - Poliartritis de los potrillos septicemia neonatal"
    ],
    clase10: [
        "Presentación clase Nro. 10 - Tétanos"
    ],
    clase11: [
        "Presentación clase 11 - Azoturia y Envaradura"
    ],
    clase16: [
        "Presentación clase 16 - Repaso de clases prácticas"
    ],
    clase17: [
        "Cólico Equino",
        "Síndrome ulcerativo gástrico equino",
        "Enfermedades del Aparato Digestivo"
    ],
    clase18: [
        "Presentación Clase 18 - Encefalomielitis equina",
        "Presentación clase 18 - Parasitosis gastrointestinal del equino",
        "Presentación clase 18 - Afecciones del Casco",
        "Presentación Enfermedad del músculo blanco en equinos"
    ],
    clase20: [
        "Clase Nro. 20 - Tendinitis y Desmitis"
    ],
    clase21: [
        "Presentación clase 21 - Desvasado y colocación de herraduras"
    ]
};


let currentFile = null;
let currentUnit = null;

// DOM elements
const appContainer = document.getElementById('appContainer');
const sidebarToggle = document.getElementById('minimizeSidebarBtn');
const collapseBtn = document.getElementById('collapseBtn');
const unitSelect = document.getElementById('unitSelect');
const fileList = document.getElementById('fileList');
const pdfViewer = document.getElementById('pdfViewer');
const pdfTitle = document.getElementById('pdfTitle');
const openBtn = document.getElementById('openBtn');
const notesEditor = document.getElementById('notesEditor');
const saveIndicator = document.getElementById('saveIndicator');

// ---- Sidebar collapse persistence ----
const COLLAPSE_KEY = 'sidebar_collapsed_state';
function setCollapsedState(collapsed) {
  if (collapsed) {
    appContainer.classList.add('sidebar-collapsed');
    sidebarToggle.innerHTML = '☰';
    sidebarToggle.title = 'Mostrar Sidebar';
  } else {
    appContainer.classList.remove('sidebar-collapsed');
    sidebarToggle.innerHTML = '✕';
    sidebarToggle.title = 'Ocultar Sidebar';
  }
  localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
}
function toggleSidebar() {
  const isCollapsed = appContainer.classList.contains('sidebar-collapsed');
  setCollapsedState(!isCollapsed);
}
sidebarToggle.addEventListener('click', toggleSidebar);
collapseBtn.addEventListener('click', toggleSidebar);

// ---- Other event listeners ----
unitSelect.addEventListener('change', loadUnit);
// summaryText.addEventListener('input', () => saveNotes('summary'));
notesEditor
&& notesEditor.addEventListener('input', () => saveNotes('notes'));

// Tabs logic
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    const tabName = e.currentTarget.getAttribute('data-tab');
    switchTab(tabName, e.currentTarget);
  });
});

// ---- Unit/File List ----
function loadUnit() {
  const selectedUnit = unitSelect.value;
  if (!selectedUnit) {
    fileList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #718096;">Selecciona una clase para ver los archivos</div>';
    return;
  }
  currentUnit = selectedUnit;
  console.log();
  const files = fileStructure[selectedUnit] || [];
  fileList.innerHTML = '';
  files.forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.textContent = file;
    fileItem.addEventListener('click', (e) => {
      document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
      e.currentTarget.classList.add('active');
      loadPDF(file, selectedUnit);
    });
    fileList.appendChild(fileItem);
  });
}

// ---- PDF Loader ----
function loadPDF(filename, unit) {
  currentFile = filename;
  currentUnit = unit;
  const pdfPath = `./${unit}/${filename}.pdf`;
  pdfTitle.textContent = filename;
  pdfViewer.innerHTML = `<iframe src="${pdfPath}" class="pdf-viewer" type="application/pdf"></iframe>`;
  openBtn.disabled = false;
  openBtn.onclick = () => window.open(pdfPath, '_blank');
  saveCurrentPdfState(currentUnit, currentFile)
  loadPdfNotes();
}

// ---- Switch notes tab ----
function switchTab(tabName, tabEl) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    if (tabEl) tabEl.classList.add('active');
    const content = document.getElementById(`${tabName}-tab`);
    if (content) content.classList.add('active');
    // save last tab for reload
    saveCurrentTabState(tabName);
}

// ---- Notes persistence ----
function saveNotes(type) {
    if (!currentFile || !currentUnit) return;
    const key = `notes_${currentUnit}_${currentFile}`;
    const existingData = JSON.parse(localStorage.getItem(key) || '{}');
    if (type === "notes") {
        existingData[type] = document.getElementById('notesEditor').innerHTML;
    } else {
        // summary etc.
        existingData[type] = document.getElementById(`${type}Text`).value;
    }
    localStorage.setItem(key, JSON.stringify(existingData));
    showSaveIndicator();
}
function loadNotes() {
    if (!currentFile || !currentUnit) return;
    const key = `notes_${currentUnit}_${currentFile}`;
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    document.getElementById('notesEditor').innerHTML = data.notes || '';
    // summary, etc.
}
function showSaveIndicator() {
  saveIndicator.classList.add('show');
  setTimeout(() => saveIndicator.classList.remove('show'), 2000);
}

document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const cmd = btn.dataset.cmd;
        if (cmd === 'foreColor' || cmd === 'backColor') {
            document.execCommand(cmd, false, btn.dataset.color);
        } else if (cmd === 'formatBlock') {
            document.execCommand(cmd, false, btn.dataset.tag);
        } else if (!cmd && btn.id === "clearFormatBtn") {
            document.execCommand('removeFormat', false, null);
            document.execCommand('formatBlock', false, 'P'); // Normalize as paragraph
        } else {
            document.execCommand(cmd, false, null);
        }
        document.getElementById("notesEditor").focus();
    });
});


// Helper to get data for current file
function getPdfData() {
  if (!currentFile || !window.DATA) return null;
  return DATA[currentFile] || null;
}

function renderTOC() {
  const tocTab = document.getElementById('toc-tab');
  const pdfData = getPdfData();
  if (!pdfData?.TableOfContents) {
    tocTab.innerHTML = "<em>Sin datos.</em>";
    return;
  }
  // Render sections and subsections as a nested list
    tocTab.innerHTML = pdfData.TableOfContents.map(section =>
        `<div class="toc-section">
            <span class="toc-title">${section.section}</span>
            <ul class="toc-sublist">
                ${section.subsections.map(sub => `<li>${sub.replace(/\n/g, "<br>")}</li>`).join("")}
            </ul>
        </div>`
    ).join("");
}

function renderMentalMap() {
    const mmTab = document.getElementById('mentalmap-tab');
    const pdfData = getPdfData();
    if (!pdfData?.MentalMap) {
        mmTab.innerHTML = "Sin datos.";
        return;
    }
    mmTab.innerHTML = pdfData.MentalMap.replace(/\n/g, '<br>');
}

function renderGlossary() {
    const glossaryTab = document.getElementById('glossary-tab');
    const pdfData = getPdfData();
    // Defensive: handle both array and object form
    let glossaryArr = [];
    if (!pdfData?.Glossary) {
        glossaryTab.innerHTML = "<em>Sin datos.</em>";
        return;
    }
    if (Array.isArray(pdfData.Glossary)) {
        glossaryArr = pdfData.Glossary;
    } else if (typeof pdfData.Glossary === "object") {
        glossaryArr = Object.entries(pdfData.Glossary).map(([term, definition]) => ({term, definition}));
    }
    if (glossaryArr.length === 0) {
        glossaryTab.innerHTML = "<em>Sin datos.</em>";
        return;
    }
    // Sort alphabetically by term (case-insensitive)
    glossaryArr.sort((a, b) => a.term.localeCompare(b.term, undefined, { sensitivity: 'base' }));

    glossaryTab.innerHTML = `
    <table class="glossary-table">
      <tbody>
        ${glossaryArr.map(item => `
          <tr>
            <td><strong>${item.term}</strong></td>
            <td>${item.definition.replace(/\n/g, "<br>")}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// Call these whenever you load a PDF:
function loadPdfNotes() {
  renderTOC();
  renderMentalMap();
  renderGlossary();
  // loadNotes for personal notes
  loadNotes();
}

// Save on PDF/file select and on unit select
function saveCurrentPdfState(unit, filename) {
    localStorage.setItem("lastUnit", unit);
    localStorage.setItem("lastFile", filename);
}

// Save on tab switch
function saveCurrentTabState(tabName) {
    localStorage.setItem("lastNotesTab", tabName);
}

const mainContent = document.querySelector('.main-content');
const resizer = document.getElementById('resizer');
let isDragging = false;
const dragOverlay = document.getElementById('dragOverlay');


function isPortrait() {
    return window.innerWidth <= 900;
}

// Portrait mode vertical drag
resizer.addEventListener('mousedown', function(e) {
    if (!isPortrait()) return;
    isDragging = true;
    document.body.style.cursor = 'ns-resize';
    dragOverlay.style.display = "block";
});
dragOverlay.addEventListener('mousemove', function(e) {
    if (isDragging && isPortrait()) {
        const rect = mainContent.getBoundingClientRect();
        let y = e.clientY - rect.top;
        let totalHeight = rect.height;
        // clamp
        y = Math.max(80, Math.min(totalHeight - 80, y));
        mainContent.style.setProperty('--pdf-height', y + "px");
        mainContent.style.setProperty('--notes-height', (totalHeight - y - 10) + "px");
    }
});
dragOverlay.addEventListener('mouseup', function(e) {
    if (isDragging) {
        isDragging = false;
        dragOverlay.style.display = "none";
        document.body.style.cursor = '';
        saveResizer();
    }
});

// Touch support
resizer.addEventListener('touchstart', function(e) {
    if (!isPortrait()) return;
    isDragging = true;
    document.body.style.cursor = 'ns-resize';
    dragOverlay.style.display = "block";
});
dragOverlay.addEventListener('touchmove', function(e) {
    if (isDragging && isPortrait()) {
        const rect = mainContent.getBoundingClientRect();
        const touch = e.touches[0];
        let y = touch.clientY - rect.top;
        let totalHeight = rect.height;
        y = Math.max(80, Math.min(totalHeight - 80, y));
        mainContent.style.setProperty('--pdf-height', y + "px");
        mainContent.style.setProperty('--notes-height', (totalHeight - y - 10) + "px");
    }
});
dragOverlay.addEventListener('touchend', function(e) {
    if (isDragging) {
        isDragging = false;
        dragOverlay.style.display = "none";
        document.body.style.cursor = '';
        saveResizer();
    }
});

// resizer logic
resizer.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragOverlay.style.display = "block";
    document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const rect = mainContent.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let totalWidth = rect.width;
    x = Math.max(60, Math.min(totalWidth - 60, x));
    mainContent.style.setProperty('--pdf-width', x + 'px');
    mainContent.style.setProperty('--notes-width', (totalWidth - x - 8) + 'px');
});

// Use overlay for mouseup
dragOverlay.addEventListener('mouseup', function(e) {
    if (isDragging) {
        isDragging = false;
        dragOverlay.style.display = "none";
        document.body.style.cursor = '';
        saveResizer();
    }
});

// For touch screens
resizer.addEventListener('touchstart', function(e) {
    isDragging = true;
    dragOverlay.style.display = "block";
    document.body.style.cursor = 'ew-resize';
});
dragOverlay.addEventListener('touchend', function(e) {
    if (isDragging) {
        isDragging = false;
        dragOverlay.style.display = "none";
        document.body.style.cursor = '';
        saveResizer();
    }
});
dragOverlay.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    const touch = e.touches[0];
    const rect = mainContent.getBoundingClientRect();
    let x = touch.clientX - rect.left;
    let totalWidth = rect.width;
    x = Math.max(60, Math.min(totalWidth - 60, x));
    mainContent.style.setProperty('--pdf-width', x + 'px');
    mainContent.style.setProperty('--notes-width', (totalWidth - x - 8) + 'px');
});

const pdfSection = document.querySelector('.pdf-section');
const notesSection = document.querySelector('.notes-section');
// const minimizeSidebarBtn = document.getElementById('minimizeSidebarBtn');
const minimizePDFBtn = document.getElementById('minimizePDFBtn');
const minimizeNotesBtn = document.getElementById('minimizeNotesBtn');
// const appContainer = document.getElementById('appContainer');

// // Toggle sidebar—existing logic
// minimizeSidebarBtn.addEventListener('click', () => {
//     appContainer.classList.toggle('sidebar-collapsed');
// });

// PDF viewer toggle
minimizePDFBtn.addEventListener('click', () => {
    pdfSection.classList.toggle('minimized');
    updateMainContentLayout();
});

// Notes section toggle
minimizeNotesBtn.addEventListener('click', () => {
    notesSection.classList.toggle('minimized');
    updateMainContentLayout();
});

function updateMainContentLayout() {
    mainContent.classList.remove('pdf-minimized', 'notes-minimized', 'both-minimized');
    const pdfMin = pdfSection.classList.contains('minimized');
    const notesMin = notesSection.classList.contains('minimized');
    if (pdfMin && notesMin) {
        mainContent.classList.add('both-minimized');
    } else if (pdfMin) {
        mainContent.classList.add('pdf-minimized');
    } else if (notesMin) {
        mainContent.classList.add('notes-minimized');
    }
}

function saveResizer(){// horizontal drag (landscape)
    // vertical drag (portrait)
    if (isPortrait()) {
        localStorage.setItem('pdfNotesHeight', mainContent.style.getPropertyValue('--pdf-height'));
        localStorage.setItem('pdfNotesHeightNotes', mainContent.style.getPropertyValue('--notes-height'));
    }
    else {
        localStorage.setItem('pdfNotesWidth', mainContent.style.getPropertyValue('--pdf-width'));
        localStorage.setItem('pdfNotesWidthNotes', mainContent.style.getPropertyValue('--notes-width'));
    }
}

// On load: restore from localStorage
function restoreResizer() {
    if (isPortrait()) {
        const pdfH = localStorage.getItem('pdfNotesHeight');
        const notesH = localStorage.getItem('pdfNotesHeightNotes');
        if (pdfH && notesH) {
            mainContent.style.setProperty('--pdf-height', pdfH);
            mainContent.style.setProperty('--notes-height', notesH);
        }
    } else {
        const pdfW = localStorage.getItem('pdfNotesWidth');
        const notesW = localStorage.getItem('pdfNotesWidthNotes');
        if (pdfW && notesW) {
            mainContent.style.setProperty('--pdf-width', pdfW);
            mainContent.style.setProperty('--notes-width', notesW);
        }
    }
}

window.addEventListener('resize', restoreResizer); // Optionally also on orientation switch


// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    // Restore sidebar collapse
    const savedCollapsed = localStorage.getItem(COLLAPSE_KEY) === '1';
    setCollapsedState(savedCollapsed);
    restoreResizer();

    // Restore last selected unit, file, and tab
    const lastUnit = localStorage.getItem('lastUnit');
    const lastFile = localStorage.getItem('lastFile');
    const lastTab = localStorage.getItem('lastNotesTab');

    if (lastUnit) {
        unitSelect.value = lastUnit;
        loadUnit();

        // Wait for fileList to be populated before loading file
        setTimeout(() => {
            const files = fileStructure[lastUnit] || [];
            if (lastFile && files.includes(lastFile)) {
                // Find and "click" the file to trigger load
                const fileItems = Array.from(document.querySelectorAll('.file-item'));
                const idx = files.indexOf(lastFile);
                if (fileItems[idx]) fileItems[idx].click();
            }
            // Switch notes tab
            if (lastTab) {
                const tabEl = document.querySelector(`.tab[data-tab="${lastTab}"]`);
                if (tabEl) switchTab(lastTab, tabEl);
            }
        }, 50);
    }
});
