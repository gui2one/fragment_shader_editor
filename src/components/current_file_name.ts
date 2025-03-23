import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("current-file-name")
export class CurrentFileName extends LitElement {
  @property({ type: String }) file_name = "";

  constructor() {
    super();
    window.addEventListener("current-file-changed", (ev: Event) => {
      this.file_name = (ev as CustomEvent).detail;
    });
  }
  render() {
    return html` <div>${this.file_name} <button>Edit Name</button></div> `;
  }
}
