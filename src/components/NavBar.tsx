import logo from '../assets/logo.png'
import { NavBarMenu } from '../MockData/NavData';

const NavBar = () => {
  return (
    <div>
      <nav className='flex justify-between items-center py-3'>
        {/* LOGO SECTION */}
        <div className="container flex justify-between items-center py-3">
          <a href="/">
            <div className="text-1xl flex items-center font-bold">
              <img
                src={logo}
                alt="logo"
                className="navbar-logo h-20 w-auto max-w-full rounded-md object-contain"
              />
              <p>Clique Mambas</p>
            </div>
          </a>
        </div>

        {/* MENU SECTION */}
        <div className='hidden lg:block'>
          <ul>
            {
              NavBarMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a href="{item.link}" className='inline-block text-black'>{item.title}</a>
                  </li>
                );
              })
              
            }
          </ul>
        </div>

      </nav>
    </div>
  );
};

export default NavBar;
