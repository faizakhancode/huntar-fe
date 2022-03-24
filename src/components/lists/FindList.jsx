import Find from "../Find";

export default function FindList({
  themes,
  themeIndex,
  findSelected,
  setFindSelected,
}) {
  const finds = themes.themes[themeIndex].finds;
  const findList = finds.map((find) => {
    return (
      <Find
        find={find}
        key={find.find_id}
        findSelected={findSelected}
        setFindSelected={setFindSelected}
      />
    );
  });

  return <ul className="ul_list_container">{findList}</ul>;
}
