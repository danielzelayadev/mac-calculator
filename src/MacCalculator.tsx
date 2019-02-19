import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Display from './components/Display';
import theme from './theme';
import ControlGrid from './components/ControlGrid';
import Control from './components/Control';

const Wrapper = styled.div`
  background-color: #444;
  border-radius: 4px;
`;

const LeftBorderControl = styled(Control)`
  border-bottom-left-radius: 4px;
`;

const RightBorderControl = styled(Control)`
  border-bottom-right-radius: 4px;
`;

const MacCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const initialControlsBgColor = '#555';
  const operatorColumnBgColor = 'orange';

  useEffect(() => {
    const handleKeypress = ({ which, key }: KeyboardEvent) => {
      const isNumber = which >= 48 && which <= 57;
      const isC = key === 'c' || key === 'C';

      if (isNumber) {
        if (displayValue === '0') setDisplayValue(key);
        else setDisplayValue(`${displayValue}${key}`);
      } else if (isC) {
        setDisplayValue('0');
      }
    };
    window.addEventListener('keypress', handleKeypress);
    return () => window.removeEventListener('keypress', handleKeypress);
  });

  useEffect(() => {
    const handleKeydown = ({ which }: KeyboardEvent) => {
      const isBackspace = which === 8;

      if (isBackspace) {
        if (displayValue.length > 1)
          setDisplayValue(displayValue.substr(0, displayValue.length - 1));
        else if (displayValue !== '0') setDisplayValue('0');
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Display value={displayValue} />
        <ControlGrid>
          <Control bgColor={initialControlsBgColor} column={1} row={1}>
            AC
          </Control>
          <Control bgColor={initialControlsBgColor} column={2} row={1}>
            +/-
          </Control>
          <Control bgColor={initialControlsBgColor} column={3} row={1}>
            %
          </Control>
          <Control bgColor={operatorColumnBgColor} column={4} row={1}>
            ÷
          </Control>
          <Control column={1} row={2}>
            7
          </Control>
          <Control column={2} row={2}>
            8
          </Control>
          <Control column={3} row={2}>
            9
          </Control>
          <Control bgColor={operatorColumnBgColor} column={4} row={2}>
            x
          </Control>
          <Control column={1} row={3}>
            4
          </Control>
          <Control column={2} row={3}>
            5
          </Control>
          <Control column={3} row={3}>
            6
          </Control>
          <Control bgColor={operatorColumnBgColor} column={4} row={3}>
            -
          </Control>
          <Control column={1} row={4}>
            1
          </Control>
          <Control column={2} row={4}>
            2
          </Control>
          <Control column={3} row={4}>
            3
          </Control>
          <Control bgColor={operatorColumnBgColor} column={4} row={4}>
            +
          </Control>
          <Control bgColor={initialControlsBgColor} column={1} row={1}>
            AC
          </Control>
          <LeftBorderControl column={1} row={5} columnCount={2}>
            0
          </LeftBorderControl>
          <Control column={3} row={5}>
            .
          </Control>
          <RightBorderControl
            bgColor={operatorColumnBgColor}
            column={4}
            row={5}
          >
            =
          </RightBorderControl>
        </ControlGrid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MacCalculator;
