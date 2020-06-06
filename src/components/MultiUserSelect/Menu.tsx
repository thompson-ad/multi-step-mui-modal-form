import React from "react";
import Paper from "@material-ui/core/Paper";

// Here's the component that displays the MultiUserSelect options when the user starts typing or clicks on the down arrow:
// The Menu component renders a Material-UI Paper component so that the element surrounding the options is themed accordingly

interface Props {
  selectProps: { classes: { paper: string | undefined } };
  innerProps: any;
  children: React.ReactNode;
}

export const Menu = (props: Props) => (
  <Paper
    square={true}
    className={props.selectProps.classes.paper}
    {...props.innerProps}
  >
    {props.children}
  </Paper>
);
