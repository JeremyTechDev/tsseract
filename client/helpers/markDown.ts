import emoji from 'node-emoji';
import marked from 'marked';
import dompurify from 'dompurify';

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
