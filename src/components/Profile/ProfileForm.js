import classes from './ProfileForm.module.css';
import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TokenContext from '../store/token-context';
const ProfileForm = () => {
  const newPassInputRef= useRef();
  const tokenCtx = useContext(TokenContext);
  const history = useHistory();

  const submitHandler = async (event)=>{
    event.preventDefault();
    const newEnteredPassword = newPassInputRef.current.value;
    try{
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBU637CAoXCNVgGTkMbZqCTgl0cqkbWFB4',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: tokenCtx.token,
          password:newEnteredPassword,
          returnSecureToken: true
        }),
        headers: {
          "content-type" : "application/json",
        }
      })
      history.replace('/');
    }catch(error){

    }
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
