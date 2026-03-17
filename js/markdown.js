/*
 * @param markdown_text (string) -
 */
export const process_markdown = (markdown_text) => {
  // TODO: get rid of prelim headings

  const cleaned = markdown_text.replace(/\.\.\./g, "&hellip;")

  const s = new showdown.Converter({ tables: true });

  const html = s.makeHtml(cleaned);

  return html;
};
