export const parseContent = (content: string) => {
  const [head, ...body] = content.split(/<p>/i);
  return {
    head: head.trim(),
    body: `<p>${body.join('<p>')}`,
  };
};
