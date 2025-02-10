import { InputFieldType } from "@/types/input.type";
import React from "react";

const InputField: React.FC<InputFieldType> = (props) => {
  const { type, name, defaultValue, handleChange, placeholder } = props;

  return (
    <>
      <input
        name={name}
        value={defaultValue}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
        className="input input-bordered input-accent w-full sm:w-1/2"
      />
    </>
  );
};

export default InputField;
