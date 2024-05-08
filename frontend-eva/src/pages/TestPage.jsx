import {jsPython} from "jspython-interpreter" 
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
function TestPage() {
   const [text, setText] = useState('');
   jsPython()
      .evaluate('print("Hello World!")')
      .then(
         r => console.log("Result => ", r),
         e => console.log("Error => ", e)
      )

   const script = `
   nota = 70
   if nota >= 90:
      print("Tienes una A")
   else:
      print("Tienes una B")
   x = [1, 2, 3]
   x.map(r => add(r, y)).join(",")
  `;
   const context = { y: 10 }

   const result =  async()=>{
    return   await jsPython()
      .addFunction("add", (a, b) => a + b)
      .evaluate(script, context)
      // result will be a string "11,12,13"
   }  
   // const getCadena = async ()=>{
   //    return  await result();
   // }
   useEffect(() => {
      console.log("Promise",result())
     result().then(r => {setText(r)});
   }, [])
   
   
  return (
    <div>TestPage
      <Button variant="contained">
         Ejecutar Funcion
      </Button>
      <div>
         {text}
      </div>
    </div>
  )
}

export default TestPage