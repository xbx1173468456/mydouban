export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const random = (Math.random() * (_arr.length - i) | 0) + i;
    [_arr[random], _arr[i]] = [_arr[i], _arr[random]]
  }
  return _arr
}
export function lyricParse(lrc) {
  const lyricArr = lrc.split('\n')
  const ret = []
  const timeReg = /\[(\d{2,}):(\d{2,}\.\d{2,3})\]/g
  for (let i = 0; i < lyricArr.length; i++) {
    const result = timeReg.exec(lyricArr[i])
    if (!result) {
      continue
    }
    const minute = parseFloat(result[1])
    const second = parseFloat(result[2])
    const time = minute * 60 + second
    const txt = lyricArr[i].replace(timeReg, '')
    if (txt) {
      ret.push({ time, txt })
    }
  }
  return ret
}
export function debounce(fn, delay) {
  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
