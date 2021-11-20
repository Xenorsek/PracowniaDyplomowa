import { useState, useEffect } from "react";
import styled from "styled-components";

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <img
        src="https://www.pngall.com/wp-content/uploads/2016/07/Sun-Download-PNG.png"
        width="224"
        height="224"
        alt="Sun free icon"
        title="Sun free icon"
      />
      <img
        src="https://www.seekpng.com/png/full/1-14651_moon-png-transparent-picture-freeuse-moon-transparent-background.png"
        width="224"
        height="224"
        alt="Moon free icon"
        title="Moon free icon"
      />
    </ToggleContainer>
  );
};
const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.gradient};
  width: 8rem;
  height: 3.5rem;
  margin: 0 auto;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;

  img {
    max-width: 2.5rem;
    height: auto;
    transition: all 0.3s linear;

    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(0)" : "translateY(100px)"};
    }

    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;
const useDarkMode = () => {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");

    if (localTheme) {
      setTheme(localTheme);
    } else {
      window.localStorage.setItem("theme", "light");
    }
  },[]);

  return [theme, toggleTheme];
};
export { useDarkMode, Toggle };
