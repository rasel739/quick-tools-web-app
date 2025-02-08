import React from "react";

export type InputFieldType = {
  type: string;
  name: string;
  defaultValue?: string | number;
  label?: string | null;
  placeholder: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
