import storage from 'good-storage'

const USER_KEY = '__user__'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  const index = searches.findIndex((val) => {
    return val === query
  })
  if (index >= 0) {
    searches.splice(index, 1)
  }
  searches.unshift(query)
  if (searches.length > SEARCH_MAX_LENGTH) {
    searches.pop()
  }
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  const index = searches.findIndex((val) => {
    return val === query
  })
  if (index > -1) {
    searches.splice(index, 1)
  }
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY)
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  const index = songs.findIndex((item) => {
    return item.id === song.id
  })
  if (index > -1) {
    songs.splice(index, 1)
  }
  songs.unshift(song)
  if (songs.length > PLAY_MAX_LENGTH) {
    songs.pop()
  }
  storage.set(PLAY_KEY, songs)
  return songs
}
export function deletePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  const index = songs.findIndex(item => {
    return item.id === song.id
  })
  if (index > -1) {
    songs.splice(index, 1)
  }
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY)
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  const index = songs.findIndex((item) => {
    return item.id === song.id
  })
  if (index > -1) {
    songs.splice(index, 1)
  }
  songs.unshift(song)
  if (songs.length > FAVORITE_MAX_LENGTH) {
    songs.pop()
  }
  storage.set(FAVORITE_KEY, songs)
  return songs
}
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  const index = songs.findIndex((item) => {
    return item.id === song.id
  })
  if (index > -1) {
    songs.splice(index, 1)
  }
  storage.set(FAVORITE_KEY, songs)
  return songs
}
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

export function getUser() {
  let ret = storage.get(USER_KEY, '')
  return ret
}