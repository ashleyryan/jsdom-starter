import fs from 'fs';
import { JSDOM } from 'jsdom';

const {window} = new JSDOM('<!DOCTYPE html><html><body><div id="container"></div></body></html>',  {
  runScripts: 'dangerously',
  resources: 'usable',
});

const scriptContent = fs.readFileSync(process.cwd() + '/dist/lib/script.js', 'utf8');
const scriptElement = window.document.createElement('script');
scriptElement.textContent = scriptContent;
window.document.body.appendChild(scriptElement);

console.log(window.document.getElementById('container').innerHTML);
