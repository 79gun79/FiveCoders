import sanitizeHtml from 'sanitize-html';

export const cleanContent = (body: string) =>
  sanitizeHtml(body, {
    allowedTags: ['p', 'strong', 'em', 'u', 's', 'a', 'img', 'span'],
    allowedAttributes: {
      strong: ['style'],
      em: ['style'],
      u: ['style'],
      s: ['style'],
      span: ['style'],
      a: ['href', 'target'],
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'data'],
    allowedStyles: {
      '*': {
        color: [/^red$/, /^blue$/, /^green$/, /^black$/, /^orange$/],
      },
    },
  });
