import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";


export default function Login() {

  const [credentials, setcredentials] = React.useState({email:"",password:""})
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/auth/LogIn", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json()
    if(json.success){
      localStorage.setItem('token',json.authToken);
      navigate('/Note')
    }else{
      alert("Invalid Credentials")
    }
  }

  const onChange = (e) => {
    setcredentials({...credentials,[e.target.name] : e.target.value})
  }
  return (
    <React.Fragment>
      <Container fixed sx={{width:"50%"}}>
        <Box sx={{mt:15 ,  border: 1,  borderColor: 'primary.main', p:"5%", borderRadius: 1,boxShadow: "1px 1px 10px lightBlue"}}>
        <Typography variant="h5" gutterBottom sx={{fontWeight: 'light'}}>
        Please Enter Valid Credentials To LogIn
      </Typography>
        <TextField fullWidth label="Email" id="fullWidth" sx={{pb:2}} name='email' value={credentials.email} onChange={onChange} required={true}/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{width:"100%", pb:2}}
          name='password'
          value={credentials.password}
          onChange={onChange}
          required={true}
        />
        <Box>
        <Button variant="outlined" sx={{mr:"2%"}} onClick={handleSubmit} disabled={credentials.password.length < 5}>LogIn</Button>
        <Button variant="outlined"><Link to="/SignUp" style={{color:"#1976d2", textDecoration:"none"}}>Create A New Users</Link></Button>
        </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}