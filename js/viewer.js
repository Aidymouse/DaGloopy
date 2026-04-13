import { set_style } from "./util.js";

// TODO: copy the book elem into the floating loader and have it fade out

/* @param bookElement {Element} -
 */
export const initiate_viewer = (bookElement) => {
  // Show the viewer
  viewer_view.style.display = "flex"; // As opposed to NONE
  viewer_view.style["background-color"] = "rgba(0, 0, 0, 0)";

  // Clear the viewed article
  article_content.innerHTML = "";

  const click_rect = bookElement.getBoundingClientRect();
  const rect = viewed_article.getBoundingClientRect();

  // Set the floating loader to the clicked books pos
  set_style(viewed_article, {
    ["transition-duration"]: "0s",
    display: "block", // Reset if been closed before
    transform: `translate(${click_rect.x - rect.x}px, ${click_rect.y - rect.y}px)`,
    ["clip-path"]: `rect(0px ${click_rect.width}px ${click_rect.height}px 0px)`,
  });
  //match_size(viewed_article, e.currentTarget);
  viewed_article.style.display = "block";

  let x = viewed_article.offsetLeft; // WARN: this is a hack that recalculates dom positioning and updates floating_loader instantly rather than using a propery animation approach

  set_style(viewed_article, {
    ["transition-duration"]: `${globalThis.trans}s`,
    transform: `translate(0px, 0px)`,
    ["clip-path"]: `rect(0px 100% 100% 0px)`,
  });

  //viewer_view.style['background-color'] = "rgba(0, 0, 0, 0.6)";

  fake_background.style["background-color"] = "rgba(0, 0, 0, 0.6)";

  // Set a timeout to do things after animation has finished
  setTimeout(() => {
    // This ensured images that load or resizing the page keeps the whole article readable.
    article_content.style.height = "auto";
  }, globalThis.trans * 1000);
};

// TODO:
export const close_viewer = () => {
  // Constructs the floating book div on the shelf layer and lets it fly back into the shelf

  globalThis.book_flying_back = globalThis.viewed_book;
  globalThis.viewed_book = null;

  history.scrollRestoration = "manual";
  viewer_view.scrollTo({ top: 0, behavior: "smooth" });

  // Floating book should actually be set to the rect of the book IN the shelf.
  const book_in_shelf_rect =
    globalThis.book_flying_back.getBoundingClientRect();
  const viewed_article_rect = viewed_article.getBoundingClientRect();

  console.log(viewed_article_rect);

  // WARN: watch out! This creates copies of some IDs
  floating_book.innerHTML = viewed_article.innerHTML;

  viewer_view.style.display = "none";

  // Reset the viewed article content.
  // Aside from cleanliness, this also prevents weird height slide behaviour when viewing a short article after a long one
  const viewed_article_content =
    viewed_article.querySelector("#article_content");
  viewed_article_content.innerHTML = "";
  viewed_article_content.style["height"] = "0px";

  // Set up floating book (in the shelf)
  floating_book.style["transition-duration"] = `0s`;
  floating_book.style["background-color"] = `var(--article-bg)`;
  floating_book.style["margin-top"] = `0px`;
  floating_book.style["left"] = `${viewed_article_rect.x}px`;
  floating_book.style["top"] = `${viewed_article_rect.y}px`;
  floating_book.style["opacity"] = `1`;
  floating_book.style["clip-path"] = `rect(0px 100% 100% 0px)`;

  var x = floating_book.offsetLeft;

  // Set off floating book
  floating_book.style["transition-duration"] = `${globalThis.trans}s`;
  floating_book.style["left"] = `${book_in_shelf_rect.x}px`;
  floating_book.style["top"] = `${book_in_shelf_rect.y}px`;
  floating_book.style["clip-path"] =
    `rect(0px ${book_in_shelf_rect.width}px ${book_in_shelf_rect.height}px 0px)`;

  setTimeout(() => {
    globalThis.book_flying_back.style["opacity"] = "1";
    floating_book.style["opacity"] = "0";
    floating_book.style["pointer-events"] = "none";
    // Gotta get rid of the id on the floating content so new content gets added to the right place
    const floating_article_content =
      floating_book.querySelector("#article_content");
    floating_article_content.innerHTML = "";
    floating_article_content.id = "";
  }, globalThis.trans * 1000);

  fake_background.style["background-color"] = "rgba(0, 0, 0, 0)";
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
