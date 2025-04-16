import https from 'https';
import fs from 'fs';
import path from 'path';
import url from 'url'

//

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//

const fileURL = 'https://www.unicode.org/Public/security/latest/confusables.txt';
const outputPath = path.join(__dirname, '..', 'assets', 'confusables.txt');

//

console.log(`🔍 Fetching the latest 'confusables.txt' file from Unicode...`);

https.get(fileURL, (res) => {
    if (res.statusCode !== 200) {
        console.error(`❌ Błąd pobierania: ${res.statusCode}`);
        res.resume();
        return;
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        fs.writeFileSync(outputPath, data, 'utf8');
        console.log(`✅ File 'confusables.txt' saved to ${outputPath}`);
    });
}).on('error', (err) => {
    console.error(`❌ Error downloading file: ${err.message}`);
});