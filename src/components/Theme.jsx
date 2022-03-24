export default function Theme({ theme }) {
  return <div className="theme"><img
  className="asset_img"
  src={theme.theme_img}
  alt={theme.theme_id}
/></div>;
}
