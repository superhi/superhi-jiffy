import React, { Component } from 'react';
import loader from './images/loader.svg';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({loading, hintText}) => (
  <div className="user-hint">
  {/* here we check whether we have a loading state and render out either our spinner or hintText based on that, using a ternary operator */}
    {loading ? <img className="block mx-auto" src={loader} alt="loader"/> : hintText}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: ''
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
      searchTerm: value,
      // we set the hintText only when we have more than two characters in our input otherwise we make it an empty string.
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }));
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
        {/* Here we pass our userHing all of our state using a spread */}
        <UserHint {...this.state}/>
      </div>
    );
  }
}

export default App;
