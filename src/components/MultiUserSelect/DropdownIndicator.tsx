import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

interface Props {
  innerProps: any;
}

export const DropdownIndicator = (props: Props) => (
  <IconButton {...props.innerProps}>
    <ArrowDropDown />
  </IconButton>
);
