export async function someStates(ctx: StatusChangeContext, next: () => Promise<any>) {
    const orderId = ctx.body.orderId

    const order = await ctx.clients.oms.order(orderId)

    const { firstName, lastName, email, phone, userProfileId } = order.clientProfileData

    const profileName = firstName + ' ' + lastName

    const lead = await ctx.clients.leads.getLead(userProfileId)
    console.log(userProfileId, profileName)
    console.log('lead:', lead)

    const leadExists = !!lead

    if (leadExists) {
        console.log("EXISTIU")
        await ctx.clients.leads.setLeadAsClient(userProfileId)
    }
    else {
        console.log("NÃO EXISTIU")
        const createLead = await ctx.clients.leads.createLead(profileName, phone, email)

        console.log(createLead)

        await ctx.clients.leads.setLeadAsClient(userProfileId)
    }

    await next()
}
