export const countTokens = (text: string) => {
  // This is a simple tokenization based on whitespace
  // In real world - I will opt for something more sophisticated
  return text.split(/\s+/).length;
};
// this a function to strip the html tags from the react quill editor
export const stripHtml = (html: any) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
