import styled, { StyledProps } from 'styled-components';

type Props = StyledProps<{
  column: number;
  row: number;
  activeBgColor?: string;
  bgColor?: string;
  columnCount?: number;
  rowCount?: number;
  textColor?: string;
  tooltip?: string;
  onClick?: Function;
}>;

const Control = styled.div`
  ${(props: Props) => `
    background-color: ${props.bgColor || '#777'};
    color: ${props.textColor || '#fff'};
    grid-column: ${props.column};
    grid-row: ${props.row};
    grid-column-end: ${props.column + (props.columnCount || 1)};
    grid-row-end: ${props.row + (props.rowCount || 1)};
    &:active {
      background-color: ${props.activeBgColor || '#ccc'};
    }
  `}
  font-size: 24px;
  line-height: 71px;
  height: 71px;
  text-align: center;
`;

export default Control;
