import React from "react";
import Proptypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  type,
  label,
  error,
  info,
  value,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.Proptypes = {
  name: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  type: Proptypes.string,
  error: Proptypes.string,
  info: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  disabled: Proptypes.string
};
TextFieldGroup.defaultProps = {
  type: "text"
};
export default TextFieldGroup;
