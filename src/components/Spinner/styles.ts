import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
`;

export const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;