import helpers from '@utils/helpers';

const _localStorage = window.localStorage;
const _STORAGE_KEY = 'storage';

let _data = {};

const _readyPromise = new Promise(function(resolve) {
  _loadData()
    .then((data) => helpers.extend(_data, data))
    .catch(() => _error('Произоша ошибка при получении данных пользователя.'))
    .finally(() => resolve(_data));
});

async function _loadData() {
  // при отключенных куках вообще ничего не храним
  if (!helpers.isCookieEnable()) {
    _error('Cookies is not available');
  }

  let data;

  try {
    data = JSON.parse(_localStorage.getItem(_STORAGE_KEY));
  } catch (e) {
    _localStorage?.removeItem(_STORAGE_KEY);
    data = null;
  }

  return data;
}

async function _setData(key, value) {
  if (!helpers.is('string', key)) {
    _error('invalid type for key');
  }

  _data[key] = value;
  _data.ts = Date.now();

  if (!helpers.isCookieEnable()) {
    _error('can\'t store user data: cookie is not available');
  }

  if (_localStorage) {
    _localStorage.setItem(_STORAGE_KEY, JSON.stringify(_data));
    return true;
  } else {
    _error('browser local storage is not available');
  }
}

function _error(mesage) {
  throw  new Error(mesage);
}


export default {
  /**
   * Run cb function on ready storage
   * @return {promise}
   */
  ready: function(cb) {
    return _readyPromise.then(cb);
  },
  /**
   * Get data from storage
   * @param {string} [key]
   * @return {*}
   */
  get: function(key) {
    return key ? _data[key] : _data;
  },
  /**
   * Save data to storage
   * @param {string} key
   * @param {*} value
   * @return {promise}
   */
  set: function(key, value) {
    return _readyPromise.then(function() {
      return _setData(key, value);
    });
  }
};