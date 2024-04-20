# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

How to add loader using library?

Option 2: Using a Loader Library

Many libraries offer pre-built loaders with various styles and animations. Here's an example using React Spinners:

step1:Install the library:
Bash:
npm install react-spinners

step2:Import the desired loader component:
JavaScript:
import { DotLoader } from 'react-spinners'; // Example loader

step3:Use the component in your 
JSX, JavaScript:
<DotLoader color="#3498db" /> // Customize color and other props