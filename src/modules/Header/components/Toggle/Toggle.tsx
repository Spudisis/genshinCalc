import React from "react";
import { ThemeContext, themes } from "./Context";
import { ToggleView } from "./ToggleView";

export const Toggle = () => {
  const toggleContextChange = (
    <ThemeContext.Consumer>
      {({ theme, setTheme }: any) => (
        <ToggleView
          onChange={() => {
            if (theme === themes.light) setTheme(themes.dark);
            if (theme === themes.dark) setTheme(themes.light);
          }}
          value={theme === themes.dark}
        />
      )}
    </ThemeContext.Consumer>
  );
  return <>{toggleContextChange}</>;
};
