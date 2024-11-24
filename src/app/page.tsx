"use client";
import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+=-{}[]|:;<>,.?/~`";

    for (let i = 0; i < length; i++) {
      const char = str[Math.floor(Math.random() * str.length)];
      pass += char;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyClipboard = useCallback(() => {
    try {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-screen min-h-screen bg-gray-800 p-4">
      <h1 className="text-white text-2xl md:text-4xl text-center">
        𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫 🔑
      </h1>
      <div className="w-full max-w-lg bg-gray-700 rounded-lg shadow-lg">
        <div className="p-4 w-full flex flex-col sm:flex-row items-center gap-2">
          <input
            className="w-[80%] flex-grow rounded-lg py-3 px-4 text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="password"
            readOnly
            value={password}
            ref={passRef}
          />
          <button
            onClick={copyClipboard}
            className={`rounded-lg py-3 px-5 text-white transition-all ${
              copied
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="w-full px-4 py-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              className="w-full sm:w-[150px] h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              type="range"
              min="6"
              max="100"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-white text-sm font-medium">
              Length: {length}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                className="w-6 h-6 accent-blue-600 cursor-pointer"
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label className="text-white text-sm font-medium">
                Include Numbers
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                className="w-6 h-6 accent-blue-600 cursor-pointer"
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="text-white text-sm font-medium">
                Include Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
