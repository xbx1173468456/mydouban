import { getLyric } from 'api/index'
import { lyricParse } from './util'

export default class Song {
  constructor({ id, singer, name, album, desc, duration, image, url }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.desc = desc
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        if (res.data.code === 200) {
          if (res.data.lrc) {
            this.lyric = lyricParse(res.data.lrc.lyric)
            resolve(this.lyric)
          } else {
            reject(new Error('no lyric'))
          }
        }
      })
    })
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    desc: musicData.alia[0],
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl,
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}
export function createSearchSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    desc: musicData.alias[0],
    duration: musicData.duration / 1000,
    image: musicData.artists.picUrl || '',
    url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}
function filterSinger(singers) {
  if (!singers) {
    return
  }
  let ret = []
  for (let item of singers) {
    ret.push(item.name)
  }
  return ret.join('/')
}