import { useState } from 'react';
import app from '../../Firebase/firebase.init';
import { getAuth,signInWithPopup,GoogleAuthProvider, signOut } from "firebase/auth";


const Login = () => {
    const [user,setUser] = useState(null)
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignin = () =>{
        signInWithPopup(auth,provider)
        .then(result  =>{
            const logInUser = result.user;
            setUser(logInUser);

        })
        .catch(error =>{
            console.log('error', error.massage);

        })
    }
    const handleGoogleSignOut = () =>{
        signOut(auth)
        .then(result =>{
            setUser(null);
            console.log(result);
        })
        .catch(error =>{
            console.log(error);
        })
    }
    return (
        <div className='flex justify-center flex-col items-center h-screen'>
            {
                user ? <button onClick={handleGoogleSignOut} className='btn'>Google Sign Out</button> :  <button onClick={handleGoogleSignin} className='btn'>Google Sign In</button>
            }
            {
                user && <h1>user: {user?.displayName}</h1>
            }
        </div>
    );
};

export default Login;
