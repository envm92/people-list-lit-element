// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import rollupLitcss from 'rollup-plugin-lit-css';
import { fromRollup } from '@web/dev-server-rollup';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');
const litcss = fromRollup(rollupLitcss);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  open: '/demo/',
  watch: !hmr,

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  /** Confgure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },
  mimeTypes: {
      '**/*.css': 'js',
  },
  plugins: [
    litcss({ include: ['./node_modules/leaflet/dist/*.css'] })
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
  ],

  // See documentation for all available options
});
