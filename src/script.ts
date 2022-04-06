
import { CDSGlobal } from "@cds/core/internal/utils/global";
import '@cds/core/input/register.js';


window.CDS = {
  environment: {
    production: false
  }
} as CDSGlobal;

// mock resize observer
class ResizeObserver {
  observe() {
  }
  unobserve() {
  }
  disconnect() {
  }
}
window.ResizeObserver = ResizeObserver;


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
document.getElementById('container').prepend(jsdomTest);