import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal"
      ? css`
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
          justify-content: center;
        `}
`;

export default Row;
