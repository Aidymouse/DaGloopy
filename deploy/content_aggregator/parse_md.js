import * as fs from "node:fs/promises";
import { bcolors, get_article_html } from "./util.js";

const tag_re = /^(.+?):(.*)/;

/**
 * @param {string} filepath
 * @param {article} article
 */

const series_color_map = {
  "ruby crown": "#ff4000",
  "royan empire": "#009933",
  "the royan empire": "#009933",
};

export const parse_md = async (filepath, article) => {
  const content = await fs.readFile(filepath, { encoding: "utf8" });

  let series = null;

  // Parse md tags to find date
  // TODO: tags
  const lines = content.split("\n");
  for (const line of lines) {
    const m = tag_re.exec(line);
    if (m === null) {
      break;
    }

    const tag = m[1].toLowerCase().trim();
    const tag_content = m[2].trim();

    switch (tag) {
      case "date": {
        article.timestamp = new Date(tag_content).valueOf();
        break;
      }
      case "tags": {
        //TODO
        break;
      }
      case "series": {
        series = tag_content;
      }
      default: {
        console.log(`${bcolors.FAIL}Unhandled tag '${tag}'${bcolors.ENDC}`);
      }
    }
  }

  article.html = get_article_html(article);
  if (series !== null) {
    article.html = article.html.replace(
      "</h2>",
      `</h2><span class="book-strip" style="background-color: ${series_color_map[series]};"></span>\n`,
    );
  }
};
