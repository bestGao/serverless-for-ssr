export interface IUser {
  userId: number
  username: string
  nickname: string
  avatarInfo: string
  actived: boolean
}

export interface IStoreState {
  user: Partial<IUser>
}
