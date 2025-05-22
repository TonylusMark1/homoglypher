import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

//

// @ts-ignore
const script_filename = typeof import.meta ? url.fileURLToPath(import.meta.url) : __filename;
const script_dirname = path.dirname(script_filename);

//

export class ConfusablesParser {
    private mapping: Map<string, string> = new Map();
    private maxSourceLength = 1;

    //

    constructor() {
        const filePath = path.join(script_dirname, '../..', 'assets', 'confusables.txt');
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const lines = fileContent.split('\n');

        //

        for (const line of lines) {
            if (!line || line.startsWith('#'))
                continue;

            //

            const parts = line.split(';').map(p => p.trim());

            if (parts.length < 2)
                continue;

            //

            const sourceHex = parts[0].split(' ');
            const targetHex = parts[1].split(' ');

            const sourceChars = sourceHex
                .map(hex => String.fromCodePoint(parseInt(hex, 16)));

            const targetChars = targetHex
                .map(hex => String.fromCodePoint(parseInt(hex, 16)));

            //

            const isTargetAscii = targetChars.every(char => char.charCodeAt(0) <= 0x7F);
            const isSourceOnlyAscii = sourceChars.every(char => char.charCodeAt(0) <= 0x7F);

            if (!isTargetAscii || isSourceOnlyAscii)
                continue;

            //

            const source = sourceChars.join('');
            const target = targetChars.join('');

            //

            this.mapping.set(source, target);

            //

            if (source.length > this.maxSourceLength)
                this.maxSourceLength = source.length;
        }
    }

    //

    public getMappingKeys() {
        return this.mapping.keys();
    }

    public getReplacement(source: string) {
        return this.mapping.get(source);
    }

    public getMaxSourceLength() {
        return this.maxSourceLength;
    }
}
