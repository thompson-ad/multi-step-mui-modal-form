import React from "react";
import Typography from "@material-ui/core/Typography";

// The Placeholder text of the MultiUserSelect component is shown before the user types anything or makes a selection
// The Material-UI Typography component is used to theme the Placeholder text.

interface Props {
  selectProps: { classes: { placeholder: string | undefined } };
  innerProps: any;
  children: React.ReactNode;
}

export const Placeholder = (props: Props) => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);
