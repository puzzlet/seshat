import { EgyptianNumber } from './egyptianNumber';

type seshatVariable = EgyptianNumber | string;

export function makeSeshatEnvironment(options: {
  systemPrint: (...args: any) => void,
  systemAssert: (expr: boolean) => void,
}) {
  options = {
    systemPrint: console.log,
    systemAssert: console.assert,
    ...options,
  };
  return {
    EgyptianNumber: EgyptianNumber,
    print: (...args: Array<any>) => {
      const processedArgs = args.map(item => {
        if (item instanceof EgyptianNumber) {
          return item.toHieroglyphs();
        } else {
          return item;
        }
      })
      options.systemPrint(...processedArgs);
    },
    assertEqual: (a: seshatVariable, b: seshatVariable) => {
      if (a instanceof EgyptianNumber) {
        options.systemAssert((b instanceof EgyptianNumber) && a.isEqualTo(b));
        return;
      }
      options.systemAssert(a == b);
    },
  };
}
