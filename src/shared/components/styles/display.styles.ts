import styled from 'styled-components';

interface DisplayFlexProps {
  margin?: string;
}

export const DisplayFlex = styled.div`
  display: flex;
`;

export const DisplayFlexJustfyRight = styled(DisplayFlex)`
  justify-content: right;
`;

export const DisplayFlexJustfyBetween = styled(DisplayFlex)<DisplayFlexProps>`
  display: flex;
  justify-content: space-between;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`;
