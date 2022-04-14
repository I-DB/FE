import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const OpenInput = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    maxLength,
    _defaultValue,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          type={type}
          value={value}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        <ElInput
          defaultValue={_defaultValue}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          maxLength={maxLength}
        />
      </Grid>
    </React.Fragment>
  );
};

OpenInput.defaultProps = {
  placeholder: "입력해",
  type: "text",
  _onChange: () => {},
  multiLine: false,
  value: "",
  maxLength: "",
  defaultValue: "",
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default OpenInput;
