import Table from 'cli-table3';
import stringWidth from 'string-width';

import { Homoglypher } from '../../src/index.js';

//

const homoglypher = new Homoglypher();

//

export function NormalizeAndVisualize(input: string) {
    const changes: Record<string, string> = {};

    const normalized = homoglypher.normalize(input, {
        onChange: (slice, replacement) => {
            changes[slice] = replacement;
        }
    });

    console.log("INPUT:     ", JSON.stringify(input));
    console.log("NORMALIZED:", JSON.stringify(normalized));

    if (Object.keys(changes).length) {
        const table = new Table({
            head: ['Source (len)', 'Replacement (len)', 'Source code points', 'Replacement code points'],
            style: { head: [], border: [] },
            colWidths: [], // auto
            wordWrap: true,
            stringLength: stringWidth,
        } as any);

        for (const [slice, replacement] of Object.entries(changes)) {
            table.push([
                slice,
                replacement,
                [...slice].map(c => c.codePointAt(0)).join(", "),
                [...replacement].map(c => c.codePointAt(0)).join(", ")
            ]);
        }

        console.log(table.toString());
    }
}
