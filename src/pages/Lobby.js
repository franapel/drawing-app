import { signOut } from "firebase/auth";
import auth from "../firebase/auth"
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const db = getFirestore()

export default function Lobby() {
    const history = useHistory()

    const handleClickLogOut = e => {
        signOut(auth).then(() => {
            console.log("Logged Out !!")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " : " + errorMessage)
        });
    }

    const handleClickJoinRoom = e => {
        const code = document.querySelector("#sala").value
        const getRooms = async () => {
            const q = query(collection(db, "rooms"), where("code", "==", code))
            const querySnapshot = await getDocs(q)
            let exists = false
            querySnapshot.forEach(doc => {
                exists = true
            })

            if (exists) {
                history.push("/lobby/" + code)
            } else {
                const msg = document.querySelector("#sala-msg")
                msg.innerHTML = "Esta sala no existe"
                msg.classList.remove("text-gray-500")
                msg.classList.add("text-red-500")
            }
        }
        getRooms()
    }

    const handleFocusCode = () => {
        const msg = document.querySelector("#sala-msg")
        msg.innerHTML = "Ingresa un código de sala"
        msg.classList.add("text-gray-500")
        msg.classList.remove("text-red-500")
    }
    return (
        <div>
            <button className="absolute top-2 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClickLogOut}>
                Log Out
            </button>
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="w-full max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sala">
                                    Sala
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="sala" type="text" placeholder="código" onFocus={handleFocusCode} />
                            </div>
                            <p className="ml-2 text-xs text-gray-500" id="sala-msg">Ingresa un código de sala</p>
                            <div className="mt-7 flex items-center justify-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClickJoinRoom}>
                                    Unirse
                                </button>
                            </div>
                        </form>
                        <p className="text-center text-gray-500 text-xs">
                            &copy;2020 Pelu Corp. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}