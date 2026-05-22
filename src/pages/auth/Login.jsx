import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    })

    /* handle input */
    const handleChange = (evt) => {

        const { name, value } = evt.target

        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    /* process login */
    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)
        setError("")

        axios.post("https://dummyjson.com/user/login", {
            username: dataForm.username,
            password: dataForm.password,
            expiresInMins: 30,
        })

            .then((response) => {

                // cek status login
                if (response.status !== 200) {
                    setError(response.data.message)
                    return
                }

                // redirect jika berhasil login
                navigate("/")
            })

            .catch((err) => {

                if (err.response) {
                    setError(err.response.data.message || "An error occurred")
                } else {
                    setError(err.message || "Network Error")
                }

            })

            .finally(() => {
                setLoading(false)
            })
    }

    /* error info */
    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null

    /* loading info */
    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <ImSpinner2 className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null

    return (
        <div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Welcome Back 👋
            </h2>

            {errorInfo}

            {loadingInfo}

            <form onSubmit={handleSubmit}>

                <div className="mb-5">

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>

                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Enter your username"
                        onChange={handleChange}
                    />

                </div>

                <div className="mb-6">

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Login
                </button>

            </form>

        </div>
    )
}