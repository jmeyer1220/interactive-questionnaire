import React, { useState, useEffect } from "react";
import * as Switch from "@radix-ui/react-switch";
import styled from "styled-components";

const SwitchRoot = styled(Switch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: ${(props) => (props.checked ? "#4A5568" : "#E2E8F0")};
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

const SwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 100ms;
  transform: translateX(${(props) => (props.checked ? "19px" : "2px")});
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <SwitchRoot checked={theme === "dark"} onCheckedChange={toggleTheme}>
      <SwitchThumb checked={theme === "dark"} />
    </SwitchRoot>
  );
};

export default ThemeToggle;
