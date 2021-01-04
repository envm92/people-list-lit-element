import { html, css, LitElement } from 'lit-element';
import '@material/mwc-circular-progress';

export class PeopleListLitElement extends LitElement {
  static get styles() {
    return css`
      .card-list { 
        /*display: grid;
        grid: auto-flow / 1fr 1fr;*/
      }
      .center-element {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
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
