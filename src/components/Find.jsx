export default function Find({ find }) {
  return (
    <button className="button_find">
      <img className="asset_img" src={find.img_url} alt={find.alt_text} />
    </button>
  );
}
