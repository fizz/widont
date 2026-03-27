// widont — prevent typographic widows in headings and paragraphs.
// Replaces the last space in rendered text with a non-breaking space so the
// final word doesn't sit alone on a line.
//
// Originally written as a jQuery/CoffeeScript plugin for
// discardedlies.com circa 2007. Rewritten for modern browsers.

document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    'article h1',
    'article h2',
    'article h3',
    'article p',
    '.post-title',
  ]

  function replaceLastTextSpace(el) {
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          return node.nodeValue && node.nodeValue.trim()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT
        },
      }
    )

    const textNodes = []
    let node
    while ((node = walker.nextNode())) {
      textNodes.push(node)
    }

    for (let i = textNodes.length - 1; i >= 0; i -= 1) {
      const text = textNodes[i].nodeValue
      const spaceIndex = text.lastIndexOf(' ')
      if (spaceIndex > 0) {
        textNodes[i].nodeValue =
          text.substring(0, spaceIndex) + '\u00a0' + text.substring(spaceIndex + 1)
        return
      }
    }
  }

  for (const el of document.querySelectorAll(selectors.join(', '))) {
    replaceLastTextSpace(el)
  }
})
