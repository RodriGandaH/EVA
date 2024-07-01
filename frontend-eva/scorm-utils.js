

var nFindAPITries = 0;
var API = null;
var maxTries = 500;


function ScanForAPI(win) {
   while ((win.API_1484_11 == null) && (win.parent != null) && (win.parent != win)) {
      nFindAPITries++;
      if (nFindAPITries > maxTries) {
         return null;
      }
      win = win.parent;
   }
   return win.API_1484_11;
}

function GetAPI(win) {
   if ((win.parent != null) && (win.parent != win)) {
      API = ScanForAPI(win.parent);
   }
   if ((API == null) && (win.opener != null)) {
      API = ScanForAPI(win.opener);
   }
}

var SCORM_TRUE = "true";
var SCORM_FALSE = "false";
var SCORM_NO_ERROR = "0";
var terminateCalled = false;
var initialized = false;

export function ScormProcessInitialize() {
   var result;
   GetAPI(window);
   if (API == null) {
      alert("ERROR - Could not establish a connection with the LMS.\n\nYour results may not be recorded.");
      return;
   }
   result = API.Initialize("");
   if (result == SCORM_FALSE) {
      handleError();
      return;
   }
   initialized = true;
}

export function ScormProcessTerminate() {
   var result;
   if (initialized == false || terminateCalled == true) { return; }
   result = API.Terminate("");
   terminateCalled = true;
   if (result == SCORM_FALSE) {
      handleError();
      return;
   }
}

function handleError() {
   var errorNumber = API.GetLastError();
   var errorString = API.GetErrorString(errorNumber);
   var diagnostic = API.GetDiagnostic(errorNumber);
   var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
   alert("Error - Could not communicate with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
}

export function ScormProcessGetValue(element, checkError) {
   if (initialized == false || terminateCalled == true) { return; }
   var result = API.GetValue(element);
   if (checkError && result == "") {
      handleError();
      return "";
   }
   return result;
}

export function ScormProcessSetValue(element, value) {
   if (initialized == false || terminateCalled == true) { return; }
   var result = API.SetValue(element, value);
   if (result == SCORM_FALSE) {
      handleError();
      return;
   }
}

export function ScormProcessCommit() {
   if (initialized == false || terminateCalled == true) { return; }
   var result = API.Commit("");
   if (result == SCORM_FALSE) {
      handleError();
      return;
   }
}
