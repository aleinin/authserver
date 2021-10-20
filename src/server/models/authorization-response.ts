export const createAuthResponse = <T>(
  success: boolean,
  message?: string,
  data?: T
): AuthorizationResponse<T> => ({
  success,
  message,
  data,
})

export interface AuthorizationResponse<T> {
  success: boolean
  message?: string
  data?: T
}
