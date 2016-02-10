import React from 'react';
import PageNavigator from '../components/PageNavigator';

const HomeImages = ['http://static.tumblr.com/bd12078abcb9a9e10ea7411396482824/ccekue0/zGonytyc8/tumblr_static_b1x87zrm55c8s4swg4ck8cssc.jpg',
                    'http://static.tumblr.com/5d20bc4f72c397369ba5879af25faccd/ccekue0/iEtnwcc0k/tumblr_static_xslavngs8u8wc0o0sskks4cw_2048_v2.jpg',
                    'http://static.tumblr.com/caa1f1f2ee4fda79bfff1b4d33457e5b/ccekue0/glrnwx0ai/tumblr_static_23bdp1tq635wckgo0kgo4c0go.jpg'];

const Home = () =>
  <div className="app">
    <PageNavigator />
    <img src={HomeImages[Math.floor(Math.random() * HomeImages.length)]} />
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
