export default function FindCheckBox({ find }) {
  return (
    <div>
      <input type="checkbox" id={find.find_id} />
      <label htmlFor={find.find_id}>
        <img className="asset_img" src={find.img_url} alt={find.alt_text} />
      </label>
    </div>
  );
}
