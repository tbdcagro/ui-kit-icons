export const IconSizeOptions = [
  "is-16",
  "is-20",
  "is-24",
  "is-32",
  "is-40",
  "is-48",
  "is-52",
] as const;

export type IconSize = typeof IconSizeOptions[number];

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  clickable?: boolean;
  size?: IconSize;
}
