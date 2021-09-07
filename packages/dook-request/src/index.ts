import { Client } from './Client'

const client = new Client()

const { request, configure } = client

export * from './types'
export { Client } from './Client'
export { request, configure }
