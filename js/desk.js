window.book_dragstart = (e) => {
  dragged_book = e.target;
};
window.book_dragend = (e) => {
  dragged_book = null;
};
window.enter_drop_zone = (e) => {
  go_to_desk_view();
};

// TODO: refactor these
window.go_to_shelf_view = () => {
  shelf_view.style.left = "0%";
  desk_view.style.left = "-100%";
  //window.history.pushState({"pageTitle":"The Shelf"}, "theshelf")
};

window.go_to_desk_view = () => {
  shelf_view.style.left = "100%";
  desk_view.style.left = "0%";
};
/** DESK VIEW EVENTS **/
// Happens when something dropped not on desktop (desktop will stop propagation)
window.desk_view_dragover = (e) => {
  e.preventDefault();
};

window.desk_view_drop = (e) => {
  // Send it back to the library!
};

/** DESKTOP EVENTS **/
window.desktop_drop = (e) => {
  if (dragged_article) {
    drop_article_onto_desk(e);
  } else if (dragged_book) {
    drop_book_onto_desk(e);
  }
};

const drop_article_onto_desk = (e) => {
  e.stopPropagation(); // Stops event from going to desk view

  const desktop_rect = desktop.getBoundingClientRect();

  const dropX = e.clientX - desktop_rect.x;
  const dropY = e.clientY - desktop_rect.y;

  const drop_delta = {
    x: dropX - article_drag.og_pos.x,
    y: dropY - article_drag.og_pos.y,
  };

  const article_rect = dragged_article.getBoundingClientRect();

  dragged_article.style.left = `${article_rect.x + drop_delta.x}px`;
  dragged_article.style.top = `${article_rect.y + drop_delta.y}px`;
};

const drop_book_onto_desk = (e) => {
  console.log(dragged_book);

  const book_url = dragged_book.getAttribute("data-contenturl");

  desktop.innerHTML += `<article
				id="book_${"book"}"
				draggable="true"
				ondragstart="article_ondragstart(event)"
				ondragend="article_ondragend(event)"
			      >
				<h2>${"Hello"}</h2>
				<p>${"This artcle"}</p>
			      </article>`;
};

window.desk_dragover = (e) => {
  e.preventDefault();
};

/** ARTICLE EVENTS **/
let article_drag = {
  og_pos: { x: 0, y: 0 },
};
let dragged_article = null;

window.article_ondragend = (e) => {
  e.target.style.opacity = "1";
  dragged_article = null;
};

window.article_ondragstart = (e) => {
  e.target.style.opacity = "0.1";

  const desktop_rect = desktop.getBoundingClientRect();
  article_drag.og_pos = {
    x: e.clientX - desktop_rect.x,
    y: e.clientY - desktop_rect.y,
  };

  dragged_article = e.target;
};
