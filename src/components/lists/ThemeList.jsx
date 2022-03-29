import Theme from "../Theme";

export default function ThemeList({ themes }) {

  const themeList = themes.map((theme) => {
    return <Theme theme={theme} key={theme.theme_id} />;
  });

  return <ul className="list_themes">{themeList}</ul>;
}
