import { faRodAsclepius } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    _onClick,
    flex_end,
    border,
    is_center,
    height,
    boxShadow,
    borderRadius,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    flex_end: flex_end,
    border: border,
    is_center: is_center,
    height: height,
    boxShadow: boxShadow,
    borderRadius : borderRadius,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  flex_end: false,
  border: false,
  is_center: false,
  boxShadow: false,
  borderRadius: null,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow : ${(props) => props.boxShadow};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? `display: flex; align-items: center; justify-content: space-between;` : "")}
  ${(props) =>
    props.is_center
      ? `display: flex; flex-direction : column; align-items: center; justify-content: center;`
      : ""}
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.flex_end ? `display: flex; justify-content: flex-end;` : "")}
  ${(props) => (props.border ? `border:${props.border}` : "")}
  ${(props) => (props.borderRadius ? `border-radius:${props.borderRadius}` : "")}
`;

export default Grid;
