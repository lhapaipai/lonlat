import { ThemeColor } from "../types.d";

type Variant = {
  border: string;
  text: string;
};

export const colorVariants: {
  [key in ThemeColor]: Variant;
} = {
  yellow: {
    border: "border-yellow-3",
    text: "text-yellow-4",
  },
  gray: {
    border: "border-gray-3",
    text: "text-gray-4",
  },
  red: {
    border: "border-red-3",
    text: "text-red-4",
  },
  orange: {
    border: "border-orange-3",
    text: "text-orange-4",
  },
  green: {
    border: "border-green-3",
    text: "text-green-4",
  },
  blue: {
    border: "border-blue-3",
    text: "text-blue-4",
  },
};
