import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './pages-style/AlbumStyle.css';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
    genre: '',
    albumImage: '',
    musicsList: [],
    loading: false,
    // eslint-disable-next-line react/no-unused-state
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ loading: true });
    const request = await getMusics(id);
    this.setState({ loading: false });
    const list = request.filter((each) => each.kind === 'song');
    const { collectionName,
      artistName, primaryGenreName, artworkUrl100 } = request[0];
    this.setState({
      artistName,
      collectionName,
      genre: primaryGenreName,
      albumImage: artworkUrl100,
      musicsList: list,
    });

    this.getFavorites();
  }

  addFavoriteSong = async ({ target }) => {
    if (target.checked) {
      const { musicsList } = this.state;
      const musicName = target.parentElement.parentElement.firstChild.innerText;
      const favorite = musicsList.find((music) => music.trackName === musicName);
      this.setState({ loading: true });
      await addSong(favorite);
      this.setState({ loading: false });
    }
  };

  getFavorites = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ loading: false });
    // eslint-disable-next-line react/no-unused-state
    this.setState({ favoriteSongs: response });
  };

  render() {
    const { artistName,
      collectionName,
      genre, albumImage, musicsList, loading, favoriteSongs } = this.state;
    return (
      <div className="albumBody" data-testid="page-album">
        <Header />
        <section className="infoSection">

          <div className="albumInfo">
            <img src={ albumImage } alt="" />

            <div className="textInfo">
              <h1 data-testid="artist-name">{artistName}</h1>
              <h3 data-testid="album-name">{collectionName}</h3>
              <h4>{genre}</h4>
            </div>
          </div>

          <section className="musicsSection">
            { musicsList.map((music) => (
              <div key={ music.trackId }>
                {console.log(favoriteSongs)}

                <label
                  htmlFor="favoriteCheck"
                >
                  <div
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ this.addFavoriteSong }
                    type="checkbox"
                    name=""
                    id="favoriteCheck"
                    checked={ this.isFavorite }
                    className="star"
                  />
                  <span>{music.trackName}</span>
                </label>

                <div>

                  <audio
                    data-testid="audio-component"
                    src={ music.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                  </audio>
                </div>

              </div>
            ))}
          </section>
        </section>

        {loading && <Loading /> }
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
