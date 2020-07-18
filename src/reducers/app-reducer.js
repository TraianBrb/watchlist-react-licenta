export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const SET_USER = 'SET_USER';
export const IS_LOADING = 'IS_LOADING';

export const initialAppState = {
  user: JSON.parse(localStorage.getItem('user'))
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      if(!!action.user) {
        localStorage.setItem('user', JSON.stringify(action.user));
      } else {
        localStorage.removeItem('user');
      }
      return {
        ...state,
        user: action.user
      };
    case IS_LOADING: 
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return {
        ...state
      }
  }
}