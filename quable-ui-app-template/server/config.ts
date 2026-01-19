import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'yaml'
import type { Application } from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function setupAppConfig(app: Application) {
  try {
    const configPath = join(__dirname, '../quable.app.yml')
    const fileContent = readFileSync(configPath, 'utf8')
    const config = parse(fileContent)

    app.set('quable_pim_scope', config.quable_pim_scope)

    console.log('App config loaded successfully')
  } catch (error) {
    console.error('Failed to load app config:', error)
    throw error
  }
}
