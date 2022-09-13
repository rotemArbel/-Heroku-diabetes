import React from "react";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {auth} from '../../Services/firebaseDB';
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import googleLogo from '../../assets/g-logo.svg';
import '../Forms/forms.scss';
import { signInWithPhoneNumber,  RecaptchaVerifier  } from "firebase/auth";

const Login = (props) => {
    




    const [codeSent, setCodeSent] = useState(false); 
    const {reset, register, handleSubmit, watch, formState: {
            errors
        }} = useForm();
    const onSubmit = (data) => {
        console.log(data.user)
        if (codeSent) {
            verify(window.confirmationResult, data.code);
        } else {
            const phoneNumber = data.user;
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                
                }
              }, auth);
          
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult)
          window.confirmationResult = confirmationResult;
          setCodeSent(true)

         

          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
        });
            
    
        }
       
        // reset();
    };

    const google = ()=> {
        const provider = new GoogleAuthProvider();


        signInWithPopup(auth, provider).then(function(result) {
              var token = result.credential.accessToken;
              var user = result.user;
                
              console.log(token)
              console.log(user)
           }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
                
              console.log(error.code)
              console.log(error.message)
           });
    }
    const verify = (confirmationResult, code) => {
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            user.name = "rotemm"
            console.log(user)
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
    }
    return (
        <div className="container">
            <h1>Login</h1>
            <div className="form-container login">
                <h3>Enter phone number</h3>
                <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("user", {required: true})}/>
                    <input type="submit" value="Send code"/>
                </form>
                {codeSent && <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("code", {required: true})} placeholder="Enter code"/>
                    <input type="submit" value="Login"/>
                </form> } 
                <h3>Or</h3>
                <button className="google" onClick={google}><img src={googleLogo} />Continue with google</button>
            </div>
            <div id="recaptcha-container"></div>
        </div>

    )
}

export default Login;