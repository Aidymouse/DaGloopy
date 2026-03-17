// TODO: copy the book elem into the floating loader and have it fade out
export const initiate_viewer = (e) => {
	//
	// Show the viewer
	viewer_view.style.display = "flex";



	// Clear the viewed article
	article_content.innerHTML = "";

	const click_rect = e.currentTarget.getBoundingClientRect();
	const rect = viewed_article.getBoundingClientRect();

	// Set the floating loader to the clicked books pos
	set_style(viewed_article, {
		["transition-duration"]: "0s",
		display: 'block', // Reset if been closed before
		transform: `translate(${click_rect.x - rect.x}px, ${click_rect.y - rect.y}px)`,
		["clip-path"]: `rect(0px ${click_rect.width}px ${click_rect.height}px 0px)`
	});
	//match_size(viewed_article, e.currentTarget);
	viewed_article.style.display = "block";



	let x = viewed_article.offsetLeft; // WARN: this is a hack that recalculates dom positioning and updates floating_loader instantly rather than using a propery animation approach

	set_style(viewed_article, {
		["transition-duration"]: `${globalThis.trans}s`,
		transform: `translate(0px, 0px)`,
		["clip-path"]: `rect(0px 100% 100% 0px)`
	});

};

// TODO:
export const close_viewer = () => {
	// Constructs the floating book div on the shelf layer and lets it fly back into the shelf

	globalThis.book_flying_back = globalThis.viewed_book;
	globalThis.viewed_book = null;

	viewer_view.scrollTo({ top: 0, behavior: "smooth" });

	// Set up floating book in initial pos
	floating_book.style["transition-duration"] = "0s";
	match_size(floating_book, viewed_article);
	floating_book.innerHTML = `<div id="floating_book_content" class="floating_book_content">${viewed_article.innerHTML}</div>`;
	floating_book.innerHTML += `
		<section id="fb_heading_container" class="fb_heading_container">
			<h2>${globalThis.book_flying_back.getAttribute("data-title")}</h2>
		</heading>
		`;

	floating_book.querySelector("#article_content").id = "";
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
	viewed_article.style["transition-duration"] = "0s";
	viewed_article.style.opacity = "0";
	// Reset content so subsequent books don't flash with previous book content first
	article_content.innerHTML = "";
	ghost_article_content.innerHTML = "";
	let x2 = viewed_article.offsetLeft;
	viewed_article.style["transition-duration"] = `${globalThis.trans}`;

	// Reset relevant viewer state
	floating_loader.style.height = "";

	// Set floating book to new pos
	set_style(floating_book, {
		["transition-duration"]: `${globalThis.trans}s`,
		["background-color"]: "var(--book-bg)",
	});
	match_size(floating_book, globalThis.book_flying_back);

	floating_book_content.style.opacity = "0";

	// When the anim is done, turn the book back on, turn off the floating book
	setTimeout(() => {
		globalThis.book_flying_back.style.opacity = "1";
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
