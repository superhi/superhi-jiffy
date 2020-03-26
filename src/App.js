import React, { Component } from 'react';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  handleChange = event => {
    const {value} = event.target;
    // by settings the searchTerm in our state and also using that on the input as the value, we have created what is called a *controlled input*. 

      // we need to update the input every time that it changes to update the state manually. Set the state in constructor to empty string and add it as value in the input. After, to grab each time the input changes, set the state with the previous one: pass to setState function our old props and overwrite it to send it to the value in input. 

    this.setState((prevState, props) => ({
      // we take our old props and spread them out here
      ...prevState,
      // and then we overwrite the ones we want after to update the value inside input tag (value={searchTerm})
      searchTerm: value
    }));

    if(value.lenght > 2) {
      console.log('valid search term')
    }
  };

  handleKeyPress = event => {
    const {value} = event.target;
    // when we have two or more characters in our searchbox and we have also pressed enter, we then want to run a search

    if(value.length > 2 && event.key === 'Enter') {
      alert(`search for ${value}`)
    }
    console.log(event.key)
  }

  render () {
    const { searchTerm } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Our stack of giff images*/}
          <input 
            className="input grid-item" 
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm} />
        </div>
      </div>
    );
  }
}

export default App;
