import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  className?: string;
  size?: number;
  stroke?: number;
  spin?: boolean;
  onPress?: () => void;
  onHover?: () => void;
}

export const MyIcon = ({ name, className, size = 16, stroke = 1.5, spin, ...rest }: IconProps) => {
  const LucideIcon = icons[name];
  return (
    <LucideIcon size={size} strokeWidth={stroke} className={`${className} ${spin ? "animate-spin" : ""}`} {...rest} />
  );
};
