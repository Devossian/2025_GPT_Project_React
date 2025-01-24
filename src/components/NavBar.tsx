import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Devossian-GPT</div>
      <div className="links">
        <a href="/" className='link'>Home</a>
        <a href="/chat" className='link'>Chat</a>
        <a href="/login" className='link'>Login</a>
      </div>
    </nav>
  );
};

export default NavBar;