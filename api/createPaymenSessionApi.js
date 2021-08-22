import { api } from '~/api/api'

export const createPaymentSessionApi = (data) => api.post('/create-checkout-session', data)
