[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
![GitHub package.json version](https://img.shields.io/github/package-json/v/iqb-berlin/verona-modules-nemo?style=flat-square)

# IQB Widget Player

Demo player implementing verona widget calls


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


### Build Widget Player Html File
The Verona Interface Specification requires all programming to be built in one single html file. All styles and images need to be packed in one file.

```
npm run build
```
This way, the Angular application is built into the folder `dist` .

```
npm run postbuild
```
Packs the application into the file `dist/verona-player-widget/browser/index_packed.html`. This way, one can try out the player via GitHub pages. The helper menu will show up when the player is started without host.


### Release

Please copy the `dist/verona-player-widget/browser/index_packed.html` file locally, rename it to `iqb-player-widget-<version>.html`
and load it as artifact into the release.

For more information about the Verona Widgets, see the [documentation](https://verona-interfaces.github.io/widget-docs/).
