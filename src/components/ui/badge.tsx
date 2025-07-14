import * as React from "react";

export function Badge({ children, ...props }: React.PropsWithChildren<{}>) {
  return (
    <span {...props} style={{ padding: "0.25em 0.5em", background: "#eee", borderRadius: "4px" }}>
      {children}
    </span>
  );
}
