import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Página do perfil</h1>
      </div>

    );
  }
}

export default Profile;
