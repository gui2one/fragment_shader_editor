import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseElement } from "./base";

@customElement("side-bar-item")
export class SideBar extends BaseElement {
  render() {
    return html` <div>Side Bar Item</div> `;
  }
}
