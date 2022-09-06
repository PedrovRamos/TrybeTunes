import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './pages-style/LoginStyle.css';
import MusicIcon from './Images/pngwing.com.png';

class Login extends React.Component {
  state = {
    isLoginButtonDisabled: true,
    nameValue: '',
    loged: false,
    loding: '',
  };

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({
      [id]: value,
    }, () => {
      this.validateButton();
    });
  };

  validateButton = () => {
    const { nameValue } = this.state;
    if (nameValue.length > 2) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  };

  onClickButtonChange = async () => {
    const { nameValue } = this.state;
    this.setState({
      loding: true,
    });
    await createUser({ name: nameValue });
    this.setState({
      loged: true,
      loding: false,
    });
  };

  render() {
    const { isLoginButtonDisabled, nameValue, loged, loding } = this.state;

    return (

      <div className="body" data-testid="page-login">

        <img src={ MusicIcon } alt="" />

        <div className="formContainer">

          <h1>Bem vindo de volta !</h1>
          <p>Insira seu nome para acessar sua conta.</p>

          <form>
            <label htmlFor="nameValue">
              <input
                placeholder="Insira seu nome aqui"
                data-testid="login-name-input"
                type="text"
                id="nameValue"
                onChange={ this.handleChange }
                value={ nameValue }
              />
            </label>

          </form>
          <button
            disabled={ isLoginButtonDisabled }
            type="button"
            data-testid="login-submit-button"
            id="button"
            onClick={ this.onClickButtonChange }
          >
            Entrar
          </button>

          { loged && <Redirect to="/search" /> }

          { loding && <Loading /> }

        </div>

      </div>

    );
  }
}

export default Login;
