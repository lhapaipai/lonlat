export type Value = null | string | Option;
export type Option = {
  value: string;
  label: string;
};

type Options = Option[];
