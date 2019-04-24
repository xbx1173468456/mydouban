import storage from 'good-storage'

const USER_KEY = '__user__'
export default class User {
  constructor({ id, avatar, name }) {
    this.id = id
    this.avatar = avatar
    this.name = name
  }
}
export const cacheUser = function(user) {
  const info = new User({
    id: user.account.id,
    avatar: user.profile.avatarUrl,
    name: user.profile.nickname
  })
  storage.set(USER_KEY, info)
  return info
}