import { JSDOM } from 'jsdom';

console.log('hello index.ts', JSDOM);
const { window } = new JSDOM(`
<!DOCTYPE html>
<html>
<head></head>
<body id="body">
<span id="test">hello test</span>
<script>
class JsdomTest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback () {
    this.innerHTML = 'hello, world!'
  }
}
customElements.define( 'jsdom-test', JsdomTest )
const jsdomTest = document.createElement('jsdom-test');
document.getElementById('body').prepend(jsdomTest);
</script
</body>
</html>
`, { runScripts: 'dangerously' });

console.log(window.document.getElementById('body').outerHTML);