export async function someStates(ctx: StatusChangeContext, next: () => Promise<any>) {

    const orderId = ctx.body.orderId

    const order = await ctx.clients.oms.order(orderId)

    const { firstName, lastName, email, phone } = order.clientProfileData

    const profileName = firstName + ' ' + lastName

    const orderPhone = phone

    const lead = await ctx.clients.leads.getLeads()

    const phoneSearchResult1 = lead.Items.find(x => x.phone === orderPhone)

    const leadId = phoneSearchResult1?.id

    const leadExists = !!leadId

    if (leadExists) {
        if (leadId !== undefined)
            await ctx.clients.leads.setLeadAsClient(leadId)
    }
    else {
        await ctx.clients.leads.createLead(profileName, phone, email)
    }



    //notepad

    await next()
}
