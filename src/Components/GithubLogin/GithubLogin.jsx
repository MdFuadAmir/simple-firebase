import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import auth from "../../Firebase/firebase.init";

const GithubLogin = () => {
    const [user,setUser] = useState(null);
    const githubProvider = new GithubAuthProvider();
    const handleGithubLogin = () =>{
        signInWithPopup(auth,githubProvider)
        .then((result) =>{
            const githubLoggedin = result.user;
            setUser(githubLoggedin)
            console.log(githubLoggedin);

        })
        .catch((error) =>{
            console.error(error);
        })
    }
    const handleGithubSignOut = () =>{
        signOut(auth)
        .then((result) =>{
            setUser(null);
            alert(result,"Github SignOut successfully");
        })
        .catch((error)=>{
            console.error(error);
        })

    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div>
            { user &&
                <div className="border-2 rounded-md p-4 mb-6 space-y-3">
                <h1>Name: {user?.displayName}</h1>
                <h1>Email:{user?.email}</h1>
                </div>
            }

            </div>
            {
                user ? <button onClick={handleGithubSignOut} className="btn">Github Sign Out</button> : <button onClick={handleGithubLogin} className="btn">Github Login</button>
            }
            
        </div>
    );
};

export default GithubLogin;