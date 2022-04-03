import { readFileSync, writeFile } from 'fs';
import { join } from 'path';

(() => {
   const package_json = JSON.parse(
      readFileSync(join(__dirname, './package.json'), 'utf-8'),
   ) as typeof import('./package.json');

   writeFile(
      join(__dirname, 'dist', './package.json'),
      JSON.stringify({
         name: package_json.name,
         version: package_json.version,
         main: package_json.main,
         script: {
            start: package_json.scripts['start:prod'],
         },
         dependencies: package_json.dependencies,
      }),
      { encoding: 'utf-8' },
      (err) => {
         if (err) {
            console.log('Error: ', err);
         }
      },
   );
})();
