import { ConfusablesParser } from './ConfusablesParser/index.js';

//

export interface Options {
    custom?: Map<string, string> | Record<string, string>;
}

export interface NormalizeOptions {
    onChange?: (slice: string, replacement: string) => void;
    skipCustom?: boolean;
}

//

export default class Homoglypher {
    private static readonly parser = new ConfusablesParser();

    //

    private readonly custom: Map<string, string> = new Map();
    private readonly firstChars: Set<string> = new Set();
    private readonly maxLen: number;

    //

    constructor(o?: Options) {
        this.custom = o?.custom instanceof Map ? o.custom : new Map(Object.entries(o?.custom ?? {}));

        this.firstChars = new Set([...Homoglypher.parser.getMappingKeys(), ...this.custom.keys()].map(s => s[0]));

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

        const sliceMax = Math.min(this.maxLen, input.length - i);

        //

        while (i < input.length) {
            // Zamiast za każdym razem od razu próbować wszystkich długości od maxLen do 1, najpierw sprawdź, czy aktualny znak w ogóle występuje jako początek jakiegokolwiek klucza w mapie.

            if (!this.firstChars.has(input[i])) {
                output += input[i];
                i++;
                continue;
            }

            // dopiero teraz wchodzimy w pętlę po długościach slice’ów

            //

            let matched = false;

            //

            for (let len = sliceMax; len > 0; len--) {
                const slice = input.substring(i, i + len);
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

export { Homoglypher };