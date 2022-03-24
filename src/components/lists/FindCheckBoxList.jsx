import FindCheckBox from "../FindCheckBox";

export default function FindCheckBoxList({ themes, themeIndex, findSelected, setFindSelected }) {
  const finds = themes.themes[themeIndex].finds;
  const findList = finds.map((find) => {
    return <FindCheckBox find={find} key={find.find_id} findSelected={findSelected} setFindSelected={setFindSelected} />;
  });

  return <div className="theme_selector_container">{findList}</div>;
}
