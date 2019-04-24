import { playMode } from 'assets/js/config'
import { loadSearch, loadPlay, loadFavorite, getUser } from 'assets/js/cache'

const state = {
  playing: false,
  playlist: [],
  sequenceList: [],
  currentIndex: -1,
  playMode: playMode.sequence,
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite(),
  user: getUser()
}
export default state