import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

type Lead = {
  "userEmail": string,
  "userType": string,
  "clientSince": string,
  "lastModified": string,
  "id": string,
  "phone": string,
  "name": string
}

type objectLead = {
  Items: Lead[]
}

export default class Leads extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://i6328uam31.execute-api.us-east-2.amazonaws.com/prod/leads',
      context,
      options
    )
  }

  public async getLeads(): Promise<objectLead> {
    return this.http.get('', {
      metric: 'lead-get',
    })
  }

  public async createClient(name: string, phone: string, email: string): Promise<string> {
    return this.http.post('',
      {
        name,
        phone,
        userEmail: email,
        userType: "client"
      },
      {
        metric: 'lead-post',
      })
  }

  public async createProspect(name: string, phone: string, email: string): Promise<string> {
    return this.http.post('',
      {
        name,
        phone,
        userEmail: email,
        userType: "prospect"
      },
      {
        metric: 'lead-post',
      })
  }

  public async setLeadAsClient(leadId: string): Promise<string> {
    return this.http.patch(leadId, {
      userType: "client"
    },
      {
        metric: 'lead-patch',
      })
  }
}