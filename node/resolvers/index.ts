/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { json } from 'co-body'

export const resolvers = {
  Routes: {
    DynamicPriceAPI: async (ctx: Context) => {
      ctx.set('Content-Type', 'application/json')
      ctx.set('Cache-Control', 'no-cache, no-store')
      ctx.set('Accept','application/json')
      let body = await json(ctx.req, { limit: '1mb' }) || {}
      const skuId = (body && body.skuId) || (ctx.query && ctx.query.skuId)
      if (!skuId) {
        ctx.response.status = 400
        ctx.response.body = { status: 'error', isSuccess: false, message: 'Missing required parameter: skuId' }
        return
      }
      try {
        const data: any = await ctx.clients.DynamicPriceAPI.getPrice(skuId)
        ctx.response.status = 200
        ctx.response.body = { status: 'success', isSuccess: true, data }
      } catch (error) {
        console.error('DynamicPriceAPI error:', error)
        ctx.response.status = error?.response?.status || 500
        ctx.response.body = error?.response?.data || { message: error.message }
      }
    }
  },
}
