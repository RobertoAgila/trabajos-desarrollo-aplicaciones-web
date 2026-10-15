/*
  ACTIVIDAD 3 - Calculadora científica
  HTML: estructura | CSS: apariencia | JavaScript: comportamiento
  Motor matemático propio: analiza expresiones sin usar eval().
*/
(() => {
  'use strict';

  class CalculatorError extends Error {}

  const functionNames = new Set([
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'sinh', 'cosh', 'tanh', 'ln', 'log', 'log2',
    'sqrt', 'cbrt', 'root', 'abs', 'inv', 'exp', 'pow10',
    'comb', 'perm', 'floor', 'ceil', 'round'
  ]);

  function factorial(value) {
    if (!Number.isInteger(value) || value < 0 || value > 170) {
      throw new CalculatorError('El factorial admite enteros entre 0 y 170.');
    }
    let result = 1;
    for (let n = 2; n <= value; n++) result *= n;
    return result;
  }

  function applyFunction(name, args, angleMode) {
    const expected = ['root', 'comb', 'perm'].includes(name) ? 2 : 1;
    if (args.length !== expected) {
      throw new CalculatorError(`${name} requiere ${expected} argumento(s).`);
    }
    const x = args[0];
    const radians = angleMode === 'DEG' ? x * Math.PI / 180 : x;
    const fromRadians = value => angleMode === 'DEG' ? value * 180 / Math.PI : value;
    const cleanTrig = value => Math.abs(value) < 1e-14 ? 0 : value;

    switch (name) {
      case 'sin': return cleanTrig(Math.sin(radians));
      case 'cos': return cleanTrig(Math.cos(radians));
      case 'tan':
        if (Math.abs(Math.cos(radians)) < 1e-13) throw new CalculatorError('Tangente indefinida para este ángulo.');
        return cleanTrig(Math.tan(radians));
      case 'asin':
        if (x < -1 || x > 1) throw new CalculatorError('El arcoseno requiere valores entre −1 y 1.');
        return fromRadians(Math.asin(x));
      case 'acos':
        if (x < -1 || x > 1) throw new CalculatorError('El arcocoseno requiere valores entre −1 y 1.');
        return fromRadians(Math.acos(x));
      case 'atan': return fromRadians(Math.atan(x));
      case 'sinh': return Math.sinh(x);
      case 'cosh': return Math.cosh(x);
      case 'tanh': return Math.tanh(x);
      case 'ln':
        if (x <= 0) throw new CalculatorError('El logaritmo requiere un número positivo.');
        return Math.log(x);
      case 'log':
        if (x <= 0) throw new CalculatorError('El logaritmo requiere un número positivo.');
        return Math.log10(x);
      case 'log2':
        if (x <= 0) throw new CalculatorError('El logaritmo requiere un número positivo.');
        return Math.log2(x);
      case 'sqrt':
        if (x < 0) throw new CalculatorError('No existe raíz cuadrada real de un negativo.');
        return Math.sqrt(x);
      case 'cbrt': return Math.cbrt(x);
      case 'root': {
        const index = x;
        const radicand = args[1];
        if (index === 0) throw new CalculatorError('El índice de una raíz no puede ser cero.');
        if (radicand < 0) {
          if (!Number.isInteger(index) || Math.abs(index % 2) !== 1) {
            throw new CalculatorError('Para negativos, la raíz debe tener índice impar entero.');
          }
          return -Math.pow(-radicand, 1 / index);
        }
        return Math.pow(radicand, 1 / index);
      }
      case 'comb':
      case 'perm': {
        const n = x, r = args[1];
        if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n || n > 170) {
          throw new CalculatorError('nCr y nPr requieren enteros con 0 ≤ r ≤ n ≤ 170.');
        }
        if (name === 'perm') {
          let product = 1;
          for (let i = 0; i < r; i++) product *= (n - i);
          return product;
        }
        let result = 1;
        const k = Math.min(r, n - r);
        for (let i = 1; i <= k; i++) result = result * (n - k + i) / i;
        return Math.round(result);
      }
      case 'floor': return Math.floor(x);
      case 'ceil': return Math.ceil(x);
      case 'round': return Math.round(x);
      case 'abs': return Math.abs(x);
      case 'inv':
        if (x === 0) throw new CalculatorError('No se puede dividir entre cero.');
        return 1 / x;
      case 'exp': return Math.exp(x);
      case 'pow10': return Math.pow(10, x);
      default: throw new CalculatorError('Función desconocida.');
    }
  }

  // Paso 1: convertir una expresión escrita en unidades (tokens).
  function tokenize(expression) {
    const tokens = [];
    let position = 0;
    while (position < expression.length) {
      const remaining = expression.slice(position);
      if (/^\s/.test(remaining)) { position++; continue; }

      const number = remaining.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?/);
      if (number) {
        tokens.push({ type: 'number', value: Number(number[0]) });
        position += number[0].length;
        continue;
      }
      const identifier = remaining.match(/^[A-Za-z][A-Za-z0-9]*/);
      if (identifier) {
        const name = identifier[0];
        if (functionNames.has(name)) tokens.push({ type: 'function', value: name });
        else if (['pi', 'e', 'Ans', 'M'].includes(name)) tokens.push({ type: 'constant', value: name });
        else if (name === 'mod') tokens.push({ type: 'operator', value: 'mod' });
        else throw new CalculatorError(`Símbolo desconocido: ${name}.`);
        position += name.length;
        continue;
      }
      if ('+-*/^!%(),'.includes(expression[position])) {
        const character = expression[position];
        const type = character === '(' ? 'open'
          : character === ')' ? 'close'
          : character === ',' ? 'comma'
          : 'operator';
        tokens.push({ type, value: character });
        position++;
        continue;
      }
      throw new CalculatorError(`Carácter no permitido: ${expression[position]}.`);
    }

    // Admite multiplicación implícita: 2pi, 2(3+4), 3sin(30), (2)(3).
    const withImplicitMultiplication = [];
    for (const token of tokens) {
      const previous = withImplicitMultiplication[withImplicitMultiplication.length - 1];
      const previousEndsValue = previous && (
        ['number', 'constant', 'close'].includes(previous.type)
        || (previous.type === 'operator' && ['!', '%'].includes(previous.value))
      );
      const nextStartsValue = ['number', 'constant', 'open', 'function'].includes(token.type);
      if (previousEndsValue && nextStartsValue) {
        withImplicitMultiplication.push({ type: 'operator', value: '*' });
      }
      withImplicitMultiplication.push(token);
    }
    return withImplicitMultiplication;
  }

  // Paso 2: interpretar la expresión respetando jerarquía de operaciones.
  function evaluate(expression, options = {}) {
    const tokens = tokenize(String(expression));
    const angleMode = options.angleMode === 'RAD' ? 'RAD' : 'DEG';
    const constants = { pi: Math.PI, e: Math.E, Ans: options.ans ?? 0, M: options.memory ?? 0 };
    let cursor = 0;
    const peek = () => tokens[cursor];
    const take = () => tokens[cursor++];
    const expect = (type, value) => {
      const token = take();
      if (!token || token.type !== type || (value !== undefined && token.value !== value)) {
        throw new CalculatorError('Expresión incompleta o paréntesis incorrectos.');
      }
    };

    function parse(minimumBindingPower = 0) {
      let first = take();
      if (!first) throw new CalculatorError('Escribe una operación para calcular.');
      let left;

      if (first.type === 'number') left = first.value;
      else if (first.type === 'constant') left = constants[first.value];
      else if (first.type === 'open') {
        left = parse();
        expect('close');
      } else if (first.type === 'operator' && (first.value === '-' || first.value === '+')) {
        const operand = parse(30);  // -2^2 equivale a -(2^2)
        left = first.value === '-' ? -operand : operand;
      } else if (first.type === 'function') {
        expect('open');
        const argumentsList = [parse()];
        while (peek() && peek().type === 'comma') { take(); argumentsList.push(parse()); }
        expect('close');
        left = applyFunction(first.value, argumentsList, angleMode);
      } else {
        throw new CalculatorError('Revisa el orden de los números y operadores.');
      }

      while (peek()) {
        const current = peek();
        if (current.type !== 'operator') break;

        // Factorial y porcentaje se aplican al valor inmediatamente anterior.
        if (current.value === '!' || current.value === '%') {
          if (60 < minimumBindingPower) break;
          take();
          left = current.value === '!' ? factorial(left) : left / 100;
          continue;
        }

        const precedence = { '+': 10, '-': 10, '*': 20, '/': 20, mod: 20, '^': 40 }[current.value];
        if (precedence === undefined || precedence < minimumBindingPower) break;
        take();
        const right = parse(current.value === '^' ? precedence : precedence + 1);
        if (current.value === '+') left += right;
        if (current.value === '-') left -= right;
        if (current.value === '*') left *= right;
        if (current.value === '/') {
          if (right === 0) throw new CalculatorError('No se puede dividir entre cero.');
          left /= right;
        }
        if (current.value === 'mod') {
          if (right === 0) throw new CalculatorError('El módulo entre cero no está definido.');
          left %= right;
        }
        if (current.value === '^') left = Math.pow(left, right);
      }
      if (!Number.isFinite(left)) throw new CalculatorError('Resultado fuera del rango numérico.');
      return left;
    }

    const result = parse();
    if (cursor !== tokens.length) throw new CalculatorError('Hay elementos sin evaluar en la expresión.');
    if (!Number.isFinite(result)) throw new CalculatorError('Resultado fuera del rango numérico.');
    return Object.is(result, -0) ? 0 : result;
  }

  function formatNumber(value) {
    if (!Number.isFinite(value)) return 'Error';
    return Number(value.toPrecision(12)).toString();
  }

  // Disponible también en Node.js para probar operaciones automáticamente.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { evaluate, formatNumber, CalculatorError };
  }
  if (typeof document === 'undefined') return;

  // Paso 3: conectar las teclas con el motor y actualizar la pantalla.
  const $ = selector => document.querySelector(selector);
  const expressionElement = $('#expression');
  const resultElement = $('#result');
  const statusElement = $('#display-status');
  const modeIndicator = $('#mode-indicator');
  const memoryIndicator = $('#memory-indicator');
  const historyList = $('#history-list');
  const historyCount = $('#history-count');

  function getStored(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function store(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* Seguir funcionando si el navegador bloquea almacenamiento. */ }
  }

  const state = {
    expression: '0', ans: 0, memory: null,
    angleMode: getStored('calc-mode', 'DEG') === 'RAD' ? 'RAD' : 'DEG',
    history: getStored('calc-history', []),
    justEvaluated: false
  };
  if (!Array.isArray(state.history)) state.history = [];
  state.history = state.history.filter(item => item && typeof item.expression === 'string' &&
    typeof item.value === 'number' && Number.isFinite(item.value)).slice(0, 20);

  function pretty(value) {
    return value.replace(/\basin\(/g, 'sin⁻¹(').replace(/\bacos\(/g, 'cos⁻¹(')
      .replace(/\batan\(/g, 'tan⁻¹(').replace(/\bsqrt\(/g, '√(')
      .replace(/\bcbrt\(/g, '∛(').replace(/\bpi\b/g, 'π')
      .replace(/\*/g, '×').replace(/\//g, '÷');
  }

  function refresh(status) {
    expressionElement.textContent = pretty(state.expression);
    expressionElement.scrollLeft = expressionElement.scrollWidth;
    modeIndicator.textContent = state.angleMode;
    memoryIndicator.classList.toggle('hidden', state.memory === null);
    $('#angle-mode').innerHTML = `${state.angleMode} <span>↔</span> ${state.angleMode === 'DEG' ? 'RAD' : 'DEG'}`;

    try {
      const value = evaluate(state.expression, { angleMode: state.angleMode, ans: state.ans, memory: state.memory ?? 0 });
      resultElement.textContent = formatNumber(value);
      statusElement.textContent = status || 'Resultado en tiempo real';
    } catch (error) {
      resultElement.textContent = '…';
      statusElement.textContent = status || 'Completa la expresión';
    }
  }

  function getPreview() {
    return evaluate(state.expression, { angleMode: state.angleMode, ans: state.ans, memory: state.memory ?? 0 });
  }

  function append(text) {
    const numeric = /^[0-9]$/.test(text);
    const startsNew = numeric || text === '.' || text === '(' || /^[A-Za-z]/.test(text) && text !== 'E';
    if (state.justEvaluated && startsNew) state.expression = '0';
    state.justEvaluated = false;

    if (text === 'E') {
      if (!/(?:\d+(?:\.\d*)?|\.\d+)$/.test(state.expression)) {
        refresh('EXP requiere un número previo'); return;
      }
      const numberToken = state.expression.match(/(?:\d+(?:\.\d*)?|\.\d+)$/);
      if (!numberToken || /E/.test(numberToken[0])) return;
    }
    if (text === '.') {
      const tail = state.expression.match(/(?:\d|\.)+(?:[Ee][+-]?\d+)?$/);
      if (tail && tail[0].includes('.')) { refresh('El número ya tiene un decimal'); return; }
      if (!tail) text = '0.';
    }
    if (state.expression === '0' && (numeric || startsNew || text === '.')) {
      state.expression = text;
    } else if (state.expression === '0' && text === '-') {
      state.expression = '-';
    } else if (/^[+*/^]$/.test(text) && /[+*/^]$/.test(state.expression)) {
      state.expression = state.expression.slice(0, -1) + text;
    } else {
      state.expression += text;
    }
    refresh();
  }

  function perform(command) {
    if (command === 'clear') {
      state.expression = '0'; state.justEvaluated = false; refresh('Pantalla limpia'); return;
    }
    if (command === 'delete') {
      state.expression = state.expression.slice(0, -1) || '0';
      state.justEvaluated = false; refresh('Último carácter eliminado'); return;
    }
    if (command === 'sign') {
      if (state.expression.startsWith('-(') && state.expression.endsWith(')')) {
        state.expression = state.expression.slice(2, -1);
      } else if (/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(state.expression)) {
        state.expression = state.expression.startsWith('-') ? state.expression.slice(1) : '-' + state.expression;
      } else {
        state.expression = `-(${state.expression})`;
      }
      state.justEvaluated = false; refresh('Signo modificado'); return;
    }
    if (command === 'equals') {
      try {
        const value = getPreview();
        state.ans = value;
        state.history.unshift({ expression: state.expression, value });
        state.history = state.history.slice(0, 20);
        store('calc-history', state.history);
        renderHistory();
        state.expression = formatNumber(value);
        state.justEvaluated = true;
        refresh('Cálculo completado');
      } catch (error) {
        resultElement.textContent = 'Error';
        statusElement.textContent = error.message;
      }
    }
  }

  function memory(command) {
    if (command === 'clear') { state.memory = null; refresh('Memoria borrada'); return; }
    if (command === 'recall') {
      if (state.memory === null) { refresh('La memoria está vacía'); return; }
      append(`(${formatNumber(state.memory)})`); return;
    }
    try {
      const value = getPreview();
      state.memory = (state.memory ?? 0) + (command === 'add' ? value : -value);
      refresh(command === 'add' ? 'Valor sumado a memoria' : 'Valor restado de memoria');
    } catch (error) { statusElement.textContent = error.message; }
  }

  function renderHistory() {
    historyCount.textContent = String(state.history.length);
    historyList.replaceChildren();
    if (!state.history.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-history'; empty.textContent = 'Tus cálculos aparecerán aquí.';
      historyList.appendChild(empty); return;
    }
    state.history.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'history-entry';
      button.title = 'Recuperar este resultado';
      const formula = document.createElement('span');
      formula.className = 'history-equation'; formula.textContent = pretty(item.expression);
      const result = document.createElement('span');
      result.className = 'history-value'; result.textContent = '= ' + formatNumber(item.value);
      button.append(formula, result);
      button.addEventListener('click', () => {
        state.expression = formatNumber(item.value); state.justEvaluated = true;
        refresh('Resultado recuperado del historial');
      });
      historyList.appendChild(button);
    });
  }

  // Delegación de eventos: un único listener para todos los botones.
  $('.calculator-card').addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.input !== undefined) append(button.dataset.input);
    else if (button.dataset.command) perform(button.dataset.command);
    else if (button.dataset.memory) memory(button.dataset.memory);
  });

  $('#angle-mode').addEventListener('click', () => {
    state.angleMode = state.angleMode === 'DEG' ? 'RAD' : 'DEG';
    store('calc-mode', state.angleMode);
    refresh('Modo ' + (state.angleMode === 'DEG' ? 'grados' : 'radianes'));
  });
  $('#clear-history').addEventListener('click', () => {
    state.history = []; store('calc-history', []); renderHistory(); refresh('Historial borrado');
  });
  $('#copy-result').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('La copia requiere HTTPS o localhost.');
      await navigator.clipboard.writeText(formatNumber(getPreview()));
      statusElement.textContent = 'Resultado copiado';
    } catch { statusElement.textContent = 'No se pudo copiar. Selecciona el resultado manualmente.'; }
  });
  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next; store('calc-theme', next);
    $('#theme-toggle').textContent = next === 'light' ? '☾ Tema oscuro' : '☀ Tema claro';
  });

  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target.matches('input, textarea, select, [contenteditable]')) return;
    const key = event.key;
    if (/^[0-9]$/.test(key) || ['.', '+', '-', '*', '/', '^', '%', '(', ')', ','].includes(key)) {
      event.preventDefault(); append(key);
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault(); perform('equals');
    } else if (key === 'Backspace') {
      event.preventDefault(); perform('delete');
    } else if (key === 'Escape') {
      event.preventDefault(); perform('clear');
    } else if (key.toLowerCase() === 'p') {
      event.preventDefault(); append('pi');
    }
  });

  const savedTheme = getStored('calc-theme', 'dark');
  document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark';
  $('#theme-toggle').textContent = savedTheme === 'light' ? '☾ Tema oscuro' : '☀ Tema claro';
  renderHistory();
  refresh('Lista para calcular');
})();
