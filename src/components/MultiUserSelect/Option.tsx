import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

// Individual options that are displayed in the MultiUserSelect menu are rendered using the MenuItem component, as follows:
// The selected and style properties alter the way that the item is displayed, based on the isSelected and isFocused properties.
// The children property sets the value of the item.

interface Props {
  selectProps: { classes: { placeholder: string | undefined } };
  innerRef: React.ElementRef<any>;
  innerProps: any;
  isFocused: boolean;
  isSelected: boolean;
  children: React.ReactNode;
}

export const Option = (props: Props) => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{ fontWeight: props.isSelected ? 500 : 400 }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);
