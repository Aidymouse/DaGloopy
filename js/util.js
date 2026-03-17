

/** 
 * Sets the style for an elem from an obj
 * @param elem {HTMLElement} - The element to apply styles to
 * @param style {Object} - A key-value object where key is a CSS property and value is the value of that CSS property
 */
export const set_style = (elem, style) => {
  for (const [styleKey, styleVal] of Object.entries(style)) {
    elem.style[styleKey] = styleVal;
  }
};
