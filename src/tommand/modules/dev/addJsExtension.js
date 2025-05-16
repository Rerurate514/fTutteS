import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directory = './dist';

function addJsExtension(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            addJsExtension(fullPath);
        } else if (file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/(from\s+['"])(\.\.?\/[^"']*?)(['"])/g, '$1$2.js$3');
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    });
}

addJsExtension(directory);

console.log('Successfully added .js extensions to import statements in the dist directory.');
