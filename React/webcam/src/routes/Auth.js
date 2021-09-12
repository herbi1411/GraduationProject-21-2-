import React, {useState} from "react"
import authService, { firebaseInstance } from "fbase";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {GoogleLoginButton, GithubLoginButton} from "react-social-login-buttons";
  
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "magenta"
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const Auth  = ()=>{
    const classes = useStyles();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("");

    const onChange = (event) =>{
        const name = event.target.name;
        if(name === "email"){
            setEmail(event.target.value);
        }else if(name === "password"){
            setPassword(event.target.value);
        }
    }
    const onSubmit = async (event) =>{
        event.preventDefault(); 
        try{
            if(newAccount){
                await authService.createUserWithEmailAndPassword(email,password);
            }else{
                await authService.signInWithEmailAndPassword(email,password);
            } 
        }
        catch(error){
           setError(error.message);
        }
    }
    // const onSocialClick = async(event) =>{
    //     console.log(event);
    //     const {target : {name}} = event;
    //     let provider;
    //     if(name === 'github'){
    //         provider = new firebaseInstance.auth.GithubAuthProvider();
    //     }else if(name === 'google'){
    //         provider = new firebaseInstance.auth.GoogleAuthProvider();
    //     }
    //     await authService.signInWithPopup(provider).then((result)=>{},(error)=>console.log(error));
    // }
    const onGoogleClick = async()=>{
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(provider).then((result)=>{},(error)=>console.log(error));
    }
    const onGitHubClick = async()=>{
        const provider = new firebaseInstance.auth.GithubAuthProvider();
        await authService.signInWithPopup(provider).then((result)=>{},(error)=>console.log(error));
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    // return <div>
    //     <form onSubmit = {onSubmit}>
    //         {/* <input type="email" name = "email" placeholder="이메일을 입력하세요" required value = {email} onChange={onChange} /> */}
    //         <Input type="email" name="email" placeholder ="이메일을 입력하세요" required value = {email} onchange ={onchange}/>
    //         <input type="password" name="password" placeholder="비밀번호를 입력하세요" required value = {password} onChange={onChange}/>
    //         <input type="submit" value={newAccount ? "Sign Up" : "Log In" }/>
    //     </form>
    //     <span onClick = {toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
    //     <div>
    //         {error}
    //         <button name="google" onClick = {onSocialClick}>Continue with Google</button>
    //         <button name="github" onClick = {onSocialClick}>Continue with GitHub </button>
    //     </div>
    // </div>

    return(
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {newAccount ? "Log In" : "Sign up"}
          </Typography>
          <form className={classes.form} noValidate onSubmit = {onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onSubmit = {onSubmit}
            >
              {newAccount ? "Log In" : "Sign up"}
            </Button>
            {error}
            <Grid 
            container 
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
                <Grid item xs>
                    <GoogleLoginButton size="40px" onClick={onGoogleClick}/>
                </Grid>
                <Grid item xs>
                    <GithubLoginButton size="40px" onClick={onGitHubClick   }/>
                </Grid>
              <Grid item >
                <Button 
                    style = {{textTransform : "none", justifyContent : "flex-end"}}
                    onClick={toggleAccount}
                    size="small"
                    align = "right"
                >
                {newAccount ? "Don't have an account? Sign Up" : "Already have an account? Log in"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>

    )
}
export default Auth;