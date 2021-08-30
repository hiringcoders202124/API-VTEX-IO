import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'



export default class Leads extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://i6328uam31.execute-api.us-east-2.amazonaws.com/prod/leads',
      context,
      options
    )
  }


  public async getLead(leadId: string): Promise<string> {
    return this.http.get(leadId, {
      metric: 'lead-get',
    })
  }

  public async createLead(name: string, phone: string, email: string): Promise<string> {
    return this.http.post('',
      {
        name,
        phone,
        userEmail: email
      },

      {
        metric: 'lead-post',
      })
  }

  public async setLeadAsClient(leadId: string): Promise<string> {
    console.log("SETANDO COMO CLIENT O", leadId)
    return this.http.patch(leadId, {
      userType: "client"
    },
      {
        metric: 'lead-patch',
      })
  }
}