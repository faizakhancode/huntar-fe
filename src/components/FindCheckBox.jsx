export default function FindCheckBox({ find, setFindsPlaced, findsPlaced }) {
  const handleClick = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    console.log("name: ", name )
    console.log("value: ", value )
    setFindsPlaced((values) => ({ ...values, [name]: !value }));
    console.log("findsPlaced: ", findsPlaced[find.find_id]);
  };

  return (
    <li className="li_checkbox">
      <input
        name={find.find_id}
        type="checkbox"
        id={find.find_id}
        value={findsPlaced[find.find_id] || false}
        checked={findsPlaced[find.find_id] || false}
        onChange={handleClick}
      />
      <label className="find_checkbox_label" htmlFor={find.find_id}>
        <img className="asset_img" src={find.img_url} alt={find.alt_text} />
      </label>
    </li>
  );
}
