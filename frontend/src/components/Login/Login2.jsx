// Import React and other necessary modules
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login2.css'; // Import the CSS file
import Header from '../Header/Header';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

function Login2() {
 
    const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  
  const onLoginFormSubmit = (userCredentialsObject) => {
    axios.get(`${API_BASE_URL}/userapi/users/${userCredentialsObject.username}`)
      .then(res => {
        if (res.data.payload) {
          const {password , role} = res.data.payload
            if(password === userCredentialsObject.password)
            {
              if (userCredentialsObject.role === 'admin' && role === 'admin') {
                  navigate(`/AdminHome/${userCredentialsObject.username}`, { state: res.data.payload });
                } else if (userCredentialsObject.role === 'staff' && role === 'staff') {
                  navigate(`/StaffHome/${userCredentialsObject.username}`, { state: res.data.payload });
                } else {
                alert('Invalid Role!!');
                }
            }
        } else {
          alert("User Not Found!")
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
    }

  // const onLoginFormSubmit = (userCredentialsObject) => {
  //   fetch(`http://localhost:4000/users/${userCredentialsObject.username}`, {
  //     method: "GET" 
  //   })
  //   .then((res) => {
  //     if (!res.ok) {
  //       alert("Unable to fetch User Data, try again later!");
  //     }
  //     return res.json();
  //   })
  //   .then((userObjArray) => {
  //     if (userObjArray.payload === undefined) {
  //       alert("User not found");
  //     } else {
  //       const { password, role } = userObjArray.payload;

  //       if (password === userCredentialsObject.password) {
  //         if (userCredentialsObject.role === 'admin' && role === 'admin') {
  //           navigate(`/AdminHome/${userCredentialsObject.username}`, { state: userObjArray.payload });
  //         } else if (userCredentialsObject.role === 'staff' && role === 'staff') {
  //           navigate(`/StaffHome/${userCredentialsObject.username}`, { state: userObjArray.payload });
  //         } else {
  //           alert('Invalid Role!!');
  //         }
  //       } else {
  //         alert("Wrong Password");
  //       }
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  // };

  return (
    <div>
      <Header />


      <div className="outer-container">
    
      <div className="containerl">
        <div className="heading">Login</div>
        <form action="" className="form" onSubmit={handleSubmit(onLoginFormSubmit)}>
        <div className='radio-container'>
          <div className='admin-radio'>
            <p className='radio-lable' >Admin</p>
            <input
              type="radio"
              value="admin"
              {...register("role")}
            />
          </div>
          <div className='staff-radio'>
            <p className='radio-lable' >Staff</p>
            <input
              type="radio"
              value="staff"
              {...register("role")}
            />
          </div>
        </div>
          <input required className="input" type="input" name="email" id="email" placeholder="Username"             {...register("username")} />
          <input required className="input" type="password" id="password" {...register("password")}placeholder="Password" />
          <input className="login-button" type="submit" value="Sign In" />
        </form>
        </div>

      </div>
    </div>
  );
}

export default Login2;
