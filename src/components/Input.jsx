import PropTypes from "prop-types";

const Input = ({
  label,
  type,
  name,
  autocomplete,
  required,
  className,
  onChange,
  value,
}) => {
  return (
    <label className={className || "flex flex-col gap-1"}>
      {label}
      <input
        type={type}
        name={name}
        onChange={(e) => onChange(e)}
        value={value || ""}
        autoComplete={autocomplete || ""}
        required={!!required}
        className="border border-gray-300 dark:bg-gray-50 rounded-md p-2 disabled:cursor-not-allowed"
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  autocomplete: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
export default Input;
