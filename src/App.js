import React, { Component } from 'react';
import loader from './images/loader.svg';
import Gif from './Gif';

const randomChoice = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

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
      loading: false,
      searchTerm: '',
      hintText: '',
      gif: null,
      gifs: []
    }
  }

  //we want a function that searches tha giphy api using fetcha and puts the search term into the query url and then, we can do something with the results

  // we can also write async method into our components that let us use the async/ await stule of function
  searchGiphy = async searchTerm => {
    this.setState({
      // here we set our loading state to be true and this will show the spinner at the bottom.
      loading: true
    })
    try {
      // here we use await to wait keyword for our response to come back in our variable
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=TYauWypYOOlR2bvXeblQTb7qFd1a4sxW&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`);

      // here we convert our raw response to json data
      // const {data} gets .data part of our response
      const {data} = await response.json();

      // here we check if te array of results is empty if it is, we throw an error which will stop the code here and handle in the catch area
      if (!data.length) {
        // eslint-disable-next-line no-throw-literal
        throw `Nothing found for ${searchTerm}`;
      }

      // here we grab a random result from our images.
      const randomGif = randomChoice(data);
      console.log({randomGif})
    
      this.setState((prevState, props) => ({
        ...prevState,
        // get the first result and put it in the state data[0]. We overwrite the gif, and we're setting the gif to be our first image from that array of results. After, we put out random gif, spread them out and then, add our new rando gif onto the end.
        gif: randomGif,
        gifs: [...prevState.gifs, randomGif],
        // we turn off our loading spinner again
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }))
      
      // if our fetch fails, we catch it down here
    } catch (error) {
        this.setState((prevstate, props) => ({
          ...prevstate,
          hintText: error,
          loading: false
        }));
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
      // we set the hintText only when we have more than two characters in our input otherwise we make it an empty string.x
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }));
  };

  handleKeyPress = event => {
    const {value} = event.target;
    // when we have two or more characters in our searchbox and we have also pressed enter, we then want to run a search

    if (value.length > 2 && event.key === 'Enter') {
    //here we call our searchGofphy function using the search term 
      this.searchGiphy(value)    
    }
  }

  render () {
    const { searchTerm, gif } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Our stack of giff images*/}
          {/* here we loop over our array of gif images from our state and we create multiple videos from it creating multiple components */}
          {this.state.gifs.map(gif => ( 
            // we spread out all of our properties into our Gif component
            <Gif {...gif} />
          ))}
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
