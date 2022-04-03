import { existsSync, mkdirSync } from 'fs';

export function checkPath(path: string) {
   if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
   }
}
