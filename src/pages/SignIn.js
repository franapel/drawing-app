import auth from "../firebase/auth"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useHistory } from "react-router-dom"

export default function SignIn() {

    const history = useHistory()

    const handleClickCreateUser = (e) => {
        e.preventDefault()
        const user = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        }
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                console.log("Creado !!")
                console.log(userCredential.user)
                history.replace("/lobby")
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " : " + errorMessage)
            })
    }

    const handleClickLogIn = (e) => {
        e.preventDefault()
        const user = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        }
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                console.log("Ingresado !!")
                console.log(userCredential.user)
                history.replace("/lobby")
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " : " + errorMessage)
            })
    }

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClickCreateUser}>
                                Sign In
                            </button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClickLogIn}>
                                Log In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2020 Pelu Corp. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
