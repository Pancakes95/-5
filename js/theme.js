/* Настройки независимы: цветовая тема и плотность сохраняются раздельно. */
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');

function readSetting(key, allowed, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return allowed.includes(stored) ? stored : fallback;
  } catch (error) {
    return fallback; // Даже при заблокированном хранилище интерфейс работает.
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Продолжаем работу без сохранения, например в приватном режиме.
  }
}

function applyTheme(choice) {
  const theme = ['auto', 'light', 'dark'].includes(choice) ? choice : 'auto';
  if (theme === 'auto') root.removeAttribute('data-theme');
  else root.dataset.theme = theme;
  themeSelect.value = theme;
}

function applyDensity(choice) {
  const density = ['normal', 'compact'].includes(choice) ? choice : 'normal';
  if (density === 'compact') root.dataset.density = density;
  else root.removeAttribute('data-density');
  densitySelect.value = density;
}

applyTheme(readSetting('atlas-theme', ['auto', 'light', 'dark'], 'auto'));
applyDensity(readSetting('atlas-density', ['normal', 'compact'], 'normal'));

themeSelect.addEventListener('change', () => {
  applyTheme(themeSelect.value);
  saveSetting('atlas-theme', themeSelect.value);
});

densitySelect.addEventListener('change', () => {
  applyDensity(densitySelect.value);
  saveSetting('atlas-density', densitySelect.value);
});

/* Демонстрационная кнопка уже имела рабочий обработчик в исходном проекте. */
demoAction.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});
