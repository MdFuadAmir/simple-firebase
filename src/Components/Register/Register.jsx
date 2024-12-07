import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
    const [ragisterError, setRegisterError] = useState('');    
    const [ragisterSuccess, setRegisterSuccess] = useState('');    
    const [showPassword,setShowPassword] = useState(false);

    const handleSubmit = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);
        // reset error
        setRegisterError(" ");
        setRegisterSuccess(" ")

        if(password.length < 6){
            setRegisterError('password should be 6 charecter or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError("Your passwordshould have at last one upper case charecter")
            return;
        }
        // creat user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user);
            setRegisterSuccess('user created successfully.')
        })
        .catch((error)=>{
            const errorMessage = error.message;
            setRegisterError(errorMessage);
            console.log(errorMessage);
        })
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="border-2 rounded-md p-4 w-1/2 flex flex-col gap-4">
            <input type="email" name="email" placeholder="Email" required className="border-2 px-4 py-2 rounded-md"/>
            <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required className="border-2 px-4 py-2 rounded-md w-full"/>
            <span className="absolute top-4 right-2 cursor-pointer" onClick={ () => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}</span>
            </div>
            <input type="submit" value="Register" className="btn"/>
                {
                    ragisterError  && <p className="text-red-600">{ragisterError}</p>
                }
                {
                    ragisterSuccess && <p className="text-green-600">{ragisterSuccess}</p>
                }
                <p>Already have an account please <Link className="text-green-600" to="/login">Login!!</Link></p>
            </form>
        </div>
    );
};

export default Register;