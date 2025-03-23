import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
// import { BaseElement } from "./base";

@customElement("side-bar-item")
export class SideBarItem extends LitElement {
  @property({ type: String }) label = "Menu Item";
  @property({ type: Function }) onClick = () => {};
  render() {
    return html` <div @click=${this.onClick}>${this.label}</div> `;
  }
}
