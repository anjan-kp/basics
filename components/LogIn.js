import { Button, FormControl, Grid, Input,InputLabel, Paper, TextField} from '@mui/material';
import {useRef, useState} from "react";


const LogIn = ({setValue}) =>{
const [userName, setUserName] = useState("")
const [password, setPassword] = useState("")
const [unameErr, setUnameErr] = useState(false);
const [pwdErr, setPwdErr] = useState(false);



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
  const handleSubmit = (e) =>{
    e.preventDefault();
    if( userName.length <=4){
      setUnameErr(true)
    }
    if( password.length <=5){
      setPwdErr(true)
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

    fetch("http://localhost:3030/api/login", requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        setValue("1");
      })
      .catch((error) => {
        console.log('error', error)
        setValue("3");
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
          <Button fullWidth variant="contained" type="submit"> Login </Button>
        </Grid>
      </Grid>
    </Paper>
    </form>
</>  
}

export default LogIn;