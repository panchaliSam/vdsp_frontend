import React from "react";
import Logo from "../assets/icon.png"

const LoadingScreen : React.FC = () => {
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center">
                <img
                    src ={Logo}
                    alt="L O A D I N G....."
                    className="w-64 h-64 animate-spin-slow"
                />
                <p className="mt-4 text-lg text-gray-500">L O A D I N G.....</p>
            </div>
        </div>
    );
};

export default LoadingScreen;