import React from 'react';
// import 'swiper/css/swiper.min.css';
// import PropTypes from 'prop-types';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { EffectFade } from 'swiper';
// import Swiper from 'swiper';

import Players from '../Players/Players';
import PlayerForm from '../PlayerForm/PlayerForm';

import authData from '../../helpers/data/authData';
import playersData from '../../helpers/data/playersData';

import './Team.scss';

// SwiperCore.use([EffectFade]);

class Team extends React.Component {
  // static PropTypes = {
  // setSinglePlayer: PropTypes.func.isRequired,
  // }

  state = {
    players: [],
    formOpen: false,
    editPlayer: {},
  }
  /*
    this.swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    */

  getPlayers = () => {
    playersData.getPlayersByUid(authData.getUid())
      .then((players) => {
        this.setState({ players });
        // console.warn('player data ', players);
      })
      .catch((err) => console.error('get players broke!!', err));
  }

  deletePlayer = (playerId) => {
    playersData.deletePlayer(playerId)
      .then(() => this.getPlayers())
      .catch((err) => console.error('get players broke!! ', err));
  }

  createPlayer = (newPlayer) => {
    playersData.createPlayer(newPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Create Player Broke ', err));
  };

  editAPlayer = (playerToEdit) => {
    this.setState({ formOpen: true, editPlayer: playerToEdit });
  };

  updatePlayer = (playerId, editedPlayer) => {
    playersData.updatePlayer(playerId, editedPlayer)
      .then(() => {
        this.getPlayers();
        this.setState({ formOpen: false, editPlayer: {} });
      })
      .catch((err) => console.error('Update Player Broked ', err));
  };

  closeForm = () => {
    this.setState({ formOpen: false });
  };

  componentDidMount() {
    this.getPlayers();
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }

  render() {
    const { players, formOpen, editPlayer } = this.state;
    // const { setSinglePlayer } = this.props;

    const playerCard = players.map((player) => <Players
      key={player.id}
      player={player}
      deletePlayer={this.deletePlayer}
      editAPlayer={this.editAPlayer}
    />);
    console.warn(authData.getUser);
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
        <div>
          {!formOpen
            ? <button
              className="btn btn-warning"
              onClick={() => {
                this.setState({ formOpen: true, editPlayer: {} });
              }}><i className='far fa-plus-square'></i></button>
            : ''
          }
          {formOpen ? <PlayerForm
            createPlayer={this.createPlayer}
            editingPlayer={editPlayer}
            updatePlayer={this.updatePlayer}
            closeForm={this.closeForm}/>
            : ''
          }
        </div>
        <div className="container">
          {playerCard}
        </div>
      </div>
    );
  }
}

export default Team;

/*
Div working will changing that

<div>
        <button className="btn btn-info">Go to swipper test</button>
        <div className="container">
        <h4>offensive</h4>
          <div className="row">
            <div className="">
              { offensive }
            </div>
          </div>
          <h4>Middle</h4>
          <div className="row">
            <div className="">
              { middle }
            </div>
          </div>
          <h4>Deffensive</h4>
          <div className="row">
            <div className="">
              { deffensive }
            </div>
          </div>
          <div>
          <div classNameName="row">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
                <div className="swiper-slide" ></div>
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
            <Swiper
              effect="flip"
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              // eslint-disable-next-line no-shadow
              onSwiper={(swiper) => console.warn(swiper)}
              onSlideChange={() => console.warn('slide change')}
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              ...
            </Swiper>
          </div>
          {/* Container below div  above for the swipper cards }
          </div>
          </div>

*/
