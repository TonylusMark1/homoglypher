import { ConfusablesParser } from './ConfusablesParser.js';

//

export class Homoglypher {
    private static readonly parser = new ConfusablesParser();

    //

    public static Normalize(input: string, onChange?: (slice: string, replacement: string) => void) {
        const maxLen = this.parser.getMaxSourceLength();
        let output = '';
        let i = 0;

        while (i < input.length) {
            let matched = false;

            const sliceMax = Math.min(maxLen, input.length - i);

            for (let len = sliceMax; len > 0; len--) {
                const slice = input.slice(i, i + len);
                const replacement = this.parser.getReplacement(slice);

                if (replacement !== undefined) {
                    onChange?.(slice, replacement);

                    output += replacement;
                    i += len;
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                output += input[i];
                i++;
            }
        }

        return output;
    }
}
