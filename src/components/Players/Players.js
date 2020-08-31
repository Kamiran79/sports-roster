import React from 'react';
import PropTypes from 'prop-types';

import playerShape from '../../helpers/propz/playerShape';

import './players.scss';

class Players extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    deletePlayer: PropTypes.func.isRequired,
    editAPlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, deletePlayer } = this.props;
    deletePlayer(player.id);
  };

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { player, editAPlayer } = this.props;
    editAPlayer(player);
  };

  render() {
    const { player } = this.props;

    return (
      <div className="card">
        <div className="imgBx" data-text={player.name}>
          <img src={player.imageUrl} alt=""/>
        </div>
        <div className="content">
          <div>
            <h2>{player.name}</h2>
            <p>{player.position}</p>
            <div className="container1">
              <button className="btn mr-1 aLink1" onClick={this.editPlayerEvent}><span>Edit</span></button>
              <button className="btn aLink2" onClick={this.deletePlayerEvent}><span>Delete</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Players;

/*

card working div some style to new one above ::

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
*/
