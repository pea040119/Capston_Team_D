import './Header.css';
const Header = ({ title, leftchild, rightchild }) => {
  return (
    <header className="Header">
      <button className="header_left">{leftchild}</button>
      <div className="header_center">{title}</div>
      <button className="header_right">{rightchild}</button>
    </header>
  );
};

export default Header;
