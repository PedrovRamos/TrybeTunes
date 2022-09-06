import React from 'react';
import Header from '../components/Header';
import './pages-style/FavoritesStyle.css';

class Favorites extends React.Component {
  render() {
    return (
      <div className="favoritesBody" data-testid="page-favorites">
        <Header />
        <h1>Página dos favoritos</h1>
      </div>

    );
  }
}

export default Favorites;
