import { SeshatToJavascript } from './lib/seshatToJavascript.js';
import { makeSeshatEnvironment } from './lib/seshatStandardLibrary.js';

document.addEventListener('DOMContentLoaded', function() {
  var seshatEnvironment = makeSeshatEnvironment({
    systemPrint: (...args) => {
      document.getElementById('output').innerHTML += args.join(' ') + '\n';
    },
    systemAssert: console.assert,
  });

  function runSeshat() {
    document.getElementById('output').innerHTML = '';
    const seshatCode = document.getElementById('seshat').value;
    let javascriptCode = SeshatToJavascript.transpile(seshatCode);
    javascriptCode = (
      'var temp;'
      + javascriptCode
    );
    (new Function('seshatEnvironment', javascriptCode))(seshatEnvironment);
  }

  document.getElementById('runSeshat').addEventListener('click', runSeshat);
});
