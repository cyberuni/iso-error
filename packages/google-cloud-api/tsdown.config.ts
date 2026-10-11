import { defineConfig } from 'tsdown'

/**
 * One output, `esm/**`: one file per source module.
 *
 * The package is ESM only. `require()` of it still works on Node 20.19+ and 22.12+,
 * which load ES modules through `require()` without a flag.
 */
export default defineConfig({
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	format: 'esm',
	outDir: 'esm',
	platform: 'neutral',
	target: 'es2020',
	unbundle: true,
	sourcemap: true,
	dts: { sourcemap: true },
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	clean: ['esm']
})
