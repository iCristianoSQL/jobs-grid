import styled from "styled-components";

export const Container = styled.section`
  margin: auto;
  width: 850px;
  height: 600px;
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
`;

export const TableHeader = styled.div`
  width: 800px;
  display: flex;
  margin-bottom: 1rem;
  padding-left: 2.5rem;
`;

export const TableInfos = styled.div`
  width: 100px;
  text-align: center;
  font-weight: 700;
`;

export const JobInfos = styled.div`
  width: 800px;
  background-color: rgb(14, 14, 14);
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem 0;
`;
interface RowInfosProps {
  isSended?: boolean;
}
export const RowInfos = styled.div<RowInfosProps>`
  width: 100px;
  text-align: center;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    fill: ${(props) => (props.isSended ? 'green' : 'white')};
    margin-top: 0.2rem;
    cursor: pointer;
  }
`;

export const Icons = styled.div`
  display: flex;
  gap: 4px;

  button {
    border: none;
    width: fit-content;
  }
`;

export const NavBar = styled.nav`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid white;
    align-self: end;
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;

export const Counters = styled.span`
  border-bottom: 1px solid white;

  b {
    color: green;
  }
`;