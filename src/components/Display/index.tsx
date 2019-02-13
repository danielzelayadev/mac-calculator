import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import numeral from 'numeral';
import { Theme } from '../../theme';

interface DisplayProps {
  value: number;
}

type WrapperProps = ThemedStyledProps<
  {
    value: number;
  },
  Theme
>;

/** TODO: Test this out to figure out the correct lengths and font sizes */
const getFontSize = (value: number) => {
  const len = value.toString().length;

  if (len < 12) return 44;
  if (len < 18) return 36;
  if (len < 24) return 24;

  return 18;
};

/** TODO: We're gonna use the final length size as the condition here */
const formatValue = (value: number) => {
  const len = value.toString().length;
  return len > 24 ? numeral(value).format('0.000000e+0') : value;
};

const Wrapper = styled.div`
  color: #fff;
  font-family: ${({ theme }: WrapperProps) => theme.fontFamily};
  font-size: ${({ value }: WrapperProps) => getFontSize(value)}px;
  padding: 30px 18px 7px 18px;
  text-align: right;
`;

const Display = ({ value }: DisplayProps) => (
  <Wrapper value={value}>{formatValue(value)}</Wrapper>
);

export default Display;
