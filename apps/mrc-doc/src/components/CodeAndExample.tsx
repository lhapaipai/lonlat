interface Props {
  Element: () => JSX.Element;
  html: string;
}

export default function CodeAndExample({ Element, html }: Props) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <Element />
    </div>
  );
}
