/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';

export class CdsSelect extends LitElement {
  
  @state() protected disabled = false;

  get inputControl(): HTMLSelectElement {
    return this.querySelector('input, select, textarea, [cds-control]');
  }

  protected observers: (MutationObserver | ResizeObserver)[] = [];

  render() {
    return html`
      <div>
      <slot name="input"></slot>
      </div>
    `;
  }

  // https://github.com/vmware/clarity/blob/d435418ac393fe208f716c7590dcc92117b55d2a/packages/core/src/forms/control/control.element.ts#L285
  firstUpdated(props: Map<string, any>) {
    super.firstUpdated(props);
    this.setupHostAttributes();
  }

  updated(props: Map<string, any>) {
    super.updated(props);
    syncProps(this.inputControl, this, { disabled: props.has('disabled') });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observers.forEach(o => o.disconnect());
  }

  // https://github.com/vmware/clarity/blob/d435418ac393fe208f716c7590dcc92117b55d2a/packages/core/src/forms/control/control.element.ts#L323
  private setupHostAttributes() {
    this.observers.push(
      getElementUpdates(this.inputControl, 'disabled', (value: any) => {} /* (this.disabled = value === '' ? true : value) */)
    );
  }

}

/**
 * Set all common properties between two instances with given conditions. This is
 * helpful for setting child component properties from the parent given certain
 * conditions.
 */
export function syncProps(
  target: { [prop: string]: any },
  source: { [prop: string]: any },
  conditions: { [prop: string]: boolean }
) {
  Object.keys(conditions)
    .filter(c => conditions[c])
    .forEach(c => (target[c] = source[c]));
}

// https://github.com/vmware/clarity/blob/4006bea6dfe7b31a4708cc656dc628aad47562fa/packages/core/src/internal/utils/events.ts#L12
export const getElementUpdates = (
  element: HTMLElement,
  propertyKey: string,
  callback: (value: any) => void
): MutationObserver => {
  // if (element.hasAttribute(propertyKey)) {
  //   callback(element.getAttribute(propertyKey));
  // } else if ((element as any)[propertyKey] !== undefined) {
  //   callback((element as any)[propertyKey]);
  // }

  // // React: disable input tracker to setup property observer. React re-creates tracker on input changes
  // // https://github.com/facebook/react/blob/9198a5cec0936a21a5ba194a22fcbac03eba5d1d/packages/react-dom/src/client/inputValueTracking.js#L51
  // // https://github.com/vmware/clarity/issues/5625
  // if ((element as any)._valueTracker && (propertyKey === 'checked' || propertyKey === 'value')) {
  //   (element as any)._valueTracker = null;
  // }

  const updatedProp = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), propertyKey) as any;

  if (updatedProp) {
    Object.defineProperty(element, propertyKey, {
      get: updatedProp.get,
      set: val => {
        callback(val);
        updatedProp.set.call(element, val);
      },
    });
  }

  // return listenForAttributeChange(element, propertyKey, val => callback(val));
  return new MutationObserver(() => {});
};


