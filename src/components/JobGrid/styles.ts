import styled from "styled-components";

export const Container = styled.section`
  margin: auto;
  width: 800px;
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

export const RowInfos = styled.div`
  width: 100px;
  text-align: center;
  font-size: 14px;
`;

export const Icons = styled.div`
    display: flex;
    gap: 4px;

    button {
        width: fit-content;
    }
`

export const NavBar = styled.nav`
  width: 100%;


  button {
    padding: 0.5rem 1rem;
    border: 1px solid white;
  }
`;