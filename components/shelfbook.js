export class ShelfBook extends HTMLElement {
  static observed_attributes = ["title", "date", "contenturl", "series"];

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }

  attributeChangedCallback(attr, oldVal, newVal) {}

  render() {
    return `<article class="book-container">
                <article class="book" 
		      ${this.getAttribute("contenturl") ? 'onpointerup="book_pointerup(event)"' : ""}
		      data-contenturl="${this.getAttribute("contenturl") ?? ""}"
		      data-title="${this.getAttribute("title") ?? ""}"
		>
                  <h2>${this.getAttribute("title") ?? ""}</h2>
                  <h3>${this.getAttribute("date") ?? ""}</h3>
                </article>
              </article>`;
  }
}
