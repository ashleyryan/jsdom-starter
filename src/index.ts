import { JSDOM } from 'jsdom';

const options = {
  runScripts: 'dangerously',
  resources: 'usable',
}

JSDOM.fromFile("./dist/lib/index.html", options).then((dom) => {
  return new Promise((resolve) => setTimeout(() => {resolve(dom)}, 1000));
}).then(({window}) => {
  console.log(window.document.getElementById('body').outerHTML);
});