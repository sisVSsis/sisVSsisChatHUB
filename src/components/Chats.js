import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';

import { useAuth } from '../contexts/AuthContext';

import { auth } from '../firebase';

export default function Chats() {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await auth.signOut();
    history.push('/');
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], 'test.jpg', { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push('/');
        return;
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get('https://api.chatengine.io/users/me/', {
          headers: {
            'project-id': '67975a1a-e6a3-4a16-9928-60f6a5ff01a5',
            'user-name': user.email,
            'user-secret': user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios
              .post('https://api.chatengine.io/users/', formdata, {
                headers: {
                  'private-key': '247407af-0afe-4199-9866-75a9c2e9500e',
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log('e', e.response));
          });
        });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history]);

  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div
          className="logo-tab"
          style={{
            fontFamily: 'Merienda One',
            background:
              '-webkit-linear-gradient(45deg, #FE6B8B 30%, #7c4dff 50%, #651fff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          sisVSsis | MiniChatHUB
        </div>

        <div onClick={handleLogout} className="logout-tab" style={{color: "white" }}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="67975a1a-e6a3-4a16-9928-60f6a5ff01a5"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
