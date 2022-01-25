class JsdomTest extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      console.log('hello constructor');
    }
  
    connectedCallback () {
      this.innerHTML = 'hello, world!';
      console.log('hello connection');
    }
  
    adoptedCallback() {
      console.log('hello adoption.');
    }
  }
  window.customElements.define( 'jsdom-test', JsdomTest )
  const jsdomTest = document.createElement('jsdom-test');
  document.getElementById('body').prepend(jsdomTest);