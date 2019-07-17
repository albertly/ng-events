export const selectUser = state => state.user;

export const isAuth = state => !!state.user.token;