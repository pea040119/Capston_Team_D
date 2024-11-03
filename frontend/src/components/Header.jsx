import './Header.css';
const Header = ({ title, leftchild, rightchild }) => {
  return (
    <header className="Header">
      <div className="header_left">{leftchild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightchild}</div>
    </header>
  );
};

export default Header;
