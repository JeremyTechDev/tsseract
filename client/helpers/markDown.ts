import dompurify from 'dompurify';
import emoji from 'node-emoji';
import hljs from 'highlight.js';
import marked from 'marked';

marked.options({
  gfm: true,
  xhtml: true,
  highlight: (code, lang) => {
    const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(validLang, code).value;
  },
});

/**
 * Returns a dangerouslySetInnerHTML with a clean markdown string
 * @param {string} text - text to parse
 * @returns { __html: sanitized } - sanitized html with markdown and emojies
 */
export const markDown = (text: string) => {
  const withEmoji = emoji.emojify(text);
  const withMarkDown = marked(withEmoji);
  const sanitized = dompurify.sanitize(withMarkDown);

  return { __html: sanitized };
};
