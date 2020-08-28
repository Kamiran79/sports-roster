import React from 'react';

import playerShape from '../../helpers/propz/playerShape';

import './players.scss';

class Players extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;

    return (
      <div className="card text-center m-2">
        <div className="card-header"><h5>{player.name}</h5></div>
        <div className="card-body">
          <p className="card-title">{player.position}</p>
          <p className="card-text">
          </p>
          <button className="btn btn-secondary">View Board Details</button>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

export default Players;
