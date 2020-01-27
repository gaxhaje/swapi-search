# swapi-search
#### Search a subset of the [Star Wars API](https://swapi.co/api/)

Displays a timeline of the Star Wars Films.

- [Getting Started](#getting-started)
- [Building and Starting](#building-and-starting)
- [API](#api)
- [Improvements](#improvements-to-consider)
- [Framework](#framework)
- [License](#license-mit)

#### Getting started
  Download the application.
  ```
  $ git clone git@github.com:gaxhaje/swapi-api.git
  $ cd swapi-api
  ```

##### Building and Starting
#

  Preview the application in `development` mode by running:
  ```
  $ npm install
  $ npm run dev
  ```
  
  Note:  To see a simulation of real-time user comments posted on http://localhost/comments. This is an example of you can set up a separate websocket server that a client can connect to to listen for comments via Web Sockets.
  ```
  $ cd <path/to>/swap-api
  $ node socket-io-server.js
  ```
  Now you can see your running application on [`http://localhost:3000/`](http://localhost:3000).
  
  You can press `ctrl + c` in your terminal to `stop` the development server when you're ready to move on.

  `Production`
  
  Look into the `scripts` inside `package.json`:
  ```
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
  ```
  
  First we need to build an optimized `production` build:
  ```
  $ npm run build
  ```
  
  Then, you need to start your Next.js app on a port. This server will do server-side rendering and serve static pages (built with the above command)
  ```
  $ npm run start
  ```
  Now you can see your running application on [`http://localhost:3000/`](http://localhost:3000)
  
  #### API
   - `/pages/api/characters.js` retrieve character info
   - `/pages/api/films.js` retrieve a subset list of Star Wars films
   - `/pages/characters/[id].js` dispaly some information about a character in the a film
   - `/pages/comments.js` Dispaly comments from Web Socket connection
   - `/pages/index.js` main page of the application
   - `/components/Header.js` Header components
   - `/components/Layout.js` Site layout
   - `/components/SwapiAutocomplete.js` Autocomplete of Star Wars characters
   - `/components/Drawer.js` Left drawer
 
 project structure
 ```
    ├── components
    │   ├── Character.js
    │   ├── Comments.js
    │   ├── Drawer.js
    │   ├── Header.js
    │   ├── Layout.js
    │   ├── SwapiAutocomplete.js
    │   └── Timeline.js
    ├── LICENSE
    ├── package.json
    ├── package-lock.json
    ├── pages
    │   ├── api
    │   │   ├── characters.js
    │   │   └── films.js
    │   ├── characters
    │   │   └── [id].js
    │   ├── comments.js
    │   ├── _document.jsx
    │   └── index.js
    ├── README.md
    └── socket-io-server.js

 ```
  #### Framework
  
  - The React framework for the project is [Next.js](nextjs.org). Next.js is a React framework that provides the follwing features (and more):
    -  Server rendering
    -  Static exporting
    -  CSS-in-JS `styled-jsx`. See [https://github.com/zeit/styled-jsx](https://github.com/zeit/styled-jsx)
    -  Automatic code splitting, filesystem based routing, hot code reloading and universal rendering. `one of my favorite features about it`
    -  Complete control over Babel and Webpack. Customizable server, routing and next-plugins.
-  Web Sockets
    - [socket.io](https://www.npmjs.com/package/socket.io)
    - [socket.io-client](https://www.npmjs.com/package/socket.io-client)

  #### Improvements to consider
  - Add form to post comments
  - Testing
  
#### License MIT
