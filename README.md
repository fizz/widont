# widont

Prevent typographic widows in headings and paragraphs. Replaces the last space in rendered text with a non-breaking space (`&nbsp;`) so the final word doesn't sit alone on a line.

```
Before:  "Your EKS nodes are dying and the ASG doesn't
         care"

After:   "Your EKS nodes are dying and the ASG
         doesn't care"
```

## Usage

Drop `widont.js` into your site and load it after the DOM:

```html
<script src="/js/widont.js"></script>
```

It runs on `DOMContentLoaded` and processes `article h1`, `article h2`, `article h3`, `article p`, and `.post-title`. Edit the `selectors` array at the top of the file to match your markup.

## Hugo

Put `widont.js` in `assets/js/` and add this to your footer partial:

```html
{{ $widont := resources.Get "js/widont.js" | fingerprint }}
<script src="{{ $widont.RelPermalink }}" integrity="{{ $widont.Data.Integrity }}"></script>
```

## How it works

For each matching element, a `TreeWalker` collects all text nodes. Starting from the last text node and working backwards, it finds the last space character and replaces it with `\u00a0` (non-breaking space). This handles elements with inline markup (`<code>`, `<em>`, `<a>`) correctly — the walker sees through the tags to the actual text.

## History

I wrote the first version as a jQuery/CoffeeScript plugin for discardedlies.com around 2007. The name comes from the typographic term — a widow is a single word left alone on the last line of a paragraph. This version is a rewrite for modern browsers, no dependencies.

## License

MIT
