import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

// this component passes the inputred value, a reference to the underlying input element - to the ref props

interface IinputComponent {
  inputRef: React.ElementRef<any>;
}
const inputComponent = ({ inputRef, ...props }: IinputComponent) => (
  <div ref={inputRef} {...props} />
);

interface IControl {
  selectProps: {
    classes: { input: string | undefined };
    textFieldProps: any;
  };
  innerRef: React.ElementRef<any>;
  innerProps: any;
  children: React.ReactNode;
}

// The job of Control is to set up the Select component to use a Material-UI TextField component
export const Control = (props: IControl) => (
  <TextField
    fullWidth={true}
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />
);
