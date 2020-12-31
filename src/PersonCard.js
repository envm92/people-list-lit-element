import { html, css, LitElement } from 'lit-element';
import '@material/mwc-list';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

export class PersonCard extends LitElement {
  static get styles() {
    return [
      css`
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          transition: 0.3s;
          width: 100%;
        }

        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .container {
          padding: 2px 16px;
        }

        .avatar {
          vertical-align: middle;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      data: { type: Object },
      fullName: { type: String },
    };
  }

  get fullName() {
    return `${this.data.name.last}, ${this.data.name.first}`;
  }

  render() {
    return html`
      <div class="card">
        <div class="container">
          <mwc-list>
            <mwc-list-item twoline graphic="medium" noninteractive>
              <span>${this.fullName}</span>
              <span slot="secondary">${this.data.email}</span>
              <mwc-icon slot="graphic">
                <img src="${this.data.picture}" alt="Avatar" class="avatar" />
              </mwc-icon>
            </mwc-list-item>
          </mwc-list>
        </div>
      </div>
    `;
  }
}
