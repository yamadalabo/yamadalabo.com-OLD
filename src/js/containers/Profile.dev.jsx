import React from 'react';
import PageNavigator from '../components/PageNavigator';

const Profile = () =>
  <div className="app">
    <PageNavigator />
    <div className="content">
      <section className="post">
        <div className="post__header">
          <img
            className="profile-image"
            alt="profile"
            src="assets/img/profile.jpg"
          />
          <h1>
            Yamada Jin-ichiro
            <br />
            山田仁一郞
          </h1>
          <hr />
        </div>
        <div className="post__body">
          <h3>
            Current
          </h3>
          <p>大阪市立大学大学院経営学研究科 教授</p>
          <hr />
          <h3>
            Domain
          </h3>
          <ul>
            <li>アントレプレナーシップ</li>
            <li>経営戦略論</li>
            <li>組織論</li>
          </ul>
          <hr />
          <h3>
            Career
          </h3>
          <ul>
            <li>北海道大学大学院経済学研究科博士後期課程修了博士(経営学)</li>
            <li>日本学術振興会特別研究員</li>
            <li>香川大学経済学部准教授</li>
            <li>英国・クランフィールド大学経営大学院客員研究員</li>
            <li>フランス・ボルドー経営大学院客員教授</li>
            <li>独立行政法人・産業技術総合研究所客員研究員</li>
            <li>中小企業診断士出題委員</li>
            <li>文部科学省・科学技術政策研究所客員研究官</li>
            <li>九州大学客員准教授</li>
          </ul>
          <hr />
          <h3>
            Contact
          </h3>
          <p>
            〒558-8585
            <br />
            大阪市住吉区杉本3-3-138
            <br />
            大阪市立大学大学院経営学研究科
            <br />
            山田仁一郞
          </p>
          <p>
            yamada@bus.osaka-cu.ac.jp
          </p>
        </div>
      </section>
    </div>
  </div>;

export default Profile;
