const _self = {};

const _sUa = navigator.userAgent.toLowerCase();
const _class2type = {};
const _toString = _class2type.toString;
const _hasOwn = _class2type.hasOwnProperty;
const _fnToString = _hasOwn.toString;
const _ObjectFunctionString = _fnToString.call(Object);

/**
 * Get variable type
 * @param {*} val
 * @return {String}
 * @example
 *  var type = getType([1,2,3]); // Array
 *  also detect: boolean, string, object, date, number, function, regexp, symbol, error, null, undefined, html{XXX}element
 */
_self.getType = function(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * Chack variable type
 * @param {String} type
 * @param {*} obj
 * @return {Boolean}
 * @example
 *  if (is('array', [1,2,3])) {
 *      alert('Array');
 *  }
 *  also detect: boolean, string, object, date, number, function, regexp, symbol, error, null, undefined, html{XXX}element
 */
_self.is = function(type, obj) {
  const objType = _self.getType(obj);

  if (type === 'number' && objType === 'number') {
    return !isNaN(obj);
  } else {
    return objType === type;
  }
};

/**
 * Determine whether the argument is an array.
 * @param {*} obj Object to test whether or not it is an array.
 * @return {Boolean}
 */
_self.isArray = function(obj) {
  return Array.isArray ? Array.isArray(obj) : _self.is('array', obj);
};

/**
 * Determine whether the argument is an object.
 * @param {*} obj Object to test whether or not it is an object.
 * @return {Boolean}
 */
_self.isObject = function(obj) {
  return _self.is('object', obj);
};

/**
 * Determine whether the argument is an plain object.
 * @param {*} obj Object to test
 * @return {Boolean}
 */
_self.isPlainObject = function(obj) {
  let proto;
  let Ctor;

  // Detect obvious negatives
  // Use toString instead of _self.getType to catch host objects
  if (!obj || _toString.call(obj) !== '[object Object]') {
    return false;
  }

  proto = Object.getPrototypeOf(obj);

  // Objects with no prototype (e.g., `Object.create(null)`) are plain
  if (!proto) {
    return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = _hasOwn.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function' && _fnToString.call(Ctor) === _ObjectFunctionString;
};

//

/**
 * Parse URL string to object
 * @param {String} sStr URL строка для парсинга
 * @param {String} [sParamsSeparate=&] разделитель параметров
 * @return {Object}
 * @example
 *  App.parseSstr('first=foo&second=bar');
 *  { first: 'foo', second: 'bar' }
 *
 *  App.parseStr('str_a=Jack+and+Jill+didn%27t+see+the+well.');
 *  { str_a: "Jack and Jill didn't see the well." }
 */
_self.parseStr = function(sStr, sParamsSeparate = '&') {
  const ret = {};

  for (let sub of sStr.split(sParamsSeparate)) {
    const list = sub.split('=');
    if (list.length > 1) {
      ret[unescape(list[0])] = decodeURIComponent(list[1]);
    }
  }

  return ret;
};

/**
 * Parse query string
 * @return {Object}
 */
_self.parseQueryString = function() {
  const queryString = location.search;
  let ret = {};

  if (queryString) {
    ret = _self.parseStr((queryString).substr(1));
  }

  return ret;
};

/**
 * Get hash for URL
 * @param {String} [sUrl=location]
 * @return {String}
 */
_self.getUrlHash = function(sUrl) {
  if (!sUrl) sUrl = window.location;
  return (sUrl.hash ? sUrl.hash.substr(1) : '');
};

/**
 * Create a serialized representation of an plain object
 * suitable for use in a URL query string or Ajax request.
 * @param {Object} a plain object to serialize.
 * @return {String}
 */
_self.params = (function() {
  const _fn = {
    rbracket: /\[\]$/,
    buildParams: function(prefix, obj, add) {
      let name;

      if (Array.isArray(obj)) {
        // Serialize array item.
        obj.forEach(function(v, i) {
          if (_fn.rbracket.test(prefix)) {
            // Treat each array item as a scalar.
            add(prefix, v);
          } else {
            // Item is non-scalar (array or object), encode its numeric index.
            _fn.buildParams(
              prefix + '[' + (typeof v === 'object' && v !== null ? i : '') + ']',
              v,
              add
            );
          }
        });
      } else if (_self.is('object', obj)) {
        // Serialize object item.
        for (name in obj) {
          _fn.buildParams(prefix + '[' + name + ']', obj[name], add);
        }
      } else {
        // Serialize scalar item.
        add(prefix, obj);
      }
    }
  };

  return function(a) {
    let prefix;
    let s = [];

    function add(key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      const value = _self.is('function', valueOrFunction) ? valueOrFunction() : valueOrFunction;
      s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value === null ? '' : value);
    }

    for (prefix in a) {
      _fn.buildParams(prefix, a[prefix], add);
    }

    // Return the resulting serialization
    return s.join('&');
  };
})();

//

/**
 * Merge the contents of two or more objects together into the first object.
 * @param {Boolean} [bDeep] If true, the merge becomes recursive (aka. deep copy).
 * @param {Object} oTarget The object to extend. It will receive the new properties.
 * @param {Object} oSource1 An object containing additional properties to merge in.
 * @param {Object} [oSourceN] Additional objects containing properties to merge in.
 * @return {Object}
 */
_self.extend = function() {
  let options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }

  // Extend App itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {

    // Only deal with non-null/undefined values
    if ((options = arguments[i]) !== null) {

      // Extend the base object
      for (name in options) {
        copy = options[name];

        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === '__proto__' || target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (_self.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          src = target[name];

          // Ensure proper type for the source value
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !_self.isPlainObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // Never move original objects, clone them
          target[name] = _self.extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

/**
 * Parse to int
 * true convert to 1
 * if result isNan, then convert to 0
 * @param {*} xAny
 * @param {Boolean} [bAbs] абсолютное значение
 * @return {Number}
 */
_self.toInt = function(xAny, bAbs) {
  if (xAny === true) {
    return 1;
  }

  const nToret = parseInt(xAny, 10);

  return isNaN(nToret) ? 0 : (bAbs ? Math.abs(nToret) : nToret);
};

/**
 * Parse to float
 * true convert to 1
 * if result isNan, then convert to 0
 * @param {*} xAny
 * @param {Boolean} [bAbs] абсолютное значение
 * @return {Number}
 */
_self.toFloat = function(xAny, bAbs) {
  if (xAny === true) {
    return 1;
  }

  const nToret = parseFloat(xAny);

  return isNaN(nToret) ? 0 : (bAbs ? Math.abs(nToret) : nToret);
};

/**
 * Генератор случайного числа в диапазоне
 * @param {Number} min
 * @param {Number} max
 * @return {number}
 */
_self.randomInt = function(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);

  return rand;
};

/**
 * Java’s String.hashCode() method implemented in Javascript
 * @param {String} str
 * @return {Number}
 */
_self.hashCode = function(str) {
  let hash = 0, char;

  if (typeof str !== 'string' || str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
};

/**
 * Determine whether a variable is empty
 * @param {*} mixedVar
 * @return {Boolean}
 */
_self.isEmpty = function(mixedVar) {
  if (!mixedVar) return true;

  switch (typeof mixedVar) {
    case 'string':
      mixedVar = _self.trim(mixedVar);
      if (!mixedVar || mixedVar === '0') return true;
      break;
    case 'object':
      if (_self.isArray(mixedVar)) {
        if (!mixedVar.length) return true;
      } else {
        for (let key in mixedVar) {
          if (_hasOwn.call(mixedVar, key)) return false;
        }
        return true;
      }
      break;
  }

  return false;
};

//

/**
 * Create deep copy of array or object
 * @param {*} input
 * @param {Boolean} [isDeep=true]
 * @return {*}
 */
_self.cloneObject = function(input, isDeep = true) {
  let output, index, size;

  if (Array.isArray(input)) {
    if (isDeep) {
      output = [];
      size = input.length;
      for (index = 0; index < size; ++index) {
        output[index] = this.cloneObject(input[index]);
      }
    } else {
      if (Array.from) { // all, except IE
        output = Array.from(input);
      } else {
        output = input.slice();
      }
    }

  } else if (this.isPlainObject(input)) {
    output = {};

    if (isDeep) {
      for (index in input) {
        if (!_hasOwn.call(input, index)) continue;
        output[index] = this.cloneObject(input[index]);
      }
    } else {
      if (Object.assign) { // all, except IE
        Object.assign(output, input);
      } else {
        for (index in input) {
          if (!_hasOwn.call(input, index)) continue;
          output[index] = input[index];
        }
      }
    }
  } else {
    output = input;
  }

  return output;
};

/**
 * Get the size of an object
 * @param {Array|Object} input
 * @return {Number}
 */
_self.getSizeObject = function(input) {
  let size = 0;

  if (Array.isArray(input)) {
    size = input.length;
  } else if (this.isPlainObject(input)) {
    for (let index in input) {
      if (_hasOwn.call(input, index)) size++;
    }
  }

  return size;
};

//

/**
 * Сделать скролл указанному элементу
 * @param {Object} target
 * @param {Object} options
 *   @param {Number} [options.left]
 *   @param {Number} [options.top]
 *   @param {String} [options.behavior] smooth|auto
 * @return {void}
 */
_self.setScroll = function(target, options) {
  // options - https://developer.mozilla.org/ru/docs/Web/API/ScrollToOptions
  // window scrollTo - https://developer.mozilla.org/ru/docs/Web/API/Window/scrollTo
  // elem scrollTo - https://developer.mozilla.org/ru/docs/Web/API/Element/scrollTo
  // elem scrollTop - https://developer.mozilla.org/ru/docs/Web/API/Element/scrollTop

  if (!target || !_self.isPlainObject(options) || _self.isEmpty(options) || !(target.scrollTop || target.scrollTo)) {
    throw new Error('helpers::setScroll - invalid params');
  }

  if (options.left !== undefined) options.left = _self.toInt(options.left, true);
  if (options.top !== undefined) options.top = _self.toInt(options.top, true);

  const isSupportParamsInScroll = !document.all && !('ActiveXObject' in window) && _sUa.indexOf('edge') === -1 && !(_sUa.indexOf('safari') > -1 && _sUa.indexOf('chrome') === -1);

  // all modern brawsers
  if (target.scrollTo && isSupportParamsInScroll) {
    target.scrollTo(options);
    return;
  }

  const isSmooth = options.behavior === 'smooth';
  const isWindow = _self.getType(target) === 'window';
  let x = isWindow ? target.pageXOffset : target.scrollLeft;
  let y = isWindow ? target.pageYOffset : target.scrollTop;

  if (isSmooth) {
    (function(pos) {
      var offsetY = pos.top && (pos.top < y ? -75 : 75);
      var offsetX = pos.left && (pos.left < x ? -75 : 75);

      var int = setInterval(function() {
        if (offsetX) x += offsetX;
        if (offsetY) y += offsetY;

        var isReadyX = !offsetX || (offsetX > 0 && x >= pos.left) || (offsetX < 0 && x <= pos.left);
        var isReadyY = !offsetY || (offsetY > 0 && y >= pos.top) || (offsetY < 0 && y <= pos.top);

        if (isReadyX) x = pos.left;
        if (isReadyY) y = pos.top;

        if (target.scrollTo) {
          target.scrollTo(x, y);
        } else {
          target.scrollLeft = x;
          target.scrollTop = y;
        }

        if (isReadyX && isReadyY) {
          clearInterval(int);
        }
      }, 10);
    })(options);
  } else {
    if (target.scrollTo) {
      target.scrollTo(
        options.left === undefined ? x : options.left,
        options.top === undefined ? y : options.top
      );
    } else {
      if (options.left) target.scrollLeft = options.left;
      if (options.top) target.scrollTop = options.top;
    }

  }
};

/**
 * Scroll window to node
 * @param {object} node
 * @param {string} [behavior=smooth]
 * @return {void}
 */
_self.scrollToNode = function(node, behavior) {
  if (!node || !node.nodeName) {
    throw new Error('helpers::scrollWindowToNode - invalid node');
  }

  if (!node.isConnected) return;

  if (behavior === undefined) behavior = 'smooth';

  const offsetTop = window.pageYOffset + node.getBoundingClientRect().top;

  _self.setScroll(window, { top: offsetTop, behavior: behavior });
};

/**
 * Простая анимация
 * @param {function} timing Функция расчёта времени
 * @param {function} draw функция отрисовки анимации
 * @param {number} duration общая продолжительность анимации в миллисекундах.
 * @see https://learn.javascript.ru/js-animation
 * @return {void}
 */
_self.animate = function({ timing, draw, duration }) {
  /*
  duration
  Продолжительность анимации. Например, 1000.
  -----------
  timing(timeFraction)
  Функция расчёта времени, как CSS-свойство transition-timing-function, которая будет вычислять прогресс анимации
  (как ось y у кривой Безье) в зависимости от прошедшего времени (0 в начале, 1 в конце).
  Например, линейная функция значит, что анимация идёт с одной и той же скоростью:
      function linear(timeFraction) {
          return timeFraction;
      }
  ------
  draw(progress)
  Функция отрисовки, которая получает аргументом значение прогресса анимации и отрисовывает его. Значение progress=0
  означает, что анимация находится в начале, и значение progress=1 – в конце.
  Эта та функция, которая на самом деле и рисует анимацию.
      function draw(progress) {
        train.style.left = progress + 'px';
      }
  */

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};

/**
 * Check target is visible
 * @param {Node} target
 * @return {boolean}
 */
_self.isVisible = function(target) {
  // check target is visible
  // if (!target || target.offsetParent === null) return false; // быстрый вариант, но не работает в старых IE и для position=fixed

  if (target instanceof Window || (target.document && target.document.nodeName)) return true;

  let nodeType = target.nodeType;
  if (!nodeType) return false;

  if (nodeType === 1) {
    // jQuery вариант
    return !!(target && (target.offsetWidth || target.offsetHeight || target.getClientRects().length));
  } else {
    return true;
  }
};

//

/**
 * Detect touch devices
 * @return {Boolean}
 */
_self.isTouch = function() {
  const th = this.isTouch;

  if (th.ret === undefined) {
    let el = document.createElement('div');
    el.setAttribute('ontouchstart', 'return;');
    th.ret = (typeof el.ontouchstart === 'function');
    el = null;
  }

  return th.ret;
};

/**
 * Check a cookie enable
 * @return {boolean}
 */
_self.isCookieEnable = function() {
  let res = window.navigator.cookieEnabled;

  if (res === undefined) {
    res = !!(document.cookie || ((document.cookie = 'ce=1') && document.cookie));
  }

  return res;
};

/**
 * Тормозилка
 * Возвращает обёртку, передающую вызов f не чаще, чем раз в ms миллисекунд
 * У этой функции должно быть важное существенное отличие от debounce: если игнорируемый вызов оказался последним,
 * т.е. после него до окончания задержки ничего нет – то он выполнится.
 * @url https://learn.javascript.ru/task/throttle
 * @param {Function} fn
 * @param {Number} ms
 * @returns {Function}
 */
_self.throttle = function(fn, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    fn.apply(this, arguments);
    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, (ms || 100));
  }

  return wrapper;
};
if (window.$ && !window.$.throttle) {
  // временная хрень для отказа от соответствующих плагинов
  window.$.throttle = function(ms, fn) {
    return _self.throttle(fn, ms);
  };
}

/**
 * Вызов не чаще чем в N миллисекунд
 * Возвращает обёртку, которая откладывает вызов f на ms миллисекунд.
 * «Лишние» вызовы перезаписывают предыдущие отложенные задания. Все аргументы и контекст – передаются.
 * @url http://qnimate.com/javascript-limit-function-call-rate/
 * @param {Function} fn
 * @param {Number} ms
 * @param {Boolean} [immediate = false]
 * @returns {Function}
 */
_self.debounce = function(fn, ms, immediate) {
  let timeout;

  return function() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
    if (callNow) fn.apply(context, args);
  };
};
if (window.$ && !window.$.debounce) {
  // временная хрень для отказа от соответствующих плагинов
  window.$.debounce = function(ms, fn) {
    return _self.debounce(fn, ms);
  };
}


export default _self;