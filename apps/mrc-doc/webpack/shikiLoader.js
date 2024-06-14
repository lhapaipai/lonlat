import { codeToHtml } from "shiki";

export default async function shikiLoader(source) {
  const htmlString = await codeToHtml(source, {
    lang: "tsx",
    themes: {
      light: "github-light-default",
      dark: "github-dark-default",
    },
    defaultColor: false,
  });
  return `export default ${JSON.stringify(htmlString)}`;
}
