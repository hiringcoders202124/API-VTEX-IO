export async function getProducts(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { catalog },
  } = ctx

  console.info('Received code:', code)

  const sku = await catalog.getProductsAndSkus(0, 10)
  ctx.body = sku


  await next()
}

