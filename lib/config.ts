import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'yaml'

let cachedConfig: { quable_pim_scope: string[] } | null = null

export function getAppConfig() {
  if (cachedConfig) return cachedConfig

  try {
    const configPath = join(process.cwd(), 'quable.app.yml')
    const fileContent = readFileSync(configPath, 'utf8')
    const config = parse(fileContent)
    cachedConfig = {
      quable_pim_scope: config.quable_pim_scope || ['full_access'],
    }
    return cachedConfig
  } catch (error) {
    console.error('Failed to load app config:', error)
    return { quable_pim_scope: ['full_access'] }
  }
}
