import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3000' : ''

export const getPersonalized = function() {
  return axios.get('/personalized')
}
export const getPlaylistDetails = function(id) {
  return axios.get('/playlist/detail', {
    params: {
      id
    }
  })
}
export const getRank = function() {
  return axios.get('/toplist')
}
export const getLyric = function(id) {
  return axios.get('/lyric', {
    params: {
      id
    }
  })
}
export const getComment = function(id, limit = 20) {
  return axios.get('/comment/music', {
    params: {
      id,
      limit
    }
  })
}
export const getKeys = function(keywords, offset, limit) {
  return axios.get('/search', {
    params: {
      keywords,
      limit: 30,
      offset
    }
  })
}
export const getSongDetails = function(ids) {
  return axios.get('/song/detail', {
    params: {
      ids
    }
  })
}
export const getHotKey = function() {
  return axios.get('/search/hot')
}
export const getTopSinger = function() {
  return axios.get('/toplist/artist')
}
export const getSingers = function(initial) {
  return axios.get('/artist/list', {
    params: {
      initial
    }
  })
}
export const getSingerDetail = function(id) {
  return axios.get('/artists', {
    params: {
      id
    }
  })
}
export const getSingerDesc = function(id) {
  return axios.get('/artist/desc', {
    params: {
      id
    }
  })
}
export const getSingerAlbum = function(id) {
  return axios.get('/artist/album', {
    params: {
      id
    }
  })
}
export const getAlbumSong = function(id) {
  return axios.get('/album', {
    params: {
      id
    }
  })
}
export const getUser = function(account, password) {
  return axios.get('/login/cellphone', {
    params: {
      phone: account,
      password
    }
  })
}
export const getEmailUser = function(account, password) {
  return axios.get('/login', {
    params: {
      email: account,
      password
    }
  })
}
