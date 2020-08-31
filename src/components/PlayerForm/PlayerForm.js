import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

// import './PlayerForm.scss';

class PlayerForm extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
    updatePlayer: PropTypes.func.isRequired,
    editingPlayer: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
  }

  state = {
    name: '',
    position: '',
    imageUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { editingPlayer } = this.props;
    if (editingPlayer.name) {
      this.setState({
        name: editingPlayer.name,
        position: editingPlayer.position,
        imageUrl: editingPlayer.imageUrl,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.editingPlayer;
    const incomingPlayer = this.props.editingPlayer;
    if (prevPlayer.name !== incomingPlayer.name) {
      this.setState({
        position: incomingPlayer.position || '',
        name: incomingPlayer.name || '',
        imageUrl: incomingPlayer.imageUrl || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPlayer.name ? true : false,
      });
    }
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  changePositionEvent = (e) => {
    e.preventDefault();
    this.setState({ position: e.target.value });
  }

  changeImageUrlEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  savePlayerEvent = (e) => {
    // console.warn('got excute');
    e.preventDefault();
    const { name, position, imageUrl } = this.state;
    const { createPlayer } = this.props;

    const newPlayer = {
      name,
      position,
      imageUrl,
      uid: authData.getUid(),
    };

    createPlayer(newPlayer);
  };

  editPlayerEvent = (e) => {
    e.preventDefault();
    const { name, position, imageUrl } = this.state;
    const { updatePlayer, editingPlayer } = this.props;

    const playerWithChanges = {
      name,
      position,
      imageUrl,
      uid: authData.getUid(),
    };

    updatePlayer(editingPlayer.id, playerWithChanges);
  };

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    const {
      name,
      position,
      imageUrl,
      isEditing,
    } = this.state;

    return (
      <form className="col-6 offset-3">
        <button className="btn btn-danger" onClick={this.closeFormEvent}>CLOSE FORM</button>
        <div className="form-group">
          <label htmlFor="name">Player Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Player Name"
            value={name}
            onChange={this.changeNameEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            placeholder="Player Position"
            value={position}
            onChange={this.changePositionEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">ImageUrl</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            placeholder="Enter Image Url"
            value={imageUrl}
            onChange={this.changeImageUrlEvent}
          />
        </div>
        {
          isEditing
            ? <button className="btn btn-dark" onClick={this.editPlayerEvent}>Edit Player</button>
            : <button className="btn btn-dark" onClick={this.savePlayerEvent}>Save Player</button>
        }
      </form>
    );
  }
}

export default PlayerForm;
