import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("side-bar")
export class SideBar extends LitElement {
  @property({ type: String }) title = "My Super Title";
  @property({ type: Boolean }) opened = true;

  constructor(title?: string) {
    super();
    if (title) this.title = title;
  }
  static styles = css`
    :host {
      position: fixed;
      z-index: 10000;
    }
    button {
      position: fixed;
      display: block;
      cursor: pointer;
      background-color: black;
      color: white;
      top: 0;
      right: 0px;
      z-index: 100001;
    }
    .container {
      position: fixed;
      z-index: 10000;
      right: 0px;
      top: 0;
      width: 200px;
      height: 100vh;
      background-color: black;
      transition: all 0.3s;
      transform: translateX(200px);
    }
    .show {
      /* display: block; */

      transform: translateX(0px);
    }
    .title {
      position: relative;
      padding: 0.5em;
    }
  `;

  render() {
    return html`
      <button @click=${() => (this.opened = !this.opened)}>
        ${this.opened ? "close" : "open"}
      </button>
      <div class="container ${classMap({ show: this.opened })}">
        <div>
          <div class="title">${this.title}</div>

          <slot></slot>

          <files-list></files-list>
        </div>
      </div>
    `;
  }
}
