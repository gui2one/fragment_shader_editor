import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("confirm-dialog")
export class ConfirmDialog extends LitElement {
  cb: Function;
  constructor(cb: () => void) {
    super();
    this.cb = cb;
  }
  static styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 1000000;
      background-color: black;
      color: white;
    }
  `;

  render() {
    return html`
      <div class="container">
        <div>Confirm Dialog</div>
        <div class="buttons">
          <button
            @click=${() => {
              this.cb();
              this.remove();
            }}
          >
            OK
          </button>
          <button @click=${this.remove}>Cancel</button>
        </div>
      </div>
    `;
  }
}
