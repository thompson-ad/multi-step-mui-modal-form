import React from "react";
import Chip from "@material-ui/core/Chip";
import Cancel from "@material-ui/icons/Cancel";
import Avatar from "@material-ui/core/Avatar";

// The MultiValue component uses the Material-UI Chip component to render a selected value.
// In order to pass MultiValue to Select, add it to the components object that's passed to Select:

// Now you can use your MultiUserSelect component for single value selection, or for multi-value selection.
// You can add the isMulti property with a default value of true to defaultProps

// Nothing looks different about the MultiUserSelect when it's first rendered, or when you show the menu. When you make a selection, the Chip component is used to display the value. Chips are ideal for displaying small pieces of information like this. Furthermore, the close button integrates nicely with it, making it easy for the user to remove individual selections after they've been made.

interface Props {
  selectProps: { classes: { chip: string | undefined } };
  removeProps: { onClick: any };
  innerProps: any;
  children: string;
}

export const MultiValue = (props: Props) => (
  <Chip
    avatar={<Avatar alt={props.children} src={props.children} />}
    tabIndex={-1}
    label={props.children}
    className={props.selectProps.classes.chip}
    onDelete={props.removeProps.onClick}
    deleteIcon={<Cancel {...props.removeProps} />}
  />
);
