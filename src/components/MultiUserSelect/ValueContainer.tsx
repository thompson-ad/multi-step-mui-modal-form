import React from "react";

interface Props {
  selectProps: { classes: { valueContainer: string | undefined } };
  children: React.ReactNode;
}
export const ValueContainer = (props: Props) => (
  <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>
);
