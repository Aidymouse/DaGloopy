export const bcolors = {
  HEADER: "\x1b[95m",
  OKBLUE: "\x1b[94m",
  OKCYAN: "\x1b[96m",
  OKGREEN: "\x1b[92m",
  WARNING: "\x1b[93m",
  FAIL: "\x1b[91m",
  ENDC: "\x1b[0m",
  BOLD: "\x1b[1m",
  UNDERLINE: "\x1b[4m",
};

const month_map = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const get_nice_date = (timestamp) => {
  const d = new Date(timestamp);
  return `${d.getDate()} ${month_map[d.getMonth()]} ${d.getFullYear()}`;
};

export const get_article_html = (article) => `<shelf-book
    contenturl="${article.content_url}"
    title="${article.title}"
    date="${article.timestamp ? get_nice_date(article.timestamp) : ""}"
    series="${article.series}"
></shelf-book>`;

export const shelf_regex = `<!-- SHELF: shelftitle -->(.|\\n)*<!-- STOP SHELF: shelftitle -->`;
