import React from 'react';
// import PropTypes from 'prop-types';

import Players from '../Players/Players';

import authData from '../../helpers/data/authData';
import playersData from '../../helpers/data/playersData';
import './Team.scss';

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
        // console.warn('player data ', players);
      })
      .catch((err) => console.error('get players broke!!', err));
  }

  render() {
    const { players } = this.state;
    // const { setSinglePlayer } = this.props;

    const playerCard = players.map((player) => <Players key={player.id} player={player}/>);

    // console.warn(playerCard[6]);
    const offensive = [];
    const middle = [];
    const deffensive = [];
    for (let i = 0; i < 11; i += 1) {
      if (i < 3) {
        if (!playerCard) {
          // const emptyPlayer = { name: 'empty', position: 'offensive' };
          // offensive.push(emptyPlayer);
          // console.warn('empty player');
        } else {
          offensive.push(playerCard[i]);
        }
      }
      if (i > 2 && i < 6) {
        if (!playerCard) {
          // const emptyPlayer = {}
          // console.warn('empty player');
        } else {
          middle.push(playerCard[i]);
        }
      }
      if (i > 5 && i < 10) {
        // console.warn('inside offensive and i = ', i);
        if (!playerCard[i]) {
          // const emptyPlayer = { name: 'empty', position: 'offensive' };
          // offensive.push(emptyPlayer);
          // console.warn('empty player');
        } else {
          deffensive.push(playerCard[i]);
        }
      }
    }
    // const offensive = [playerCard[0], playerCard[1], playerCard[2]];
    // const middle = [playerCard[3], playerCard[4], playerCard[5]];
    // const deffensive = [playerCard[6], playerCard[7], playerCard[8], playerCard[9]];

    return (
      <div>
        <div className="container">
        <h4>offensive</h4>
          <div className="row">
            <div className="d-flex justify-content-center flex-wrap">
              { offensive }
            </div>
          </div>
          <h4>Middle</h4>
          <div className="row">
            <div className="d-flex justify-content-center flex-wrap">
              { middle }
            </div>
          </div>
          <h4>Deffensive</h4>
          <div className="row">
            <div className="d-flex justify-content-center flex-wrap">
              { deffensive }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
