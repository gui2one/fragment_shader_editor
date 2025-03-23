import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("side-bar-item")
export class SideBarItem extends LitElement {
  @property({ type: String }) label = "Menu Item";
  @property({ type: Function }) onClick = () => {};

  constructor(label: string, onClick: () => void) {
    super();
    if (label) this.label = label;
    if (onClick) this.onClick = onClick;
  }

  static styles = css`
    :host {
      display: block;
      cursor: pointer;
      font-size: 0.8em;
    }
    div {
      padding: 0.5em;
      border-top: 1px solid #333;
      &:hover {
        background-color: #333;
      }
    }
  `;
  render() {
    return html` <div @click=${this.onClick}>${this.label}</div> `;
  }
}
