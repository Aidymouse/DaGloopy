import * as fs from "node:fs/promises";
import * as path from "node:path";
import { parse_md } from "./parse_md.js";
import { shelf_regex, bcolors } from "./util.js";

/** @typedef {object} article
 * @property {string} title
 * @property {string} filetype
 * @property {string} content_url
 * @property {number} timestamp
 * @property {string} html
 */

const shelf_template = `<!-- SHELF: shelftitle -->
shelfcontent
<!-- STOP SHELF: shelftitle -->`;

let shelves = {};

const diary_sorter = (articles) => {
  let series_names = [];
  for (const article of articles) {
    let series_name = article.title.split(" ")[0].toLowerCase();
    if (series_name === "the") {
      series_name += " " + article.title.split(" ")[1].toLowerCase();
    }
    if (!series_names.includes(series_name)) {
      series_names.push(series_name);
    }
  }

  let sorted_shelf = [];
  for (const series_name of series_names) {
    let sorted_series = articles.filter((a) =>
      a.title.toLowerCase().startsWith(series_name),
    );

    console.log(sorted_series.map((a) => a.title));

    sorted_series = sorted_series.sort(
      (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
    );

    sorted_shelf = sorted_shelf.concat(sorted_series);
  }

  return sorted_shelf;
};

const ignored_folders = ["public", "content"];

const aggregate_content = async () => {
  console.log(import.meta.dirname);
  const read = await fs.glob(import.meta.dirname + "/../../public/**/*");

  for await (const f of read) {
    const filename = path.basename(f);
    const dir = path.dirname(f);

    const shelf = dir.split("/")[dir.split("/").length - 1];
    const title = filename
      .split(".")
      .filter((sp, idx) => idx !== filename.split(".").length - 1)
      .join(".");
    const filetype = filename.split(".")[filename.split(".").length - 1];

    if (ignored_folders.includes(shelf)) {
      continue;
    }
    console.log(shelf, title, filetype);

    if (!shelves[shelf]) {
      shelves[shelf] = [];
    }

    // Harvest articles for relevant data
    let article = {
      title,
      filetype,
      content_url: dir.replace(/^.+?content/, "content") + `/${filename}`,
      date: null,
      html: "",
    };

    switch (filetype) {
      case "md": {
        // TODO: tag articles with tags
        await parse_md(f, article);
        break;
      }
      default: {
      }
    }

    shelves[shelf].push(article);
  }

  // Read index
  // TODO: make copy of index
  let index = await fs.readFile(`${import.meta.dirname}/../../index.html`, {
    encoding: "utf8",
  });

  for (const shelfName of Object.keys(shelves)) {
    // Sort articles by date
    let sortedShelf = shelves[shelfName].sort(
      (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
    );

    // Special sort for diary
    if (shelfName === "dagloopyrpgdiary") {
      sortedShelf = diary_sorter(shelves[shelfName]);
      console.log(sortedShelf.map((a) => a.title));
    }

    console.log(`Pushing ${bcolors.OKBLUE}'${shelfName}'${bcolors.ENDC}`);

    const new_article_html = shelf_template
      .replaceAll("shelftitle", shelfName)
      .replace("shelfcontent", sortedShelf.map((a) => a.html).join("\n"));

    const r = shelf_regex.replaceAll("shelftitle", shelfName);
    index = index.replace(new RegExp(r), new_article_html);
  }

  if (process.argv.includes("--deploy")) {
    fs.writeFile(`${import.meta.dirname}/../../index.html`, index, {
      encoding: "utf8",
    });
  } else {
    console.log(
      `${bcolors.OKBLUE}WOULD push out ${Object.entries(shelves).reduce((total, [sName, s]) => total + s.length, 0)} articles. To do this for real, re-run with ${bcolors.WARNING}--deploy`,
    );
  }
};

aggregate_content();
