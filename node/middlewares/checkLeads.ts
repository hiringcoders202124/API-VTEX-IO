export async function checkLeads(ctx: StatusChangeContext, next: () => Promise<any>) {

    const orderId = ctx.body.orderId

    const order = await ctx.clients.oms.order(orderId)

    const { firstName, lastName, email, phone } = order.clientProfileData

    const profileName = firstName + ' ' + lastName

    const lead = await ctx.clients.leads.getLeads()

    const phoneSearchResult = lead.Items.find(x => x.phone === phone)

    const leadId = phoneSearchResult?.id

    if (leadId !== undefined)
        await ctx.clients.leads.setLeadAsClient(leadId)
    else {
        await ctx.clients.leads.createLead(profileName, phone, email)
    }

    await next()
}
