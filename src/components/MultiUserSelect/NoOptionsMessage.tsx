import React from "react";
import Typography from "@material-ui/core/Typography";

// Here's the NoOptionsMessage component. It is rendered when there aren't any MultiUserSelect options to display, as follows:
// This renders a Typography component with textSecondary as the color property value.
interface Props {
  selectProps: { classes: { noOptionsMessage: string | undefined } };
  innerProps: any;
  children: React.ReactNode;
}

export const NoOptionsMessage = (props: Props) => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);
