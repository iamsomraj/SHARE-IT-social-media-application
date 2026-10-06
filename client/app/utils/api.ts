import type { ApiEnvelope, OperationResult } from '~/types/common'

interface ApiRequestOptions {
  method?: 'GET' | 'POST'
  body?: Record<string, unknown>
  token?: string | null
}

/** Calls the SHARE-IT API and returns its `{ state, message, data }` envelope. */
export const apiRequest = <T>(
  path: string,
  { method = 'GET', body, token }: ApiRequestOptions = {}
): Promise<ApiEnvelope<T>> => {
  const { apiBase } = useRuntimeConfig().public

  return $fetch<ApiEnvelope<T>>(path, {
    baseURL: apiBase,
    method,
    body,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
}

/** Prefers the API's own error message over the generic fetch error. */
export const getErrorMessage = (error: unknown, fallback: string): string => {
  const apiMessage = (error as { data?: { message?: unknown } } | null)?.data
    ?.message
  if (typeof apiMessage === 'string' && apiMessage) {
    return apiMessage
  }
  return error instanceof Error && error.message ? error.message : fallback
}

/**
 * Runs an API request and normalizes the outcome for store actions,
 * so components only deal with `{ success, data, error, message }`.
 */
export const toOperationResult = async <T>(
  request: Promise<ApiEnvelope<T>>,
  fallbackError: string
): Promise<OperationResult<T>> => {
  try {
    const response = await request
    return response.state
      ? { success: true, data: response.data, message: response.message }
      : { success: false, error: response.message || fallbackError }
  } catch (error: unknown) {
    return { success: false, error: getErrorMessage(error, fallbackError) }
  }
}
