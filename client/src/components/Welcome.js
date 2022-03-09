/* eslint-disable semi */
import React from 'react';
// import { Link } from 'react-router-dom';
import Logo from './Logo';

const Welcome = () => (
  <div className="welcome--container">
    <h3 className="welcome--message-text">Welcome to the Template</h3>
    <div className="page-layout--header">
      <div className="page-layout--details">
        <h1 className="page-layout--name">CacheMoney MERN Stack Template</h1>

      </div>
    </div>
    <Logo />
  </div>
);

export default Welcome;
