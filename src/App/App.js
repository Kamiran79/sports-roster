import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Sports Rosters</h2>
        <button className="btn btn-info"><i className="fas fa-quidditch"></i> I am a button <i className="fas fa-quidditch"></i></button>
      </div>
    );
  }
}

export default App;
