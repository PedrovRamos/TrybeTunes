import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './pages-style/SearchStyle.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    isSearchButtonDisabled: true,
    searchValue: '',
    searchLoading: false,
    searchResult: [],
    searchFail: false,
    message: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchValue: value,
    }, () => {
      const { searchValue } = this.state;
      if (searchValue.length > 1) {
        this.setState({
          isSearchButtonDisabled: false,
        });
      } else {
        this.setState({
          isSearchButtonDisabled: true,
        });
      }
    });
  };

  doSearch = async () => {
    const { searchValue } = this.state;
    this.setState({ searchLoading: true });
    const response = await searchAlbumsAPI(searchValue);
    if (response.length === 0) {
      this.setState({ searchFail: true });
    }
    this.setState({ searchLoading: false });
    this.setState({
      searchResult: response,
    });

    this.setState({ message: `Resultado de álbuns de: ${searchValue}`, searchValue: '' });
  };

  render() {
    const {
      isSearchButtonDisabled,
      searchValue,
      searchLoading,
      searchResult,
      searchFail,
      message,
    } = this.state;

    return (
      <div className="searchBody" data-testid="page-search">
        <Header />

        <div className="searchContent">

          <form className="searchContainer">
            <label htmlFor="searchInput">
              <input
                value={ searchValue }
                onChange={ this.handleChange }
                id="searchInput"
                data-testid="search-artist-input"
                type="text"
              />
            </label>
            <button
              disabled={ isSearchButtonDisabled }
              onClick={ this.doSearch }
              data-testid="search-artist-button"
              type="button"
            >
              Pesquisar
            </button>

          </form>

          { searchLoading && <Loading /> }

          <p className="searchMessage">{message}</p>

          <div className="albumsContainer">

            {searchResult.map(
              ({ artistName, collectionName, artworkUrl100, collectionId }) => (

                <div className="albumCard" key={ collectionId }>
                  <Link
                    className="albumCardContainer"
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                  >
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <p>{collectionName}</p>
                    <p className="nameCard">{artistName}</p>
                  </Link>
                </div>
              ),
            )}
          </div>

          {
            searchFail && <p className="searchError">Nenhum álbum foi encontrado</p>
          }
        </div>
      </div>

    );
  }
}

export default Search;
