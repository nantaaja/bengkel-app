import { Link } from "react-router-dom";

export default function ErrorPage({ code, message, image }) {
    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center p-6">
            <div className="bg-gray-700 rounded-2xl w-full max-w-4xl py-16 px-6 text-center shadow-lg">
                {image && (
                    <img
                        src={image}
                        alt="error"
                        className="mx-auto mb-6 w-64"
                    />
                )}
                <h1 className="text-white text-3xl md:text-4xl font-semibold mb-2">
                    Oopss {code} Error
                </h1>
                <p className="text-white/80 mb-6">
                    {message}
                </p>
                <Link
                    to="/"
                    className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                    Kembali ke Dashboard
                </Link>
            </div>
        </div>
    );
}