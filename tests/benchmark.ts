import { Homoglypher } from '@/src/index.js'
//

const startAt = Date.now();

for ( let i = 0; i < 10000; i++ ) {
    Homoglypher.Normalize(`𝓐𝓑𝓒 is fancy but should become ABC. 𝗣𝗮𝘆𝗣𝗮𝗹 is styled fake PayPal. Техт с emoji 🚀 and homoglyph ωоn free iPhone! 📱`);
}

console.log(`elapsed seconds: ${(Date.now() - startAt) / 1000}`);
