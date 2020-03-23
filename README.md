# Vuukle Social App

publishers news, profile settings and comments management etc.

## Designs

Project designs are available on [Invision App](https://invis.io/YVGMAO4D23Z).

## Installing / Getting started

1.  Install Node.js (v9.0+ required). You can use [nvm](https://github.com/creationix/nvm) - Node Version Manager to quickly switch between Node versions.
2.  Install dependencies with `npm i` command
3.  To start development server run `npm run dev` or `yarn dev`

## Developing

### Built With

[Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [Mobx](https://mobx.js.org/)

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/) (v9.0+ required). You can use [nvm](https://github.com/creationix/nvm) - Node Version Manager to quickly switch between Node versions.

### Setting up Dev

```
git clone git@bitbucket.org:vuukleteam/social.git vuukle-social
cd vuukle-social
npm install
```

NOTE:

* You can change `vuukle-social` to any desired folder
* If you don't want to clone repo using **SSH**(command above) you can copy it using **HTTPS** (go to repository on bitbucket, click clone and select HTTPS) or you can clone repository using **GUI**

## Building

```
npm run build
```

to check builded version you can run

```
npm run start
```

## Deploying / Publishing

**Comming soon**

## Versioning

We should use [Semver](https://semver.org/) for versioning.
**Will be not actively used**

## Configuration

* Webpack configuration: `next.config.js` ([Details](https://github.com/zeit/next.js/#custom-configuration)).
* Environment variables: `env-config.js`.
* HTML template: `pages/_document.tsx`.
* Server configuration: `server/index.ts`.

## Style guide

To write similar code we use following tools/techs:

* [JSDoc](http://usejsdoc.org/) to documentate things
* [TSLint](https://palantir.github.io/tslint/) to lint typescript files. See `tslint.json`.
* [TSLint React](https://github.com/palantir/tslint-react) Lint rules related to React & JSX for TSLint. See `tslint.json`.
* [EditorConfig](http://editorconfig.org/) to let know editors about indentation. See `.editorconfig`

## Api Reference:

Api documentation is available on following link: [http://119.81.0.50:5000/swagger/](http://119.81.0.50:5000/swagger/).
This is temporary link, if it's not available, please let repository admin know to update readme and provide new url.

## Licensing

See `LICENSE` file

## Useful links:

* [Project Guidelines](https://github.com/elsewhencode/project-guidelines) - A set of best practices for JavaScript projects
* [React Developer Tools](https://github.com/facebook/react-devtools)
* [MobX Developer Tools](https://github.com/mobxjs/mobx-devtools)
* [Semver](https://semver.org/) - Semantic Versioning
* [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/) - Defines a strict branching model designed around the project release. This provides a robust framework for managing larger projects.
