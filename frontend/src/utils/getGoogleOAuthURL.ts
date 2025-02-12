export const getGoogleOAuthURL = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  // https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
  // client_id=563131405539-2h5aa1ola2ad8ngh8k1ftuk5c510ker4.apps.googleusercontent.com&
  // scope=openid%20email%20profile&
  // response_type=id_token&
  // gsiwebsdk=gis_attributes&
  // redirect_uri=http%3A%2F%2Flocalhost%3A3000&
  // response_mode=form_post&
  // origin=http%3A%2F%2Flocalhost%3A3000&
  // display=popup&
  // prompt=select_account&
  // gis_params=ChVodHRwOi8vbG9jYWxob3N0OjMwMDASFWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMBgHKitwVDRZa0RSQzRWZGtkRUVZenh5QlRUVmc3Z3E5Y3ZBMUpHdDFEUXJIalE0Mkg1NjMxMzE0MDU1MzktMmg1YWExb2xhMmFkOG5naDhrMWZ0dWs1YzUxMGtlcjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb204AUJAZjA1NGY1M2IxYTFlZTM4MDgwNWViMzg5NGY4NmJhZmY4YmYxNmI5NzE4ZDc1Yzk2MTViNWYyMGFkNmQzNzdjMQ&
  // service=lso&
  // o2v=1&
  // ddm=1&
  // flowName=GeneralOAuthFlow

  const options = {
    redirect_uri: import.meta.env.VITE_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    response_type: 'code',
    prompt: 'select_account',
    display: 'popup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);
  console.log({options});
  console.log({qs: qs.toString()});

  return `${rootUrl}?${qs.toString()}`;
};
