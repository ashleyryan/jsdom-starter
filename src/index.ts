import fs from 'fs';
import { JSDOM } from 'jsdom';

const {window} = new JSDOM(`<!DOCTYPE html><html><body>
<div id="container">
  <cds-select>
  <label>search</label>
  <select>
    <option>Option One</option>
    <option>Option Two</option>
    <option>Option Three</option>
  </select>
  </cds-select>
</div>
</body>
</html>`,  {
  runScripts: 'dangerously',
  resources: 'usable',
});

// mock resize observer
class ResizeObserver {
  observe() {
      // do nothing
  }
  unobserve() {
      // do nothing
  }
}
window.ResizeObserver = ResizeObserver;


const scriptContent = fs.readFileSync(process.cwd() + '/dist/browser/script.js', 'utf8');
const scriptElement = window.document.createElement('script');
scriptElement.textContent = scriptContent;
window.document.body.appendChild(scriptElement);

console.log(window.document.getElementById('container').innerHTML);
