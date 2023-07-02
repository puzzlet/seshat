import { readFileSync } from 'fs';
import { argv } from 'process';

import { makeSeshatEnvironment } from './seshatStandardLibrary';
import { SeshatToJavascript } from './seshatToJavascript';

main();

function main() {
  const args = argv.slice(2);

  if (args.length == 0) {
    return;
  }

  const seshatEnvironment = makeSeshatEnvironment({
    systemPrint: console.log,
    systemAssert: console.assert,
  });
  const script = readFileSync(args[0], 'utf-8');
  let javascriptCode = SeshatToJavascript.transpile(script);
  javascriptCode = (
    'var temp;' +
    javascriptCode
  );
  (new Function('seshatEnvironment', javascriptCode))(seshatEnvironment);
}
