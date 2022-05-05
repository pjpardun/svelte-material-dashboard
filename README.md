# Svelte Material Dashboard

## About
A group I worked with used Microsoft Access Database forms and controls for data entry and tracking of reporting projects. This repo is a development project to demo modernizing the user experience (UX) and to learn web development (including backend, frontend, and charting). Because web development is new to me, I collaborated heavily with [masyukun](https://github.com/masyukun) for writing REST services in node.js and svelte component development.

The project is a single page application (SPA) using:
1. [Svelte](https://svelte.dev/), a web framework by Rich Harris
2. [Material Design](https://material.io/develop/web), design language software by Google
3. [Highcharts](https://www.highcharts.com/), a charting library by Torstein Hønsi

The mock data is JSON format and the backend is node.js.

The custom Material Design svelte components are prototypes for a more standard and robust stack we will be working on called svelterial.

Previews:
![Templates](https://github.com/pjpardun/svelte-material-dashboard/blob/main/Templates.png?raw=true)

![Dashboard](https://github.com/pjpardun/svelte-material-dashboard/blob/main/Dashboard.png?raw=true)

## Installation
1. Clone:
```bash
git clone https://github.com/pjpardun/svelte-material-dashboard .
```
2. Navigate to cloned files directory in shell and run
```bash
npm install
```
```bash
npm run backend
```
```bash
npm run dev
```
3. Navigate to [localhost:5000](http://localhost:5000) in browser

## Requirements 
 - @rollup/plugin-commonjs >=17.0.0
 - @rollup/plugin-node-resolve >=11.0.0
 - node-sass >=6.0.0
 - postcss >=8.3.0
 - rollup >=2.3.4
 - rollup-plugin-css-only >=3.1.0
 - rollup-plugin-livereload >=2.0.0
 - rollup-plugin-svelte >=7.0.0
 - rollup-plugin-terser >=7.0.0
 - sass >=1.34.0
 - svelte >=3.0.0
 - svelte-preprocess >=4.7.3
 - mdi/js >=5.9.55
 - express >=4.17.3
 - highcharts >=9.3.3
 - lorem-ipsum >=2.0.4
 - material-components-web >=11.0.0
 - nodemon >=2.0.15
 - sirv-cli >=1.0.0
 - svelte-spa-router >=3.2.0
 - uuid >=8.3.2

## License
MIT License
