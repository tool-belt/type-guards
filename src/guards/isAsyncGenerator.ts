import { TypeGuardBaseOptions } from '../types';
import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is AsyncGenerator object
 *
 * @remarks
 * - This guard works only in ES2018 and above
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isGenerator<boolean>(
 *     (async function* () {
 *         yield Promise.resolve(true);
 *     })(),
 * );
 *
 * // false
 * isGenerator(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // throws TypeError
 * isGenerator({}, { throwError: true });
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: TypeGuardBaseOptions = {},
): input is AsyncGenerator<Y, R, N> {
    return createTypeGuard<AsyncGenerator<Y, R, N>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object AsyncGenerator]',
        'async-generator',
    )(input, { throwError });
}
