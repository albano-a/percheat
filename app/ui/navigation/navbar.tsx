"use client";

import { FaHome, FaCode, FaSignInAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <div className="mx-auto bg-zinc-800 p-4 rounded-2xl mt-3 max-w-6xl shadow-lg flex justify-between items-center">
        {/* Logo/Title */}
        <div>
          <h1 className="text-3xl font-black text-white">Percheat</h1>
        </div>
        {/* Navigation Items */}
        <div>
          <ul className="flex space-x-6 items-center">
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
              >
                <FaHome />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="/snippets"
                className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
              >
                <FaCode />
                <span>Snippets</span>
              </a>
            </li>
            <li>
              <button
                className="flex items-center space-x-2 p-3 border rounded-2xl border-blue-950 bg-blue-900 hover:bg-blue-700 text-white transition-colors"
                onClick={() => console.log("Clicked")}
              >
                <FaSignInAlt />
                <span>Login</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
