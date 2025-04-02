export async function customEndpoint(ctx: Context, next: () => Promise<any>) {
  ctx.body = {
    message: 'This is your custom endpoint',
    timestamp: new Date().toISOString(),
  }

  ctx.set('Cache-Control', 'no-cache')
  ctx.status = 200
  await next()
}
