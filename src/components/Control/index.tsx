import React from 'react';
import styled, { StyledProps } from 'styled-components';
import { omit } from 'ramda';

type CommonProps = {
  column: number;
  row: number;
  activeBgColor?: string;
  bgColor?: string;
  columnCount?: number;
  rowCount?: number;
  textColor?: string;
};
type Props = {
  children: string;
  onClick?: (char: string) => void;
} & CommonProps;
type WrapperProps = StyledProps<CommonProps>;

const Wrapper = styled.div`
  ${(props: WrapperProps) => `
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

const Control = (props: Props) => (
  <Wrapper
    {...omit(['children', 'onClick'], props)}
    onClick={() => props.onClick && props.onClick(props.children)}
  >
    {props.children}
  </Wrapper>
);

export default Control;
