export default function FindCheckBox({ find, setFindsPlaced, findsPlaced }) {
  const handleClick = (event) => {
    const name = event.target.name;
    if (findsPlaced[name] === true) {
      setFindsPlaced((values) => ({ ...values, [name]: false }));
    } else {
      setFindsPlaced((values) => ({ ...values, [name]: true }));
    }
  };

  return (
    <li className="li_checkbox">
      <input
        name={find.find_id}
        type="checkbox"
        id={find.find_id}
        onChange={handleClick}
        checked={findsPlaced[find.find_id]}
      />
      <label className="find_checkbox_label" htmlFor={find.find_id}>
        <img className="asset_img" src={find.img_url} alt={find.alt_text} />
      </label>
    </li>
  );
}
