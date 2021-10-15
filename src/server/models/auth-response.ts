export interface AuthResponse {
  success: boolean
  message?: string
}

export const createAuthResponse = (
  success: boolean,
  message?: string
): AuthResponse => ({
  success,
  message,
})
