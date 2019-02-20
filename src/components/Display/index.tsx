import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import numeral from 'numeral';
import { Theme } from '../../theme';

interface DisplayProps {
  value: string;
}

type WrapperProps = ThemedStyledProps<
  {
    value: string;
  },
  Theme
>;

const getFontSize = (value: string) => {
  const len = value.length;

  if (len < 10) return 44;
  if (len < 16) return 30;
  if (len < 23) return 20;
  if (len < 30) return 16;
  if (len < 40) return 12;

  return 9;
};

const formatValue = (value: string) => {
  const len = value.length;
  return len > 50 ? numeral(value).format('0.00000000e+0') : value;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: #fff;
  font-family: ${({ theme }: WrapperProps) => theme.fontFamily};
  font-size: ${({ value }: WrapperProps) => getFontSize(value)}px;
  height: 72px;
  max-height: 72px;
  padding: 30px 18px 7px 18px;
  text-align: right;
`;

const Display = ({ value }: DisplayProps) => {
  const formattedValue = formatValue(value);
  return (
    <Wrapper value={formattedValue}>
      <div>{formattedValue}</div>
    </Wrapper>
  );
};

export default Display;
