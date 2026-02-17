import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class DynamicPriceAPI extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://dynamic-pricing-api-94ae60254122.herokuapp.com', context, options)
  }

  public async getPrice(skuId: string): Promise<any> {
    try {
      const response = await this.http.get(
        `/api/prices/${skuId}?action=buy`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      )

      return response
    } catch (error) {
      console.error('DynamicPriceAPI error:', error)
      throw error
    }
  }
}
