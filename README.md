# Homoglypher

Homoglypher is a utility library designed to normalize homoglyphs in strings to their ASCII equivalents based on `confusables.txt` from `https://www.unicode.org/Public/security/latest/confusables.txt`

## Features

- Detects and replaces Unicode homoglyphs with ASCII characters.
- Utilizes the latest Unicode confusables list.

## Installation

```bash
npm install homoglypher
```

Data in `confusables.txt` are automatically updated on install (via postinstall script).

## Usage

Simple usage:
```typescript
import { Homoglypher } from 'homoglypher';

const homoglypher = new Homoglypher();

const input = '𝓐𝓑𝓒 is fancy but should become ABC.';
const normalized = homoglypher.normalize(input);

console.log(normalized); // Output: ABC is fancy but should become ABC.
```

Custom mapping:
```typescript
const homoglypher = new Homoglypher({
  custom: { // can be ES6 Map too
    'æ': 'ae'
  }
});
```

Event handling:
```typescript
const homoglypher = new Homoglypher();

const normalized = homoglypher.normalize(input, {
  onChange: (slice, replacement) => {
    console.log(`Replaced "${slice}" → "${replacement}"`);
  }
});
```

## License

ISC © Tonylus
