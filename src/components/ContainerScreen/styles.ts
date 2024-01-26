import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  width: 100%;
  height: 100%;

  padding: 40px 120px;
  @media (max-width: 768px) {
  width: 100%;
  padding: 40px 0px;
  }
`;