import { useEffect, useState } from 'react'
import { usePythonConsole } from 'react-py'
import { ConsoleState } from 'react-py/dist/types/Console'
function Terminal() {
   const [input, setInput] = useState(``)
   const [output, setOutput] = useState(``)

   const {
      runPython,
      stdout,
      stderr,
      isLoading,
      isRunning,
      banner,
      consoleState
   } = usePythonConsole()

   useEffect(() => {
      setOutput((prev) => [...prev, stdout])
   }, [stdout])

   useEffect(() => {
      setOutput((prev) => [...prev, stderr])
   }, [stderr])

   function getPrompt() {
      return consoleState === ConsoleState.incomplete ? '... ' : '>>> '
   }

   function run() {
      setOutput((prev) => [...prev, getPrompt() + input + '\n'])
      runPython(input)
   }
   
  return (
     <>
        {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
        <p>
           <b>Output</b>
        </p>
        <pre>
           {banner}
           <br />
           {output}
           {stdout}
        </pre>
        <pre>
           {getPrompt()}
           <form>
              <textarea
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Enter your code here"
              />
              <input
                 type="submit"
                 value={!isRunning ? 'Run' : 'Running...'}
               //   disabled={ isRunning}
                 onClick={(e) => {
                    e.preventDefault()
                    run()
                 }}
              />
           </form>
        </pre>
     </>
  )
}

export default Terminal