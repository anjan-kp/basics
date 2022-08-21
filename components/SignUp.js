import { Button, Paper, Grid, TextField, FormControl } from '@mui/material';
import {useRef, useState} from "react";


const SignUp = ({ setValue}) =>{
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [unameErr, setUnameErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [confirmPwdErr, setConfirmPwdErr] = useState(false)
  
  
   
    const handleUserName = (e) => {
      const val = e.target.value;
      setUserName(val);
      setUnameErr(false)
    }
  
    const handlePassword = (e) =>{
      const pwd = e.target.value;
       setPassword(pwd)
       setPwdErr(false)
    }

    const handleConfirmPassword = (e) =>{
      const confirmPwd = e.target.value;
      setConfirmPwd(confirmPwd)
      setConfirmPwdErr(false)
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      if( userName.length <=4){
        setUnameErr(true);
        return;
      }
      if( password.length <=5){
        setPwdErr(true);
        return;
      }

      if(password !== confirmPwd){
        setConfirmPwdErr(true)
        return;
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "username": userName,
        password
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      fetch("http://localhost:3030/api/signup", requestOptions)
        .then(response => response.json())
        .then((result) => {
           console.log(result)
           setValue("2");
        })
        .catch((error)=>{
          console.log(error)
        });
           
    }

  
  
      return  <>
  <form onSubmit={handleSubmit}>
  <Paper style={{ padding: 30 }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item>
            <TextField  required error={unameErr}
           helperText={unameErr ? "Please enter atleast 5 characters" : ""} onChange={handleUserName} label="Username"></TextField>
          </Grid>
          <Grid item>
            <TextField required error={pwdErr} helperText={pwdErr ? "Please enter atleast 6 characters" : ""} onChange={handlePassword} label="Password" type={'password'}></TextField>
          </Grid>
          <Grid item>
            <TextField required error={confirmPwdErr} helperText={confirmPwdErr ? "Please enter same password" : ""} onChange={handleConfirmPassword} label="Confirm Password" type={'password'}></TextField>
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" type="submit"> Signup </Button>
          </Grid>
        </Grid>
      </Paper>
      </form>
  </>  
   
    
}

export default SignUp;