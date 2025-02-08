import { InputFieldType } from "@/types/input.type";
import React from "react";

const InputField: React.FC<InputFieldType> = (props) => {
  const { type, name, defaultValue, handleChange, placeholder } = props;

  return (
    <div>
      <input
        name={name}
        value={defaultValue}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        className="input input-bordered input-accent w-full max-w-xs "
      />
    </div>
  );
};

export default InputField;
