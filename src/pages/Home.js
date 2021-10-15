import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Link to="/signin">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Ingresar
                    </button>
                </Link>
            </div>
        </div>
    )
}