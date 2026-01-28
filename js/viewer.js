export const initiate_viewer = (e) => {
  viewer_view.style.display = "flex";

  mock_article_content.classList.add("loading");

  const clicked_rect = e.currentTarget.getBoundingClientRect();

  set_style(floating_loader, {
    ["transition-duration"]: "0s",
  });

  match_size(floating_loader, e.currentTarget);

  // WARN: this is a hack that recalculates dom positioning and updates floating_loader instantly rather than using a propery animation approach
  let x = floating_loader.offsetLeft;
  // TODO: update instantly but animate from here - maybe use CSS animation? https://stackoverflow.com/questions/49286413/changing-an-html-elements-style-in-javascript-with-its-css-transition-temporari

  floating_loader.style["transition-duration"] = `${globalThis.trans}s`;

  const article_rect = viewed_article.getBoundingClientRect();

  match_size(floating_loader, viewed_article);
  floating_loader.classList.add("open");

  viewer_view.style["background-color"] = "rgba(0, 0, 0, 0.6)";

  const navs = document.getElementsByClassName("viewer-nav");
  for (const nav of navs) {
    nav.classList.add("open");
  }

  // TODO: cancel this if we click close too quick
  setTimeout(() => {
    viewed_article.style.opacity = "1";
    //floating_loader.style.opacity = "0";
    floating_loader.style.display = "none";
  }, globalThis.trans * 1000);
};

export const close_viewer = () => {
  // Constructs the floating book div on the shelf layer and lets it fly back into the shelf

  viewer_view.scrollTo({ top: 0, behavior: "smooth" });

  // Set up floating book in initial pos
  floating_book.style["transition-duration"] = "0s";
  match_size(floating_book, viewed_article);
  floating_book.innerHTML = `<div id="floating_book_content">${viewed_article.innerHTML}</div>`;
  floating_book.innerHTML += `
		<section id="fb_heading_container">
			<h2>${viewed_book.getAttribute("data-title")}</h2>
		</heading>
		`;
  // TODO: query into floating book and change article content so it's fixed width and doesn't reflow on close
  set_style(floating_book, {
    display: "",
    opacity: "1",
    ["background-color"]: "var(--article-bg)",
  });

  // Reflow to apply style
  let x = floating_book.offsetLeft;

  // Turn off the viewer
  viewer_view.style["background-color"] = "rgba(0, 0, 0, 0)";
  viewer_view.style.display = "none";

  // Reset relevant viewer state
  //article_content.classList.remove("open");
  mock_article_content.classList.remove("open");
  floating_loader.style.height = "";

  // Set floating book to new pos
  set_style(floating_book, {
    ["transition-duration"]: `${globalThis.trans}s`,
    ["background-color"]: "var(--book-bg)",
  });
  match_size(floating_book, globalThis.viewed_book);

  floating_book_content.style.opacity = "0";

  // When the anim is done, turn the book back on, turn off the floating book
  setTimeout(() => {
    globalThis.viewed_book.style.opacity = "1";
    floating_book.style.display = "none";
  }, globalThis.trans * 1000);
};

/** Sets elem1's top, left, width and height to the x, y, width, height of elem2
 * @param elem1 - Element of absolute position
 * @param elem2 - Element to match size of
 */
export const match_size = (elem1, elem2) => {
  const rect = elem2.getBoundingClientRect();
  elem1.style.left = `${rect.x}px`;
  elem1.style.top = `${rect.y}px`;
  elem1.style.width = `${rect.width}px`;
  elem1.style.height = `${rect.height}px`;
};

export const set_style = (elem, style) => {
  for (const [styleKey, styleVal] of Object.entries(style)) {
    elem.style[styleKey] = styleVal;
  }
};
