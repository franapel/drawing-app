import initFirebase from "./initFirebase"
import { getAuth } from "firebase/auth"

initFirebase()

const auth = getAuth()

export default auth