import styled, { ThemedStyledProps } from 'styled-components';
import { Theme } from '../../theme';

type Props = ThemedStyledProps<{}, Theme>;

const ControlGrid = styled.div`
  display: grid;
  font-family: ${({ theme }: Props) => theme.fontFamily};
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1px;
  padding: 1px;
`;

export default ControlGrid;
