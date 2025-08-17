import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { defineEventHandler, createError, sendError } from 'h3'

export default defineEventHandler((event) => {
  const url = event.node.req.url || ''
  if (!url.startsWith('/_nuxt/builds/meta/dev.json')) return

  try {
    const metaDir = join(process.cwd(), '.output', 'public', '_nuxt', 'builds', 'meta')
    const files = readdirSync(metaDir).filter(f => f.endsWith('.json'))
    if (files.length === 0) return sendError(event, createError({ statusCode: 404, statusMessage: 'no meta files' }))
    const filePath = join(metaDir, files[0])
    const content = readFileSync(filePath, 'utf-8')
    event.node.res.setHeader('content-type', 'application/json')
    event.node.res.end(content)
    return
  } catch (err) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'dev meta handler error' }))
  }
})

