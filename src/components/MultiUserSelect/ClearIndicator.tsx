import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Cancel from "@material-ui/icons/Cancel";

// This button is used to clear any selection made previously by the user, as follows:
// The purpose of this component is to use the Material-UI IconButton component and to render a Material-UI icon.
// The click handler is passed in through innerProps.

interface Props {
  innerProps: any;
}

export const ClearIndicator = (props: Props) => (
  <IconButton {...props.innerProps}>
    <Cancel />
  </IconButton>
);
