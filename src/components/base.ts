import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("base-element")
export class BaseElement extends LitElement {
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
