import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link,useNavigate  } from "react-router-dom";
import { useState} from "react";

export default function SignUp() {

  const [credentials, setcredentials] = useState({userName:"",email:"",password:"",cpassword:""})
  let navigate = useNavigate()

  const onChange = (e) => {
    setcredentials({...credentials,[e.target.name] : e.target.value})
  }

  const handleSignup = async (e) =>{
    e.preventDefault();
    const {userName,email,password,cpassword} = credentials;
    if (password !== cpassword) {
      alert("Passwords not matched")
    } else {
      const response = await fetch("http://localhost:8000/auth/SignUp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName,email,password})
    });
    const json = await response.json()
    if(json.success){
      localStorage.setItem('token',json.authToken);
      navigate('/Note')
    }else{
      alert("Invalid Credentials")
    }
    }
  }

  return (

    <React.Fragment>

      <Container fixed sx={{width:"50%"}}>
        
        <Box sx={{mt:15 ,  border: 1,  borderColor: 'primary.main', p:"5%", borderRadius: 1}}>

        <Typography variant="h5" gutterBottom sx={{fontWeight: 'light'}}>
        Create A New User
      </Typography>

        <TextField fullWidth label="userName" id="fullWidth" sx={{pb:2}} onChange={onChange} name='userName' value={credentials.userName} required={true}/>
        <TextField fullWidth label="Email" sx={{pb:2}} onChange={onChange} name='email' value={credentials.email} required={true}/>

        <TextField
          // id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{width:"100%", pb:2}}
          onChange={onChange}
          name='password'
          value={credentials.password}
          required={true}
        />

        <TextField
          // id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          sx={{width:"100%", pb:2}}
          onChange={onChange}
          name='cpassword'
          value={credentials.cpassword}
          required={true}
        />

        <Box>
        <Button variant="outlined" sx={{mr:"2%"}} onClick={handleSignup} disabled={credentials.userName.length < 2 || credentials.password.length < 5}>SignUp</Button>
        <Button variant="outlined"><Link to="/LogIn" style={{color:"#1976d2", textDecoration:"none"}}>Already Have An Account</Link></Button>
        </Box>

        </Box>
      </Container>

    </React.Fragment>
  );
}

