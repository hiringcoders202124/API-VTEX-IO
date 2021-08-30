import { UserInputError } from '@vtex/api'

export async function validateOrder(ctx: Context, next: () => Promise<any>) {
    const {
        vtex: {
            route: { params },
        },
    } = ctx
    console.log("TOKEN")
    console.log(ctx.vtex.authToken)
    console.info('Received params:', params)

    const { id } = params

    if (!id) {
        throw new UserInputError('Code is required') // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
    }



    if (typeof id !== 'string') {
        return next()
    }

    ctx.state.id = id

    console.log(id)

    await next()
}
