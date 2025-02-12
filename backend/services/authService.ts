import axios from 'axios';
import qs from 'qs';

class AuthService {
  async getGoogleOAuthTokens(code: string): Promise<{ id_token: string, access_token: string}> {
    const url = 'https://oauth2.googleapis.com/token';
    const values = qs.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      grant_type: 'authorization_code',
    });

    try {
      const res = await axios.post(url, values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      return res.data;
    } catch (error) {
      console.error(error, 'Failed to fetch Google Oauth Tokens');
      throw new Error(error.message);
    }
  }

  // async getGoogleUser({ id_token, accessToken }) {
  //   try {
  //     const res = await axios.get('')
  //   } catch (error) {
      
  //   }
  // }
}

export default new AuthService;
