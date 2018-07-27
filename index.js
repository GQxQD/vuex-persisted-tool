export default function (options, storage, ignore, key) {
  options = (typeof options === 'object' && options !== null) ? options : {};
  storage = options.storage || (window && window.localStorage);
  if (!storage) {
    throw new Error('Can not write the storage!');
  }
  ignore = options.ignore || [];
  key = options.key || 'vuex';

  function canWriteStorage() {
    try {
      storage.setItem('@@', '@@');
      storage.removeItem('@@');
      return true;
    } catch (e) {
    }
    return false;
  }

  function getState(key, storage, value) {
    try {
      return (value = storage.getItem(key)) && typeof value !== 'undefined' ?
        JSON.parse(value)
        : undefined;
    } catch (e) {
    }
    return undefined;
  }

  function setState(key, state, storage) {
    state = Object.assign({}, state);
    for (let i in ignore) {
      if (ignore.hasOwnProperty(i)) {
        delete state[ignore[i]];
      }
    }
    return storage.setItem(key, JSON.stringify(state));
  }

  return (store) => {
    if (!canWriteStorage()) {
      throw new Error('Can not write the storage!');
    }
    const state = getState(key, storage);
    for (let key in state) {
      if (state.hasOwnProperty(key) && !~ignore.indexOf(key)) {
        store.commit(key, state[key]);
      }
    }
    store.subscribe((mutation, state) => {
      setState(key, state, storage);
    });
  };
};