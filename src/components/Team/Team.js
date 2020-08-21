import React from 'react';
// import PropTypes from 'prop-types';

import Players from '../Players/Players';

import authData from '../../helpers/data/authData';
import playersData from '../../helpers/data/playersData';
// import './Team.scss';

class Team extends React.Component {
  // static PropTypes = {
  // setSinglePlayer: PropTypes.func.isRequired,
  // }

  state = {
    players: [],
  }

  componentDidMount() {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => {
        this.setState({ players });
        console.warn('player data ', players);
      })
      .catch((err) => console.error('get players broke!!', err));
  }

  render() {
    const { players } = this.state;
    // const { setSinglePlayer } = this.props;

    const playerCard = players.map((player) => <Players key={player.id} player={player}/>);

    return (
      <div>
        <h2>INSIDE Team COMPONENT</h2>
        <div className="card-columns"></div>
        {playerCard}
      </div>
    );
  }
}

export default Team;
