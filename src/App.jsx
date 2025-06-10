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
    <div className="rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4 selection:bg-pink-500 selection:text-white">
      <div className="relative overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 max-w-md w-full text-white">

        <span className="absolute -top-[150%] -left-[150%] w-[300%] h-[300%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-glass z-0 rotate-[45deg] pointer-events-none" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 drop-shadow relative z-10">
          🔐 Password Generator
        </h1>
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <input
            type="text"
            value="GeneratedPassword123!"
            readOnly
            className="flex-1 h-12 rounded-lg bg-black/70 px-3 text-white placeholder-gray-400 focus:outline-none shadow-inner selection:bg-pink-500 selection:text-white"
          />
          <button
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-semibold transition shadow"
          >
            Copy
          </button>
        </div>

        {/* Range Slider */}
        <div className="mb-6 relative z-10">
          <label htmlFor="length" className="block mb-2 text-sm font-medium">
            Length: <span className="font-bold text-white">8</span>
          </label>
          <input
            id="length"
            type="range"
            min={4}
            max={100}
            className="w-full accent-pink-500"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 relative z-10">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-pink-500 focus:ring-pink-400" />
            <span>Characters</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-pink-500 focus:ring-pink-400" />
            <span>Numbers</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-pink-500 focus:ring-pink-400" />
            <span>Special Characters</span>
          </label>
        </div>

      </div>
    </div>
  )


}

export default App
