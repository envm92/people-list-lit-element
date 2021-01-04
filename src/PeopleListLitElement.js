import { html, css, LitElement } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import '@material/mwc-circular-progress';

export class PeopleListLitElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        width: 100%;
        height: auto;
        grid: auto-flow / 1fr 1fr 1fr;
        justify-items: center;
        align-items: start;
      }
      .center-element {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      @media screen and (max-width: 959px) {
        :host {
          grid: auto-flow / 1fr;
        }
      }
      @media screen and (min-width: 960px) and (max-width: 1380px) {
        :host {
          grid: auto-flow / 1fr 1fr;
        }
      }

      @media screen and (min-width: 1381px) and (max-width: 1879px) {
        :host {
          grid: auto-flow / 1fr 1fr 1fr;
        }
      }

      @media screen and (min-width: 1880px) {
        :host {
          grid: auto-flow / 1fr 1fr 1fr 1fr;
        }
      }
    `;
  }

  static get properties() {
    return {
      request: { type: Object },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.request = fetch(`http://demo6292426.mockable.io/persons`)
      .then(r => r.json())
      .then(async data => {
        return data.map(v => html` <person-card .data="${v}"></person-card>`);
      });
  }

  render() {
    return html` ${until(
      this.request,
      html`
        <div class="center-element">
          <mwc-circular-progress indeterminate></mwc-circular-progress>
        </div>
      `
    )}`;
  }
}
