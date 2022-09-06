import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../pages/pages-style/HeaderStyle.css';
import MusicIcon from '../pages/Images/pngwing.com.png';

class Header extends React.Component {
  state = {
    userName: '',
    loaded: false,
  };

  async componentDidMount() {
    const info = await getUser();
    const { name } = info;
    this.setState({
      userName: name,
      loaded: true,
    });
  }

  render() {
    const { loaded, userName } = this.state;

    return (
      <header className="asideMenu" data-testid="header-component">
        <img className="MusicIcon" src={ MusicIcon } alt="" />

        <nav>
          <Link
            className="menuOptions"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar

          </Link>
          <Link
            className="menuOptions"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos

          </Link>
          <Link
            className="menuOptions"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil

          </Link>
        </nav>

        <div>
          { loaded ? <p data-testid="header-user-name">{userName}</p>
            : <p>Carregando...</p>}
        </div>

      </header>
    );
  }
}

export default Header;
