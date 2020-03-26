import React, { Component } from 'react';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
)

class App extends Component {
  handleChange = event => {
   const {value} = event.target;
   console.log(value);
   if(value.lenght > 2) {
    console.log('valid search term')
   }
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
            onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default App;
