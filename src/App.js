import React from 'react';

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
)

function App() {
  return (
    <div className="page">
      <Header />
      <div className="search grid">
        {/* Our stack of giff images*/}
        <input className="input grid-item" placeholder="Type something" />
      </div>
    </div>
  );
}

export default App;
