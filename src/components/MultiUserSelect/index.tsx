import React from "react";
import Select from "react-select";
import { Control } from "./Control";
import { Menu } from "./Menu";
import { NoOptionsMessage } from "./NoOptionsMessage";
import { Option } from "./Option";
import { Placeholder } from "./Placeholder";
import { ValueContainer } from "./ValueContainer";
import { IndicatorSeparator } from "./IndicatorSeparator";
import { ClearIndicator } from "./ClearIndicator";
import { DropdownIndicator } from "./DropdownIndicator";
import { MultiValue } from "./MultiValue";
import { makeStyles } from "@material-ui/core/styles";
import { Users } from "../../utils/interfaces";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "flex",
    height: "100%",
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
  },
  noOptionsMessage: {
    padding: `10px 20px`,
  },
  singleValue: {
    fontSize: 14,
  },
  paper: {
    left: 0,
    right: 0,
  },
  chip: {
    margin: "5px 3px",
    fontSize: 14,
  },
}));

// The piece that ties all of the previous components together is the components property that's passed to Select.
// This is actually set as a default property in MultiUserSelect, so it can be further overridden.
// The value passed to components is a simple object that maps the component name to its implementation.

interface Props {
  isMulti: boolean;
  value: any;
  onChange: any;
  required: boolean;
  options: Users[];
}

export default function MultiUserSelect(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Select
        isMulti={props.isMulti}
        closeMenuOnSelect={false}
        value={props.value}
        onChange={props.onChange}
        textFieldProps={{
          label: "Invite Users",
          InputLabelProps: { shrink: true },
          required: props.required,
        }}
        placeholder=""
        options={props.options}
        {...{ ...props, classes }}
      />
      {/* react - select does not include form validation. 
      In which case below is an invisible HTML5 input, who's value is 
      linked to react-select and required is set to true */}
      <input
        tabIndex={-1}
        autoComplete="off"
        style={{
          opacity: 0,
          height: 0,
          position: "absolute",
        }}
        value={props.value}
        required={props.required}
      />
    </div>
  );
}

MultiUserSelect.defaultProps = {
  isClearable: true,
  components: {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    MultiValue,
    ValueContainer,
    IndicatorSeparator,
    ClearIndicator,
    DropdownIndicator,
  },
};
