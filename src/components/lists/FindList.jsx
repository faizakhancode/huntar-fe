import Find from "../Find";

export default function FindList({ themes, themeIndex, findSelected, setFindSelected }) {
  const finds = themes.themes[themeIndex].finds;
  const findList = finds.map((find) => {
    return <Find find={find} key={find.find_id} findSelected={findSelected} setFindSelected={setFindSelected} />;
  });

  return <div className="theme_selector_container">{findList}</div>;
}
