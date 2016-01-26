import React from 'react';
import PageNavigator from '../components/PageNavigator';

const Home = () =>
  <div className="app">
    <PageNavigator />
    <div className="content">
      <section className="post">
        <h1>
          Welcome to Yamada Jin-ichiro Lab
        </h1>
        <p>
          Hello, we are studing entrepreneurship and sociology in Osaka City University.
          <br/>
          Feel free to ask.
        </p>
      </section>
    </div>
  </div>;

export default Home;
