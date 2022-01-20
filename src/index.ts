import { JSDOM } from 'jsdom';

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
    console.log('hello constructor');
  }

  connectedCallback() {
    console.log('hello connection!');
  }

  connectedCallback () {
    this.innerHTML = 'hello, world!'
  }

  adoptedCallback() {
    console.log('hello adoption.');
  }
}
window.customElements.define( 'jsdom-test', JsdomTest )
const jsdomTest = document.createElement('jsdom-test');
document.getElementById('body').prepend(jsdomTest);
</script
<jsdom-test id="test">test</jsdom-test>
</body>
</html>
`, { runScripts: 'dangerously' });

console.log(window.document.getElementById('test').outerHTML);