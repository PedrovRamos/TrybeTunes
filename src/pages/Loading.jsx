import React from 'react';
import './pages-style/LoadingStyle.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="backgroundLoading">
        <h1 className="textLoading">Carregando...</h1>
      </div>

    );
  }
}

export default Loading;
