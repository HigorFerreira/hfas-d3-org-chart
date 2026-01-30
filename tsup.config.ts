import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: {
			index: "src/exports/index.ts",
		},
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		clean: true,
		splitting: false,
		treeshake: true,

		banner: {
			js: '"use client";',
		},

		external: [ './hooks', './provider' ]

		// IMPORTANT: bundle dependencies like d3-org-chart into the output
		// tsup (esbuild) often externalizes deps automatically; force-bundle these:
		// noExternal: ["d3-org-chart", "d3-hierarchy", "d3-selection", "d3-shape", "d3-zoom"],
		// If your OrgChart pulls other d3 subpackages, add them too.
	},
	{
		entry: {
			provider: "src/exports/provider.ts",
		},
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		clean: true,
		splitting: false,
		treeshake: true,

		banner: {
			js: '"use client";',
		},

		external: [ './hooks', './provider' ]

		// IMPORTANT: bundle dependencies like d3-org-chart into the output
		// tsup (esbuild) often externalizes deps automatically; force-bundle these:
		// noExternal: ["d3-org-chart", "d3-hierarchy", "d3-selection", "d3-shape", "d3-zoom"],
		// If your OrgChart pulls other d3 subpackages, add them too.
	},
	{
		entry: {
			hooks: "src/exports/hooks.ts",
		},
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		clean: true,
		splitting: false,
		treeshake: true,

		banner: {
			js: '"use client";',
		},

		external: [ './hooks', './provider' ]

		// IMPORTANT: bundle dependencies like d3-org-chart into the output
		// tsup (esbuild) often externalizes deps automatically; force-bundle these:
		// noExternal: ["d3-org-chart", "d3-hierarchy", "d3-selection", "d3-shape", "d3-zoom"],
		// If your OrgChart pulls other d3 subpackages, add them too.
	},
]);
