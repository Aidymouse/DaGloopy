import { process_markdown } from "./markdown.js";
import { initiate_viewer } from "./viewer.js";

/**
 * @param url (string)
 * @param load_callback (async (res, processed_content, text=null) => void)
 * NOTE: the text is already read on the res it'll be passed back as the text property, otherwise null
 */
export const load_article = (url, load_callback) => {
  if (!url.includes("content")) {
    console.warn(
      `URL ${url} doesn't appear to be in the content folder, not loading`,
    );
    return;
  }
  const file_type = url.split(".").pop();

  // TODO: headers based on file type
  // TODO: update loaded article register (cache?)

  fetch(url, {
    headers: { "Content-Type": "text/plain" },
  }).then(async (res) => {
    let text = null;
    let processed = "";

    // Processing
    if (file_type === "md") {
      text = await res.text();
      // Run through MD parser
      processed = process_markdown(text);
    }

    await load_callback(res, processed, text);
  });
};

export const book_pointerup = (e) => {
  const content = e.currentTarget.getAttribute("data-contenturl");

  e.currentTarget.style.opacity = "0";
  globalThis.viewed_book = e.currentTarget;

  load_article(`public/${content}`, async (res, processed, text = null) => {
    // Simulate 1 second load time with setTimeout
    setTimeout(() => {
      article_content.innerHTML = processed;
      mock_article_content.innerHTML = processed;

      floating_loader.style.height = "auto";
      article_content.classList.add("open");
      mock_article_content.classList.add("open");
    }, 1000);
  });

  initiate_viewer(e);
};
