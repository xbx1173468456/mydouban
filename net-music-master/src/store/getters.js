import Song from 'assets/js/song'
export const playing = state => state.playing
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const playMode = state => state.playMode
export const currentIndex = state => state.currentIndex
export const currentSong = state => {
  return state.playlist[state.currentIndex] || []
}
export const searchHistory = state => state.searchHistory
export const playHistory = state => {
  return state.playHistory.map(item => {
    return Object.assign(new Song({ ...item }), { lyric: item.lyric })
  })
}
export const favoriteList = state => {
  return state.favoriteList.map(item => {
    return Object.assign(new Song({ ...item }), { lyric: item.lyric })
  })
}
export const user = state => state.user
