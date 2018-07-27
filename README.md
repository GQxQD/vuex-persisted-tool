# vuex-persisted-tool
Persist Vuex state with localStorage or other storages.

# Installation
```bash
$ npm install vuex-persisted-tool --save
```

# Usage
```js
import createPersistedState from 'vuex-persisted-tool'

const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState()]
})
```

# Customize Storage
```js
import { Store } from 'vuex'
import createPersistedState from 'vuex-persisted-tool'
import * as Cookies from 'js-cookie'

const store = new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      },
      // ignore some states
      ignore: ['someinfo', 'userinfo'],
    })
  ]
})
```

# License
MIT