import * as TSUP from 'tsup';

//

export default TSUP.defineConfig({
    entry: ['examples/*.ts'],
    outDir: "dist-examples",
    format: ['esm'],
    sourcemap: false,
    clean: true,
    dts: false,

    esbuildOptions(options) {
        options.chunkNames = 'common/index-[hash]'; // <-- zmienia _chunks na chunks/
    }
});