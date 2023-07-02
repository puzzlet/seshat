import assert from "node:assert";
import { EgyptianNumber } from "../../build/lib/egyptianNumber.js";


let x;

x = new EgyptianNumber(-1, 2);
assert.equal(x.nominator, -1);
assert.equal(x.denominator, 2);
assert.deepEqual(x.normalized, [[0, -1], [1, -2]]);

x = new EgyptianNumber(-2, 6);
assert.equal(x.nominator, -1);
assert.equal(x.denominator, 3);
assert.deepEqual(x.normalized, [[0, -1], [1, -3]]);

x = new EgyptianNumber(12, -20);
assert.equal(x.nominator, -3);
assert.equal(x.denominator, 5);
assert.deepEqual(x.normalized, [[0, -1], [1, -2], [1, -10]]);
