# Application cloned from [React Static Boilerplate](https://github.com/koistya/react-static-boilerplate)

> Static website starter kit powered by [React.js](http://facebook.github.io/react/) and [Webpack](http://webpack.github.io/)

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /components/                # React components
├── /core/                      # Core framework
├── /pages/                     # React.js-based web pages
│   ├── /blog/                  # Blog post entries example
│   ├── /404.js                 # Not Found page
│   ├── /500.js                 # Error page
│   ├── /about.js               # About Us page
│   └── /index.js               # Home page
├── /static/                    # Static files such as favicon.ico etc.
├── /test/                      # Unit and integration tests
├── /tools/                     # Build automation scripts and utilities
│── app.js                      # The main JavaScript file (entry point)
│── config.js                   # Website configuration / settings
│── LICENSE.txt                 # License file
│── package.json                # Dev dependencies and NPM scripts
└── README.md                   # Project overview
```


### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```
$ git clone https://github.com/xxsanekxx/react-githubSearch.git MyApp
$ cd MyApp
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.


### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```
$ npm test
```


### How to Deploy

```shell
$ npm run deploy                # Deploys the project to GitHub Pages
```

Alternatively, you can build a production release to manually deploy to S3, Firebase, Netlify, and other static hosts. Simply run the command below and copy the generated `build` folder to your static host.

```shell
$ npm run build release         # Build production release 
```


### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch origin
$ git merge origin/master
$ npm install
```

---
Thanks to Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/koistya/react-static-boilerplate/graphs/contributors) &nbsp;|&nbsp; MIT License
