export const IconSizeOptions = [
  "is-16",
  "is-20",
  "is-24",
  "is-32",
  "is-40",
  "is-48",
  "is-52",
] as const;

export type IconsSize = (typeof IconSizeOptions)[number];
