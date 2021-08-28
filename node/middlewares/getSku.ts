export async function getSku(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { catalog },
  } = ctx

  console.info('Received code:', code)

  const sku = await catalog.getSkuById('' + code)
  ctx.body = sku


  await next()
}
