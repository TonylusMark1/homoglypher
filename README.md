# Homoglypher

Homoglypher is a utility library designed to normalize homoglyphs in strings to their ASCII equivalents based on `confusables.txt` from `https://www.unicode.org/Public/security/latest/confusables.txt`

## Features

- Detects and replaces Unicode homoglyphs with ASCII characters.
- Utilizes the latest Unicode confusables list.

## Installation

```bash
npm install homoglypher
```

Use again if you want to be sure that confusables.txt is up to date.

## Usage

```typescript
import { Homoglypher } from 'homoglypher';

const input = '𝓐𝓑𝓒 is fancy but should become ABC.';
const normalized = Homoglypher.Normalize(input);

console.log(normalized); // Output: ABC is fancy but should become ABC.
```

## License

ISC © Tonylus
