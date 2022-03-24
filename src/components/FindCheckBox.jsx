export default function FindCheckBox({ find, setFindsPlaced, findsPlaced }) {
  const handleClick = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFindsPlaced((values) => ({ ...values, [name]: !value }));
    console.log(findsPlaced);
  };

  return (
    <li className="li_checkbox">
      <input
        name={find.find_id}
        type="checkbox"
        id={find.find_id}
        value={findsPlaced.name || false}
        onClick={handleClick}
      />
      <label className="find_checkbox_label" htmlFor={find.find_id}>
        <img className="asset_img" src={find.img_url} alt={find.alt_text} />
      </label>
    </li>
  );
}