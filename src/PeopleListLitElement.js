import { html, css, LitElement } from 'lit-element';
import '@material/mwc-circular-progress';

export class PeopleListLitElement extends LitElement {
  static get styles() {
    return css`
      .card-list {
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
        .card-list {
          grid: auto-flow / 1fr;
        }
      }
      @media screen and (min-width: 960px) and (max-width: 1380px) {
        .card-list {
          grid: auto-flow / 1fr 1fr;
        }
      }

      @media screen and (min-width: 1381px) and (max-width: 1879px) {
        .card-list {
          grid: auto-flow / 1fr 1fr 1fr;
        }
      }

      @media screen and (min-width: 1880px) {
        .card-list {
          grid: auto-flow / 1fr 1fr 1fr 1fr;
        }
      }
    `;
  }

  static get properties() {
    return {
      isLoading: { type: Boolean },
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.isLoading = true;
    this.list = [];
  }

  async firstUpdated() {
    await fetch(`http://demo6292426.mockable.io/persons`)
      .then(r => r.json())
      .then(async data => {
        this.list.push(...data);
        this.isLoading = false;
      });
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="center-element">
          <mwc-circular-progress indeterminate></mwc-circular-progress>
        </div>
      `;
    }
    return html`
      <div class="card-list">
        ${this.list.map(v => html` <person-card .data="${v}"></person-card>`)}
      </div>
    `;
  }
}
