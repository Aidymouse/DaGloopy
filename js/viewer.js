export const initiate_viewer = (e) => {
  viewer_view.style.display = "flex";

  mock_article_content.classList.add("loading");

  const clicked_rect = e.currentTarget.getBoundingClientRect();

  floating_loader.style["transition-duration"] = "0s";
  floating_loader.style.width = `${clicked_rect.width}px`;
  floating_loader.style.height = `${clicked_rect.height}px`;
  floating_loader.style.left = `${clicked_rect.x}px`;
  floating_loader.style.top = `${clicked_rect.y}px`;

  // WARN: this is a hack that recalculates dom positioning and updates floating_loader instantly rather than using a propery animation approach
  let x = floating_loader.offsetLeft;
  // TODO: update instantly but animate from here - maybe use CSS animation? https://stackoverflow.com/questions/49286413/changing-an-html-elements-style-in-javascript-with-its-css-transition-temporari

  floating_loader.style["transition-duration"] = `${globalThis.trans}s`;

  const article_rect = viewed_article.getBoundingClientRect();

  floating_loader.style.left = `${article_rect.x}px`;
  floating_loader.style.top = `${article_rect.y}px`;
  floating_loader.style.height = `${article_rect.height}px`;
  floating_loader.style.width = `${article_rect.width}px`;
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
  // What we should actually do it, clone the open article onto the shelf layer, and let if fly back that way.

  viewer_view.scrollTo({ top: 0, behavior: "smooth" });

  // Get the mock article to be the same size as the main
  floating_loader.style["transition-duration"] = "0";
  const article_rect = viewed_article.getBoundingClientRect();
  floating_loader.style.top = `${article_rect.y}px`;
  floating_loader.style.left = `${article_rect.x}px`;
  floating_loader.style.width = article_rect.width;
  floating_loader.style.height = article_rect.height;
  floating_loader.style.display = "block";

  let cx = floating_loader.offsetLeft;

  floating_loader.style["transition-duration"] = `${trans}s`;

  mock_article_content.style["transition-duration"] = `0s`;
  mock_article_content.style["background-color"] = `var(--article-bg)`;
  viewed_article.style.opacity = "0";

  let x = mock_article_content.offsetLeft;

  mock_article_content.style["transition-duration"] = `${trans}s`;
  // TODO: when you hit back too fast this is unconvincing. But probably only noticeable at slow speeds
  mock_article_content.style["background-color"] = `var(--book-bg)`;

  article_content.classList.remove("open");
  mock_article_content.classList.remove("open");
  floating_loader.classList.remove("open");

  const book_rect = viewed_book.getBoundingClientRect();
  floating_loader.style.left = `${book_rect.x}px`;
  floating_loader.style.top = `${book_rect.y}px`;
  floating_loader.style.height = `calc-size(${book_rect.height}px, size)`;
  floating_loader.style.width = `${book_rect.width}px`;

  viewer_view.style["background-color"] = "rgba(0, 0, 0, 0)";

  const navs = document.getElementsByClassName("viewer-nav");
  for (const nav of navs) {
    nav.classList.remove("open");
  }

  setTimeout(() => {
    viewed_book.style.opacity = 1;
    floating_loader.style.opacity = 0;
    setTimeout(() => {
      viewer_view.style.display = "none";
      // Reset
      floating_loader.style.opacity = 1;
      mock_article_content.style["background-color"] = ``;
    }, globalThis.trans * 1000);
  }, globalThis.trans * 1000);
};
