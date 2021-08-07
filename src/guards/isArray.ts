import { TypeGuardBaseOptions, TypeValidator } from '../types';
import { createTypeGuard } from '../utils';

/**
 * Checks that input is Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as unknown[]
 * isArray(['xyz']);
 *
 * // true, typed as unknown[]
 * isArray<string>(['xyz']);
 *
 * // true, typed as string[]
 * isArray<string>(['xyz'], { valueGuard: isString });
 *
 * // false
 * isArray<string>(['xyz', 1], { valueGuard: isString });
 *
 * // true, typed as string | number[]
 * isArray<string | number>(['xyz', 1], {
 *     valueGuard: isUnion(isString, isNumber),
 * });
 *
 * // throws type error
 * isArray<string>(['xyz', 1], { valueGuard: isString, throwError: true });
 * ```
 *
 * @typeParam T - Type of array value
 * @param input - Value to be tested
 * @param options - ThrowError, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isArray(
    input: unknown,
    options?: TypeGuardBaseOptions,
): input is unknown[];
export function isArray<T>(
    input: unknown,
    options?: TypeGuardBaseOptions & {
        valueGuard: TypeValidator;
    },
): input is T[];
export function isArray<T>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
    }: TypeGuardBaseOptions & { valueGuard?: TypeValidator } = {},
): input is T[] {
    return createTypeGuard<T[]>(
        (value) =>
            Array.isArray(value) && (!valueGuard || value.every(valueGuard)),
        'array',
    )(input, { throwError });
}
