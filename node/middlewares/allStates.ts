export async function allStates(_ctx: StatusChangeContext, next: () => Promise<any>) {
    await next()
}
