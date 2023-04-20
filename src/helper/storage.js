import { TOKEN_KEY, REFRESH_TOKEN_KEY } from './consts'

const Storage = {
  get(key, defaultValue = '') {
    const value = localStorage.getItem(key)

    return value ? value : defaultValue
  },

  set(key, value = '') {
    localStorage.setItem(key, value)
  },

  remove(key) {
    localStorage.removeItem(key)
  },

  getAccessToken() {
    return this.get(TOKEN_KEY)
  },

  setAccessToken(token) {
    this.set(TOKEN_KEY, token)
  },

  setRefreshToken(token) {
    this.set(REFRESH_TOKEN_KEY, token)
  },

  getRefreshToken() {
    return this.get(REFRESH_TOKEN_KEY)
  },

  removeToken() {
    this.remove(TOKEN_KEY)
    this.remove(REFRESH_TOKEN_KEY)
  },

  clearAll() {
    localStorage.clear()
  }
}

export default Storage
