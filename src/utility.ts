import type { PropsWithChildren, ReactNode } from 'react';

// https://digital.interhyp.de/2022/02/17/strict-unions-in-typescript-a-practical-approach/
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends T
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;
// https://digital.interhyp.de/2022/02/17/strict-unions-in-typescript-a-practical-approach/
export type StrictUnion<T> = Prettify<StrictUnionHelper<T, T>>;

/**
 * Resolve mapped types and show the derived keys and their types when hovering in
 * VS Code, instead of just showing the names those mapped types are defined with.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

/**
 * Type has properties of `Base` and can further have either properties of `A`, `B`, both `A` and `B`, but not neither.
 */
export type InclusiveOr<Base, A, B> = StrictUnion<
  (Base & (A | B)) | (Base & A & B)
>;

export interface MandatoryChildrenProp {
  children: Exclude<ReactNode, boolean | null | undefined>;
}

/**
 * Props is `BaseProps` & (`OtherProps`, `{ children:  }`, or both but not neither).
 * Useful when you want your component to require children when `OtherProps` aren't provided and vice versa.
 */
export type InclusiveOrWithChildren<BaseProps, OtherProps> = StrictUnion<
  | (BaseProps & (OtherProps | MandatoryChildrenProp))
  | (BaseProps & OtherProps & PropsWithChildren)
>;

/**
 * Like the `keyof` operator but for values.
 */
export type ValueOf<T> = T[keyof T];

/**
 * Checks if `x` is between `a` and `b`, inclusive.
 */
export function inRange(x: number, a: number, b: number): boolean {
  return Math.min(a, b) <= x && x <= Math.max(a, b);
}
