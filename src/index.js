import fs from 'fs';
import { JSDOM } from 'jsdom';
import { plugins, format as prettyFormat } from 'pretty-format';


const { DOMElement } = plugins;


const format = (val) => {
  return prettyFormat(val, {
    plugins: [DOMElement],
    printFunctionName: false,
  })
}

const { window } = new JSDOM(`<!DOCTYPE html><html><body>
<div id="container">
  <cds-input>
    <label >Name</label>
    <input type="text"/>
  </cds-input>
</div>
<div id="another-element"><span>Hi</span></div>
</body>
</html>`, {
  runScripts: 'dangerously',
  resources: 'usable',
});



const scriptContent = fs.readFileSync(process.cwd() + '/dist/browser/script.js', 'utf8');
const scriptElement = window.document.createElement('script');
scriptElement.textContent = scriptContent;
window.document.body.appendChild(scriptElement);

const filename = `${process.cwd()}/log.${process.versions.node}.cds-input.txt`;
console.log(`logging pretty-format of cds-input to file: ${filename}`);


fs.writeFileSync(filename, format(window.document.querySelector('cds-input')), 'utf-8')

const filenamejsdom = `${process.cwd()}/log.${process.versions.node}.jsdom-test.txt`;
console.log(`logging pretty-format of jsdom-test to file: ${filename}`);

fs.writeFileSync(filenamejsdom, format(window.document.querySelector('jsdom-test')), 'utf-8')


console.log(window.document.querySelector('#container').innerHTML);
