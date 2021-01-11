import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from '../../api/index';
import key from './key';
export default function LoginGoogle() {
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

const responseSuccess = (response) => {
  axios
    .post('login/googlelogin', {
      tokendId: response.tokenId,
      username: response.profileObj.name,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(response));
};

const responseFailure = (response) => {
  console.log(response);
};
