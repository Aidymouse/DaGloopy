/**
 * Sets the style for an elem from an obj
 * @param elem {HTMLElement} - The element to apply styles to
 * @param style {Object} - A key-value object where key is a CSS property and value is the value of that CSS property
 */
export const set_style = (elem, style) => {
  for (const [styleKey, styleVal] of Object.entries(style)) {
    elem.style[styleKey] = styleVal
  }
}

/**
 * Calls the provided callback function AFTER the next paint has happened.
 * I learned about the JS event loop today.
 * @param callback {() => void}
 */
export const after_next_render = (callback) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback()
    })
  })
}

/** Sets elem1's top, left, width and height to the x, y, width, height of elem2
 * @param elem1 - Element of absolute position
 * @param elem2 - Element to match size of
 */
export const match_size = (elem1, elem2) => {
  const rect = elem2.getBoundingClientRect()
  elem1.style.left = `${rect.x}px`
  elem1.style.top = `${rect.y}px`
  elem1.style.width = `${rect.width}px`
  elem1.style.height = `${rect.height}px`
}
