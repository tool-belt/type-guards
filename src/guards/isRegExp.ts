import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is RegExp object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isRegExp(new RegExp('somePattern'));
 *
 * // true
 * isRegExp(/somePattern/);
 *
 * // false
 * isRegExp('xyz');
 *
 * // false
 * isRegExp(1);
 *
 * // throws TypeError
 * isRegExp([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isRegExp = createTypeGuard<RegExp>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object RegExp]' ||
            value instanceof RegExp),
    'RegExp',
);
