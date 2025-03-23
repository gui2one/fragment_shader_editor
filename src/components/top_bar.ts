import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { CurrentFileName } from "./current_file_name";
import { LocalStore } from "../localstore";

@customElement("top-bar")
export class TopBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 10000;
      background-color: black;
      color: white;
      padding: 0.5em;
    }
  `;

  get_current_file() {
    let store = new LocalStore();
    return store.get_current_file_name();
  }
  render() {
    return html`<div class="title">
      <current-file-name
        file_name="${this.get_current_file()}"
      ></current-file-name>
    </div>`;
  }
}
