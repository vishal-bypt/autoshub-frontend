import React from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

export const CustomSelect = ({
  onChangeValue,
  onBlurValue,
  className,
  placeholder,
  field = [],
  form,
  options,
  isMulti = false,
}) => {
  const { layoutMode } = useSelector((state) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  const customStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: layoutMode === "dark" ? "#353A38" : "white",
      border: layoutMode === "dark" ? "1px solid #3b403d" : "1px solid #ced4da",
      color: layoutMode === "dark" ? " #FFF" : "#ced4da",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: layoutMode === "dark" ? "#ced4da" : "#3b403d",
    }),
    menu: (provided, state) => ({
      ...provided,
      color: "#3b403d",
    }),
  };

  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );
    if (onChangeValue) {
      /* if(isMulti){
        (option).map((item) => item.value)
      } else {
        (option).value
      } */
      onChangeValue(isMulti ? option.map((item) => item.value) : option.value);
    }
  };

  const handleBlur = (e) => {
    if (onBlurValue) {
      onBlurValue(field.name);
    }
  };

  const getValue = () => {
    if (field.value === undefined) {
      field.value = [];
    }
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      id={field.name}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
