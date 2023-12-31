import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TokenContext from '../../components/store/token-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
   const emailInputRef = useRef();
   const passwordInputRef = useRef();
   const tokenCtx = useContext(TokenContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading]= useState(false);
  const  history= useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const resetForm = ()=>{
    emailInputRef.current.value="";
    passwordInputRef.current.value="";
  }

  const submitHandler = async (event)=>{
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
   setIsLoading(true);
     let url;
  
    if(isLogin){
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU637CAoXCNVgGTkMbZqCTgl0cqkbWFB4";
       }else{
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU637CAoXCNVgGTkMbZqCTgl0cqkbWFB4"
       }try{
     const res = await fetch(url, {
        method: 'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      );
      setIsLoading(false);
if(res.ok){
          const data = await res.json();
          tokenCtx.login(data.idToken);
          history.replace('/');
          resetForm();
          console.log(data);
          return data;
        }else{
  
         const data = await  res.json();
          // show an error modal
            console.log(data);
            //let errorMessage = "Authentication Failed!";
            if (data && data.error && data.error.message){
             throw new Error("Authentication Failed!");
            }
        }
      } catch(error) {
        alert(error.message);
      }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required 
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (<button>{isLogin ? "Login" : "create an account"}</button>)}
          {isLoading && <p style={{color: "white"}}>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
