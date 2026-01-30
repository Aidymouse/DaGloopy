const series_color_map = {
  "ruby crown": "#a12323",
  "royan empire": "#689923",
  "the royan empire": "#689923",
};

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
    const series = this.getAttribute("series");
    const series_style = series_color_map[series]
      ? `style="background-color: ${series_color_map[series]}"`
      : "";

    return `<article class="book-container">
                <article class="book" 
		      ${this.getAttribute("contenturl") ? 'onpointerup="book_pointerup(event)"' : ""}
		      data-contenturl="${this.getAttribute("contenturl") ?? ""}"
		      data-title="${this.getAttribute("title") ?? ""}"
		>
			<div class="grid-cell">
                		<h2>${this.getAttribute("title") ?? ""}</h2>
			</div>
		  <span class="book-strip" ${series_style}></span>
		  <div class="grid-cell" style="justify-content: flex-end; padding-right: 0.5em;">
                  <h3>${this.getAttribute("date") ?? ""}</h3>
		  </div>
                </article>
              </article>`;
  }
}
