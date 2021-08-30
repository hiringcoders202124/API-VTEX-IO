export async function getOrder(ctx: Context, next: () => Promise<any>) {
    const {
        state: { id },
        clients: { oms },
    } = ctx
    console.log(ctx.vtex.authToken)


    //console.log("PASSOU AQUI", id)
    const order = await oms.order(id, "AUTH_TOKEN")
    ctx.body = order

    // const profileId = order.clientProfileData.userProfileId

    await next()
}
