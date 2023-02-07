
export type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};