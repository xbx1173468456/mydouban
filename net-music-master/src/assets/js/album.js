import { getAlbumSong } from 'api/index'
import { createSong } from 'assets/js/song'

export default class Album {
  constructor({ id, name, singer, image, publishTime }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.image = image
    this.publishTime = new Date(publishTime).toLocaleString()
    this.songs = []
  }
  getAlbumSongs() {
    if (this.songs.length) {
      return Promise.resolve(this.songs)
    }
    return new Promise((resolve, reject) => {
      getAlbumSong(this.id).then(res => {
        if (res.data.code === 200) {
          this.songs = normalizeSongs(res.data.songs)
          resolve(this.songs)
          const {
            commentCount,
            shareCount
          } = res.data.album.info
          this.info = Object.assign({ commentCount, shareCount }, { description: res.data.album.description })
        } else {
          reject(new Error('no songs'))
        }
      })
    })
  }
}
export function createAlbum(album) {
  return new Album({
    id: album.id,
    name: album.name,
    singer: album.artist.name,
    image: album.picUrl,
    publishTime: album.publishTime
  })
}

function normalizeSongs(songs) {
  let ret = []
  songs.forEach(song => {
    if (song.id) {
      ret.push(createSong(song))
    }
  })
  return ret
  // return songs.reduce((pre, cur) => {
  //   return [...pre, { id: cur.id, url: `https://music.163.com/song/media/outer/url?id=${cur.id}.mp3`, name: cur.name, duration: cur.dt / 1000 }]
  // }, [])
}