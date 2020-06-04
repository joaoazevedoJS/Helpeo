const Token_Key = "@Helpeo_user_token"

export const getToken = () => localStorage.getItem(Token_Key)
export const login = token => localStorage.setItem(Token_Key, token)
export const logout = () => localStorage.removeItem(Token_Key)
