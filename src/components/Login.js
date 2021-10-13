import React from 'react';

import { GoogleOutlined } from '@ant-design/icons';

import firebase from 'firebase/app';

import { auth } from '../firebase';

export default function Login() {
  return (
    <div id="login-page">
      <h2
        id="login-cardName"
        style={{
          color: 'white',
        }}
      >
        Welcome to sisVSsis MiniChatHUB!
      </h2>

      <div id="login-card">
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In with Google
        </div>

        <br />
        <br />
      </div>
    </div>
  );
}
