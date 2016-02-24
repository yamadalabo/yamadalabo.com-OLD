import React from 'react';
import PageNavigator from '../components/PageNavigator';

const HomeImages = ['assets/img/background1.jpg',
                    'assets/img/background2.jpg',
                    'assets/img/background3.jpg',
                    'assets/img/background4.jpg',
                    'assets/img/background5.jpg'];

const Home = () =>
  <div className="app">
    <PageNavigator />
    <img src={HomeImages[Math.floor(Math.random() * HomeImages.length)]} />
    <div className="content">
      <section className="post">
        <div className="post__header">
          <h1>
            Business and Soul Research
          </h1>
        </div>
        <div className="post__body">
          <p>
            山田仁一郞
            <br/>
            大阪市立大学大学院経営学研究科 准教授
            <br/>
            アントレプレナーシップ論・経営戦略論・組織論
          </p>
          <p>
            Yamada Jin-ichiro
            <br/>
            Graduate School of Business, Osaka City Univ. (Associate Professor)
            <br/>
            Entrepreneurship / Strategy / Organizational Theory
          </p>
        </div>
      </section>
    </div>
  </div>;

export default Home;
