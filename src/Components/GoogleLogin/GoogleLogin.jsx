import { signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import { useState } from "react";


const GoogleLogin = () => {
    const [user,setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () =>{
        signInWithPopup(auth,googleProvider)
        .then((result) =>{
            const loggedinUser = result.user;
            setUser(loggedinUser);
            console.log(loggedinUser);
        })
        .catch((error) =>{
            console.error(error);
        })
    }
    
    const handleGoogleSignOut = () =>{
        signOut(auth)
        .then((result) =>{
            setUser(null);
             alert(result,"Sign Out Successfully")
        })
        .catch((error) =>{
            console.error(error);
        })
    }


    return (
        <div className="h-screen flex flex-col justify-center items-center">
            { user &&
                <div className="border-2 rounded-md p-4 mb-6 space-y-3">
                <h1>Name: {user?.displayName}</h1>
                <h1>Email:</h1>
                <img src={user?.photoURL} alt="" className="h-24 w-24"/>
                </div>
            }
            {
                user ? <button onClick={handleGoogleSignOut} className="btn">Google Sign Out</button> :
            <button onClick={handleGoogleSignIn} className="btn">Google Login</button>
            }
        </div>
    );
};

export default GoogleLogin;