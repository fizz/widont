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

The name and the idea come from [Shaun Inman's WordPress plugin](https://web.archive.org/web/20230226065450/https://shauninman.com/archive/2006/08/22/widont_wordpress_plugin) (2006), which John Gruber amplified on Daring Fireball. I wrote a jQuery/CoffeeScript version for discardedlies.com around 2007. This is a rewrite for modern browsers, no dependencies.

## License

MIT
