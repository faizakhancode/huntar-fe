import FindCheckBox from "../FindCheckBox";

export default function FindCheckBoxList({
  themes,
  themeIndex,
  findsPlaced,
  setFindsPlaced,
}) {
  const finds = themes.themes[themeIndex].finds;
  const findList = finds.map((find) => {
    return (
      <FindCheckBox
        find={find}
        key={find.find_id}
        setFindsPlaced={setFindsPlaced}
        findsPlaced={findsPlaced}
      />
    );
  });

  return <div className="ul_list_container">{findList}</div>;
}
