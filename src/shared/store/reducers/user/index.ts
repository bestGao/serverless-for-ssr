import { Action } from 'redux'

export interface IUserState {
  id: number
  name: string
  avatar: string
}

export interface IUserAction extends Action<'add_user'> {
  payload: IUserState
}

const user = (state: IUserState = { id: 0, name: '', avatar: '' }, action: IUserAction) => {
  switch (action.type) {
    case 'add_user': {
      return {
        ...action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default user
