import { use, useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'flowbite'; 
import CopyButton from './templates/CopyButton';
function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed ] = useState(true)
  const [Password, setPassword] = useState("")
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false)
  const reference = useRef(null)
  

  const passwordGen = useCallback(() => {
    const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const Numbers = "0123456789"
    const specialChars = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}"
    let Characters = ""
    if(specialCharAllowed)
      Characters += specialChars
    if(numbersAllowed)
      Characters += Numbers
    if(Characters.length == 0 || characterAllowed)
      Characters += Letters
    
    let password = ""
    for(let i = 1; i <= length; i++ ) {
      let ind = Math.floor(Math.random() * Characters.length)
      password += Characters.charAt(ind)
    }
    setPassword(password)
  }, [setPassword, numbersAllowed, characterAllowed, specialCharAllowed, length]);

  useEffect(() => {
    passwordGen()
  }, [length, characterAllowed, numbersAllowed, specialCharAllowed]);


  const CopyText = useCallback(()=> {
    reference.current?.select()
    window.navigator.clipboard.writeText(Password)
  }, [Password])

    return (
    <>
      <div className="rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4 selection:bg-pink-500">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 max-w-md w-full text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 drop-shadow">
            🔐 Password Generator
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <input
              type="text"
              value={Password}
              ref={reference}
              readOnly
              className="flex-1 h-12 rounded-lg bg-black/70 px-3 text-white placeholder-gray-400 focus:outline-none shadow-inner"
            />
            <CopyButton textToCopy={Password} Reference = {reference}  />
          </div>

          <div className="mb-6">
            <label htmlFor="length" className="block text-sm font-semibold mb-2">
              Length: <span className="font-bold">{length}</span>
            </label>
            <input
              type="range"
              name="length"
              id="length"
              min={4}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="charactersAllowed"
                checked={characterAllowed || !(numbersAllowed || specialCharAllowed)}
                onChange={(e) => setCharacterAllowed(e.target.checked)}
                className="w-4 h-4 text-pink-500 bg-gray-900 border-gray-300 rounded focus:ring-pink-500"
              />
              <label
                htmlFor="charactersAllowed"
                className="ml-2 text-sm font-medium"
              >
                Characters
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="NumbersAllowed"
                checked={numbersAllowed}
                onChange={(e) => setNumbersAllowed(e.target.checked)}
                className="w-4 h-4 text-blue-500 bg-gray-900 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="NumbersAllowed"
                className="ml-2 text-sm font-medium"
              >
                Numbers
              </label>
            </div>

            <div className="flex items-center sm:col-span-2">
              <input
                type="checkbox"
                id="SpecialCharactersAllowed"
                checked={specialCharAllowed}
                onChange={(e) => setSpecialCharAllowed(e.target.checked)}
                className="w-4 h-4 text-purple-500 bg-gray-900 border-gray-300 rounded focus:ring-purple-500"
              />
              <label
                htmlFor="SpecialCharactersAllowed"
                className="ml-2 text-sm font-medium"
              >
                Special Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default App
