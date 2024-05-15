import { loadPyodide } from "pyodide";

export var Pyodide = (function () {
   var instance;
   function createInstance() {
      var object = new PythonRunner();
      return object;
   }
   return {
      getInstance: function () {
         if (!instance) {
            instance = createInstance();
         }
         return instance;
      },
   };
})();

class PythonRunner {
   constructor() {
      this._output = console.log;
      this._pyodide = null;
      this._errorOutput = console.log; // Agregar salida para errores
      loadPyodide({
         indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full",

         stdout: (text) => {
            console.log("todo bien");
            console.log(text);
            this._output(text);

         },
         stderr: (text) => {
            console.log("ha ocurrido un error", text);
            // this._output('capturado un stderr',text);
            this._output(text); // Mostrar el error capturado
         },
      }).then((result) => {
         this._pyodide = result;

         console.log(
            this._pyodide.runPython(`
            import sys
            sys.version
        `)
         );

         this._pyodide.runPython('print("Hello from Python!")');
      }).catch((error => console.log('un error', error)));
   }
   setOutput(output) {
      this._output = output;
   }
   setErrorOutput(output) {
      this._errorOutput = output;
   }
   run(code) {
      try {
         this._pyodide.runPython(code);
      } catch (e) {
         const arr = e.message.split(",")
         console.log(arr[arr.length - 1]);
         this._output(arr[arr.length - 1])
         arr[arr.leght - 1];
      }
      // }

   }
}