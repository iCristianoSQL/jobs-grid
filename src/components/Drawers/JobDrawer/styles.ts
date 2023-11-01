import styled from "styled-components";

export const InputBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
    padding: 1rem;
    background-color: #1f262e;

    input {
        background-color: white;
    }
`;