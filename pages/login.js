import { useState } from 'react';
import axios from 'axios';
import Serializer from '../components/serializer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetail, setuserDetail] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const payload = {
            email: e.target.email.value,
            password: e.target.password.value
          }
      const response = await axios.post(
        'https://api.rekreasi.com/api/auth/signin/password',payload
        
     
      );
      const token = response.data.token
      const header =   
       {
          headers: {          
            Authorization: `Bearer ${token}`
          }
        }
        // Lakukan sesuatu dengan data respons




     const session =  await axios.get("https://api.rekreasi.com/api/auth/session",  header)
     const myId = session.data.data.user.id
     const myDetail = await axios.get(`https://api.rekreasi.com/api/users/${myId}?include=activities,participating,wishlists,followers,following,avatar`)
   
     const deserialized =  Serializer.deserialize("users", myDetail.data)
    setuserDetail(deserialized)
   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
