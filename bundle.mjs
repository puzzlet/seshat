import esbuild from "esbuild";

esbuild.build({
  logLevel: 'info',
  entryPoints: [
    'egyptianNumber.ts',
    'seshat.ts',
  ],
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: 'external',
  outdir: 'build/lib/',
  define: {
    'process.env.NODE_DEBUG': 'false',
  },
})
  .catch((reason) => process.exit(1))
  ;

const options = {
  logLevel: 'info',
  entryPoints: [
    'seshatStandardLibrary.ts',
    'seshatToJavascript.ts',
  ],
  bundle: true,
  minify: true,
  platform: 'neutral',
  sourcemap: 'external',
  outdir: 'build/lib/',
  mainFields: ['module', 'main'],
  define: {
    'process.env.NODE_DEBUG': 'false',
  },
};

if (process.argv.length > 2 && process.argv[2] == '--serve') {
  (await esbuild.context(options))
    .serve({
      servedir: 'build/',
    })
    .catch((reason) => process.exit(1))
    ;
}
else {
  esbuild.build(options)
    .catch((reason) => process.exit(1))
    ;
}
