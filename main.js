// Función Global para cambio de pestañas/módulos (SPA)
function switchTab(targetTab) {
  // 1. Ocultar todos los contenidos
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => content.classList.remove('active'));

  // 2. Desactivar clases activas en pestañas
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach(item => item.classList.remove('is-active'));

  const navTabLinks = document.querySelectorAll('.nav-tab-link');
  navTabLinks.forEach(link => link.classList.remove('is-active'));

  // 3. Activar el contenido deseado
  const activeContent = document.getElementById(`view-${targetTab}`);
  if (activeContent) {
    activeContent.classList.add('active');
  }

  // 4. Marcar botón/pestaña activa
  const activeTab = document.querySelector(`.tab-item[data-tab="${targetTab}"]`);
  if (activeTab) activeTab.classList.add('is-active');

  const activeNav = document.querySelector(`.nav-tab-link[data-target="${targetTab}"]`);
  if (activeNav) activeNav.classList.add('is-active');

  // 5. Mostrar u ocultar botón de regresar
  const backBtn = document.getElementById('backToHomeBtnContainer');
  if (backBtn) {
    backBtn.style.display = targetTab === 'grid' ? 'none' : 'block';
  }

  // Scroll suave al inicio del contenido
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {

  // Navbar Burger para Celulares
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('navbarMenu');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
    });
  }

  // --- MÓDULO 1: CONVERSOR ---
  const inputValue = document.getElementById('inputValue');
  const unitFrom = document.getElementById('unitFrom');
  const unitTo = document.getElementById('unitTo');
  const basePx = document.getElementById('basePx');
  const resultText = document.getElementById('resultText');
  const conversionFormula = document.getElementById('conversionFormula');
  const cssGeneratedCode = document.getElementById('cssGeneratedCode');

  function convertUnits() {
    const val = parseFloat(inputValue.value) || 0;
    const base = parseFloat(basePx.value) || 16;
    const from = unitFrom.value;
    const to = unitTo.value;

    // Convertir de origen a PX
    let valInPx = val;
    if (from === 'rem' || from === 'em') valInPx = val * base;
    else if (from === 'percent') valInPx = (val / 100) * base;

    // Convertir de PX a destino
    let finalResult = valInPx;
    let unitLabel = to;

    if (to === 'rem' || to === 'em') finalResult = valInPx / base;
    else if (to === 'percent') { finalResult = (valInPx / base) * 100; unitLabel = '%'; }

    const formatted = Number.isInteger(finalResult) ? finalResult : finalResult.toFixed(3);
    resultText.textContent = `${formatted} ${unitLabel}`;
    conversionFormula.textContent = `Píxeles equivalentes: ${valInPx}px (Base root: ${base}px)`;
    cssGeneratedCode.textContent = `font-size: ${formatted}${unitLabel === 'percent' ? '%' : unitLabel}; /* Equivalente a ${valInPx}px */`;
  }

  if (inputValue) {
    [inputValue, unitFrom, unitTo, basePx].forEach(el => el.addEventListener('input', convertUnits));
    convertUnits();
  }

  // --- MÓDULO 2: VERIFICADOR WCAG ---
  const textColor = document.getElementById('textColor');
  const textHex = document.getElementById('textHex');
  const bgColor = document.getElementById('bgColor');
  const bgHex = document.getElementById('bgHex');
  const wcagPreview = document.getElementById('wcagPreview');
  const contrastRatio = document.getElementById('contrastRatio');
  const statusAA = document.getElementById('statusAA');
  const statusAAA = document.getElementById('statusAAA');

  function hexToLuminance(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;
    const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function updateWCAG() {
    textHex.value = textColor.value;
    bgHex.value = bgColor.value;
    wcagPreview.style.color = textColor.value;
    wcagPreview.style.backgroundColor = bgColor.value;

    const l1 = hexToLuminance(textColor.value);
    const l2 = hexToLuminance(bgColor.value);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const ratioFormatted = ratio.toFixed(1);
    contrastRatio.textContent = `${ratioFormatted}:1`;

    if (ratio >= 4.5) {
      statusAA.textContent = "PASÓ";
      statusAA.className = "tag is-success is-large";
    } else {
      statusAA.textContent = "FALLÓ";
      statusAA.className = "tag is-danger is-large";
    }

    if (ratio >= 7.0) {
      statusAAA.textContent = "PASÓ";
      statusAAA.className = "tag is-success is-large";
    } else {
      statusAAA.textContent = "FALLÓ";
      statusAAA.className = "tag is-danger is-large";
    }
  }

  if (textColor && bgColor) {
    textColor.addEventListener('input', updateWCAG);
    bgColor.addEventListener('input', updateWCAG);
    textHex.addEventListener('change', () => { textColor.value = textHex.value; updateWCAG(); });
    bgHex.addEventListener('change', () => { bgColor.value = bgHex.value; updateWCAG(); });
    updateWCAG();
  }

  // --- MÓDULO 3: BOX MODEL ---
  const inputMargin = document.getElementById('inputMargin');
  const inputBorder = document.getElementById('inputBorder');
  const inputPadding = document.getElementById('inputPadding');
  const boxSizingSelect = document.getElementById('boxSizingSelect');
  const boxMargin = document.getElementById('boxMargin');
  const boxBorder = document.getElementById('boxBorder');
  const boxPadding = document.getElementById('boxPadding');
  const boxModelCode = document.getElementById('boxModelCode');

  function updateBoxModel() {
    const m = inputMargin.value;
    const b = inputBorder.value;
    const p = inputPadding.value;
    const sizing = boxSizingSelect.value;

    document.getElementById('valMargin').textContent = m;
    document.getElementById('valBorder').textContent = b;
    document.getElementById('valPadding').textContent = p;

    boxMargin.style.padding = `${m}px`;
    boxBorder.style.padding = `${b}px`;
    boxPadding.style.padding = `${p}px`;

    boxModelCode.textContent = `box-sizing: ${sizing};
margin: ${m}px;
border: ${b}px solid #DC2626;
padding: ${p}px;`;
  }

  if (inputMargin) {
    [inputMargin, inputBorder, inputPadding, boxSizingSelect].forEach(el => el.addEventListener('input', updateBoxModel));
    updateBoxModel();
  }

  // --- MÓDULO 4: FLEXBOX & GRID PLAYGROUND ---
  const layoutModeRadios = document.querySelectorAll('input[name="layoutMode"]');
  const flexControls = document.getElementById('flexControls');
  const gridControls = document.getElementById('gridControls');
  const layoutContainer = document.getElementById('layoutContainer');
  const flexDirection = document.getElementById('flexDirection');
  const justifyContent = document.getElementById('justifyContent');
  const alignItems = document.getElementById('alignItems');
  const gridCols = document.getElementById('gridCols');
  const gridGap = document.getElementById('gridGap');
  const layoutCssCode = document.getElementById('layoutCssCode');

  function updateLayout() {
    const mode = document.querySelector('input[name="layoutMode"]:checked').value;
    if (mode === 'flex') {
      flexControls.style.display = 'flex';
      gridControls.style.display = 'none';
      layoutContainer.style.display = 'flex';
      layoutContainer.style.gridTemplateColumns = 'none';
      layoutContainer.style.gap = '0px';

      layoutContainer.style.flexDirection = flexDirection.value;
      layoutContainer.style.justifyContent = justifyContent.value;
      layoutContainer.style.alignItems = alignItems.value;

      layoutCssCode.textContent = `display: flex;
flex-direction: ${flexDirection.value};
justify-content: ${justifyContent.value};
align-items: ${alignItems.value};`;
    } else {
      flexControls.style.display = 'none';
      gridControls.style.display = 'flex';
      layoutContainer.style.display = 'grid';

      layoutContainer.style.gridTemplateColumns = gridCols.value;
      layoutContainer.style.gap = gridGap.value;

      layoutCssCode.textContent = `display: grid;
grid-template-columns: ${gridCols.value};
gap: ${gridGap.value};`;
    }
  }

  if (layoutModeRadios) {
    layoutModeRadios.forEach(radio => radio.addEventListener('change', updateLayout));
    [flexDirection, justifyContent, alignItems, gridCols, gridGap].forEach(el => el.addEventListener('change', updateLayout));
    updateLayout();
  }

  // --- MÓDULO 5: ESCALA TIPOGRÁFICA ---
  const baseFontSize = document.getElementById('baseFontSize');
  const scaleRatio = document.getElementById('scaleRatio');
  const typographyPreviewContainer = document.getElementById('typographyPreviewContainer');

  function updateTypography() {
    const base = parseFloat(baseFontSize.value) || 16;
    const ratio = parseFloat(scaleRatio.value) || 1.618;

    const h1 = Math.round(base * Math.pow(ratio, 3));
    const h2 = Math.round(base * Math.pow(ratio, 2));
    const h3 = Math.round(base * ratio);

    typographyPreviewContainer.innerHTML = `
      <div style="border-bottom:1px solid #E5E7EB; padding-bottom:12px;" class="mb-3">
        <span class="tag is-purple is-light mb-1">Heading 1 (H1)</span>
        <p style="font-size: ${h1}px; font-weight: bold; line-height: 1.2;">Encabezado Principal - ${h1}px</p>
      </div>
      <div style="border-bottom:1px solid #E5E7EB; padding-bottom:12px;" class="mb-3">
        <span class="tag is-purple is-light mb-1">Heading 2 (H2)</span>
        <p style="font-size: ${h2}px; font-weight: bold; line-height: 1.25;">Subtítulo de Sección - ${h2}px</p>
      </div>
      <div style="border-bottom:1px solid #E5E7EB; padding-bottom:12px;" class="mb-3">
        <span class="tag is-purple is-light mb-1">Heading 3 (H3)</span>
        <p style="font-size: ${h3}px; font-weight: bold; line-height: 1.3;">Título Secundario - ${h3}px</p>
      </div>
      <div>
        <span class="tag is-info is-light mb-1">Body Text (Párrafo)</span>
        <p style="font-size: ${base}px; line-height: 1.5;">Este es el tamaño del cuerpo de texto base (${base}px). Todas las jerarquías superiores guardan una relación armónica basada en la proporción seleccionada (${ratio}).</p>
      </div>
    `;
  }

  if (baseFontSize) {
    [baseFontSize, scaleRatio].forEach(el => el.addEventListener('input', updateTypography));
    updateTypography();
  }

  // --- MÓDULO 6: SNIPPETS COPY ---
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check mr-1"></i> ¡Copiado!';
      btn.classList.replace('is-custom-purple', 'is-success');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.replace('is-success', 'is-custom-purple');
      }, 1800);
    });
  });

});
