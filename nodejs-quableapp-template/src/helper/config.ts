import * as fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export async function setupAppConfig(app: any) {
  const filePath = path.join(process.cwd(), 'quable.app.yml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const appConf = yaml.parse(fileContent);
  Object.keys(appConf).forEach((key) => {
    app.set(key, appConf[key]);
  });
  
  // Set default permissions for Quable PIM scope
  if (!app.get('quable_pim_scope')) {
    app.set('quable_pim_scope', ['full_access']);
  }
}
