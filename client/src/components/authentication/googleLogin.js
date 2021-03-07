import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from '../../api/index';
import key from './key';
export default function LoginWithGoogle({ saveUser }) {
  const responseSuccess = async (googleResponse) => {
    try {
      const response = await axios.post('/auth/googlelogin', {
        tokenId: googleResponse.tokenId,
        username: googleResponse.profileObj.name,
      });
      const { jwtToken, user } = response.data;
      saveUser(jwtToken, user);
    } catch (error) {
      console.log(error);
    }
  };

  const responseFailure = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId={key}
      buttonText="Login with Google"
      onSuccess={responseSuccess}
      onFailure={responseFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}
