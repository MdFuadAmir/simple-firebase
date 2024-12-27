import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import auth from "../../Firebase/firebase.init";

 
const Login = () => {
    const [loginerror, setLoginError] = useState('');    
    const [loginSuccess, setLoginSuccess] = useState('');    
    const [showPassword,setShowPassword] = useState(false);
    const emailRef = useRef(null);

    const handleSubmit = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);
        // reset error
        setLoginError(" ");
        setLoginSuccess(" ")

        if(password.length < 6){
            setLoginError('password should be 6 charecter or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setLoginError("Your passwordshould have at last one upper case charecter")
            return;
        }
        // creat user
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            if(result.user.emailVerified){
                setLoginSuccess("usr logged in successfully ")
            }
            else{
                alert("please verify  your email")
            }
        })
        .catch((error)=>{
            const errorMessage = error.message; 
            setLoginError(errorMessage);
            console.log(errorMessage);
        })
    }
    const handleForgotPassword = e =>{
        const email = emailRef.current.value;
        if(!email){
            alert("please enter your email");
            console.log("please enter your email");
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log("please Write a valid email");
            return;
        }
        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("please chack your mail")
        }
        )
        .catch (error =>{
            console.error(error);
        })

    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="border-2 rounded-md p-4 w-1/2 flex flex-col gap-4">
        <input ref={emailRef} type="email" name="email" placeholder="Email" required className="border-2 px-4 py-2 rounded-md"/>
        <div className="relative">
        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required className="border-2 px-4 py-2 rounded-md w-full"/>
        <span className="absolute top-4 right-2 cursor-pointer" onClick={ () => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}</span>
        </div>
        <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
        <input type="submit" value="Log in" className="btn"/>
            {
                loginerror  && <p className="text-red-600">{loginerror}</p>
            }
            {
                loginSuccess && <p className="text-green-600">{loginSuccess}</p>
            }
            <p>New to this website please <Link className="text-blue-600" to="/register">Register!!</Link></p>
        </form>
    </div>
    );
};

export default Login;