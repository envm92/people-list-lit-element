import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import * as L from 'leaflet';
import style from 'leaflet/dist/leaflet.css';
import '@material/mwc-list';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.3.2/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.3.2/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.3.2/dist/images/marker-shadow.png',
});

export class PersonCard extends LitElement {
  static get styles() {
    return [
      style,
      css`
        :host {
          font-family: 'Roboto';
        }
        .card {
          box-shadow: 0 3px 4px rgba(0, 0, 0, 0.12),
            0 1px 5px rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          background-color: #fefefe;
          height: 88px;
          max-width: 450px;
          overflow: hidden;
          transition: 375ms cubic-bezier(0.4, 0, 0.2, 1);
          margin: 5px;
        }

        .cardActive {
          height: 100%;
        }

        .cardActive .nonSharedContent {
          transition: 150ms;
          transition-delay: 75ms;
          opacity: 1;
        }

        .nonSharedContent {
          transition: 75ms;
          opacity: 0;
        }

        .nonSharedContent p {
          padding: 0 20px;
        }

        .cardHeader {
          cursor: pointer;
          width: 100%;
          height: 72px;
          padding-bottom: 10px;
        }

        .avatar {
          vertical-align: middle;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-bottom: 20px;
        }
        .chip-list {
          padding: 10px 5px;
        }

        .chip {
          display: inline-block;
          background: #e0e0e0;
          padding: 0 12px;
          border-radius: 32px;
          font-size: 13px;
          height: 32px;
          line-height: 32px;
          margin: 0 5px 3px 0;
        }
        .status {
          display: flex;
          align-items: center;
          height: 100%;
          justify-content: center;
        }

        .online-icon {
          font-size: 20px;
          color: #00bb33;
          padding-right: 2px;
        }
        .notify {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          color: #333333;
        }
        .notify-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 20px;
          height: 20px;
          background: red;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          font-size: 10px;
        }
        .status-bar {
          padding: 0 15px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        #location {
          height: 240px;
          width: 450px;
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

  constructor() {
    super();
    this.classes = { card: true, cardActive: false };
  }

  get fullName() {
    return `${this.data.name.last}, ${this.data.name.first}`;
  }

  _expand() {
    this.classes.cardActive = !this.classes.cardActive;
    if (this.classes.cardActive) {
      this._loadMapLeaflet();
    } else {
      this._destroyMapLeaflet();
    }
    this.requestUpdate();
  }

  _maskBalance() {
    const rgx = /[$,]+/g;
    return this.data.balance.replaceAll(rgx, '');
  }

  _loadMapLeaflet() {
    const latlong = [this.data.latitude, this.data.longitude];
    const refMap = this.shadowRoot.getElementById('location');
    this.lefMap = L.map(refMap).setView(latlong, 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.lefMap);

    L.marker(latlong).addTo(this.lefMap);
  }

  _destroyMapLeaflet() {
    if (this.lefMap && this.lefMap.remove) {
      this.lefMap.off();
      this.lefMap.remove();
    }
  }

  _getFavoriteFruitEmoji() {
    const fruits = {
      banana: '🍌',
      apple: '🍎',
      strawberry: '🍓',
    };
    return fruits[this.data.favoriteFruit];
  }

  _getUnreadMessages() {
    return this.data.greeting.replace(/\D/g, '');
  }

  _getEyeColor() {
    const colors = {
      blue: '#17a9ba',
      green: '#3aa447',
      brown: '#ac6434',
    };
    return colors[this.data.eyeColor];
  }

  render() {
    return html`
      <div class=${classMap(this.classes)}>
        <section class="cardHeader">
          <mwc-list>
            <mwc-list-item
              twoline
              graphic="medium"
              hasMeta
              @click=${this._expand}
            >
              <span>${this.fullName}</span>
              <span slot="secondary">${this.data.email}</span>
              <mwc-icon slot="graphic">
                <img src="${this.data.picture}" alt="Avatar" class="avatar" />
              </mwc-icon>
              <mwc-icon slot="meta">
                ${!this.classes.cardActive
                  ? 'expand_more'
                  : 'expand_less'}</mwc-icon
              >
            </mwc-list-item>
          </mwc-list>
        </section>
        <section class="nonSharedContent">
          <div class="status-bar">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  fill="#ffffff"
                  d="M12 6c-3.79 0-7.17 2.13-8.82 5.5C4.83 14.87 8.21 17 12 17s7.17-2.13 8.82-5.5C19.17 8.13 15.79 6 12 6zm0 10c-2.48 0-4.5-2.02-4.5-4.5S9.52 7 12 7s4.5 2.02 4.5 4.5S14.48 16 12 16z"
                  opacity=".7"
                />
                <path
                  d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 13c-3.79 0-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6s7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17zm0-10c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7zm0 7c-1.38 0-2.5-1.12-2.5-2.5S10.62 9 12 9s2.5 1.12 2.5 2.5S13.38 14 12 14z"
                />
                <circle fill=${this._getEyeColor()} cx="12" cy="11.5" r="5" />
                <circle fill="black" cx="12" cy="11.5" r="3" />
                <circle fill="#ffffff" cx="13" cy="10" r=".75" />
              </svg>
            </div>
            <div class="chip-list">
              ${this.data.tags.map(tag => html`<div class="chip">${tag}</div>`)}
            </div>
            <div>
              ${this.data.isActive
                ? html`
                    <div class="status">
                      <span class="online-icon"> ■ </span> Active
                    </div>
                  `
                : ''}
            </div>
            <div class="notify">
              <span class="notify-badge"
                >${this._getUnreadMessages() || 0}</span
              >
              <mwc-icon class="fancy">mail</mwc-icon>
            </div>
          </div>
          <hr />
          <p>${this.data.about}</p>
          <mwc-list>
            <mwc-list-item twoline noninteractive>
              <span>Email</span>
              <span slot="secondary">${this.data.email}</span>
            </mwc-list-item>
            <mwc-list-item twoline noninteractive>
              <span>Phone</span>
              <span slot="secondary">${this.data.phone}</span>
            </mwc-list-item>
            <mwc-list-item twoline noninteractive>
              <span>Company</span>
              <span slot="secondary">${this.data.company}</span>
            </mwc-list-item>
            <mwc-list-item twoline noninteractive>
              <span>Age</span>
              <span slot="secondary">${this.data.age}</span>
            </mwc-list-item>
            <mwc-list-item twoline noninteractive>
              <span>Balance</span>
              <span slot="secondary">${this._maskBalance()}</span>
            </mwc-list-item>
            <mwc-list-item twoline noninteractive>
              <span>Favorite Fruit</span>
              <span slot="secondary"
                >${this.data.favoriteFruit} -
                ${this._getFavoriteFruitEmoji()}</span
              >
            </mwc-list-item>
            <mwc-list-item twoline noninteractive>
              <span>Address</span>
              <span slot="secondary">${this.data.address}</span>
            </mwc-list-item>
          </mwc-list>
          <div id="location"></div>
          <mwc-list>
            <mwc-list-item noninteractive><h4>Friends</h4></mwc-list-item>
            <li divider role="separator"></li>
            ${this.data.friends.map(
              f => html`<mwc-list-item noninteractive>${f.name}</mwc-list-item>`
            )}
          </mwc-list>
        </section>
      </div>
    `;
  }
}
