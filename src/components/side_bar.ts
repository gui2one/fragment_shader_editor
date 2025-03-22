import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseElement } from "./base";

@customElement("side-bar")
export class SideBar extends BaseElement {
  @property({ type: String }) title = "My Super Title";
  render() {
    return html` <div></div> `;
  }
}
