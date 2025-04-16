import { ConfusablesParser } from './ConfusablesParser.js';

//

interface Options {
    custom?: Map<string, string> | Record<string, string>;
}

interface NormalizeOptions {
    onChange?: (slice: string, replacement: string) => void;
    skipCustom?: boolean;
}

//

export class Homoglypher {
    private static readonly parser = new ConfusablesParser();

    //

    private readonly custom: Map<string, string> = new Map();
    private readonly maxLen: number;

    //

    constructor(o?: Options) {
        this.custom = o?.custom instanceof Map ? o.custom : new Map(Object.entries(o?.custom ?? {}));

        //

        const customMaxLen = Math.max(...Array.from(this.custom.keys()).map(k => k.length), 1);

        //

        this.maxLen = Math.max(Homoglypher.parser.getMaxSourceLength(), customMaxLen, 1);
    }

    //

    public normalize(input: string, o?: NormalizeOptions) {
        let output = '';
        let i = 0;

        //

        while (i < input.length) {
            let matched = false;

            const sliceMax = Math.min(this.maxLen, input.length - i);

            //

            for (let len = sliceMax; len > 0; len--) {
                const slice = input.slice(i, i + len);
                const replacement = this.findReplacement(slice, o?.skipCustom);

                if (replacement !== undefined) {
                    o?.onChange?.(slice, replacement);

                    output += replacement;
                    i += len;
                    
                    matched = true;

                    break;
                }
            }

            //

            if (!matched) {
                output += input[i];
                i++;
            }
        }

        return output;
    }

    public findReplacement(input: string, skipCustom?: boolean) {
        return (!skipCustom ? this.custom?.get(input) : undefined) ?? Homoglypher.parser.getReplacement(input);
    }
}
