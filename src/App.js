import React, { Component } from 'react';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
)

class App extends Component {
  handleChange = event => {
    console.log(event.key);

   const {value} = event.target;
   if(value.lenght > 2) {
    console.log('valid search term')
   }
  };

  // when we have two or more characters in our searchbox and we have also pressed enter, we then want to run a search
  handleKeyPress = event => {
    const {value} = event.target;
    // when we have two or more characters in our searchbox and we have also pressed enter, we then want to run a search

    if(value.length > 2 && event.key === 'Enter') {
      alert(`search for ${value}`)
    }
    console.log(event.key)
  }

  render () {
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Our stack of giff images*/}
          <input 
            className="input grid-item" 
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress} />
        </div>
      </div>
    );
  }
}

export default App;
