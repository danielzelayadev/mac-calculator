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

const BottomLeftControl = styled(Control)`
  border-bottom-left-radius: 4px;
`;

const BottomRightControl = styled(Control)`
  border-bottom-right-radius: 4px;
`;

const MacCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [allClear, setAllClear] = useState(true);
  const initialControlsBgColor = '#555';
  const initialControlsActiveBgColor = '#777';
  const operatorColumnActiveBgColor = '#d97f00';
  const operatorColumnBgColor = 'orange';

  const handleNumber = (num: string) => {
    if (displayValue === '0') setDisplayValue(num);
    else setDisplayValue(`${displayValue}${num}`);
    if (allClear) setAllClear(false);
  };
  const handleClear = () => {
    if (allClear) return;
    setDisplayValue('0');
    setAllClear(true);
  };
  const handleDot = () => {
    if (displayValue.includes('.')) return;
    setDisplayValue(`${displayValue}.`);
  };
  const handleDelete = () => {
    if (displayValue.length > 1)
      setDisplayValue(displayValue.substr(0, displayValue.length - 1));
    else if (displayValue !== '0') setDisplayValue('0');
  };
  const handleNegation = () => {
    if (Number(displayValue) === 0) return;
    if (displayValue[0] === '-') setDisplayValue(displayValue.substr(1));
    else setDisplayValue(`-${displayValue}`);
  };

  useEffect(() => {
    const handleKeypress = ({ which, key }: KeyboardEvent) => {
      const isNumber = which >= 48 && which <= 57;
      const isC = key === 'c' || key === 'C';
      const isDot = key === '.';

      if (isNumber) handleNumber(key);
      else if (isC) handleClear();
      else if (isDot) handleDot();
    };
    window.addEventListener('keypress', handleKeypress);
    return () => window.removeEventListener('keypress', handleKeypress);
  });

  useEffect(() => {
    const handleKeydown = ({ which }: KeyboardEvent) => {
      const isBackspace = which === 8;
      if (isBackspace) handleDelete();
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Display value={displayValue} />
        <ControlGrid>
          <Control
            activeBgColor={initialControlsActiveBgColor}
            bgColor={initialControlsBgColor}
            column={1}
            row={1}
            onClick={handleClear}
          >
            {allClear ? 'AC' : 'C'}
          </Control>
          <Control
            activeBgColor={initialControlsActiveBgColor}
            bgColor={initialControlsBgColor}
            column={2}
            row={1}
            onClick={handleNegation}
          >
            +/-
          </Control>
          <Control
            activeBgColor={initialControlsActiveBgColor}
            bgColor={initialControlsBgColor}
            column={3}
            row={1}
          >
            %
          </Control>
          <Control
            activeBgColor={operatorColumnActiveBgColor}
            bgColor={operatorColumnBgColor}
            column={4}
            row={1}
          >
            ÷
          </Control>
          <Control onClick={handleNumber} column={1} row={2}>
            7
          </Control>
          <Control onClick={handleNumber} column={2} row={2}>
            8
          </Control>
          <Control onClick={handleNumber} column={3} row={2}>
            9
          </Control>
          <Control
            activeBgColor={operatorColumnActiveBgColor}
            bgColor={operatorColumnBgColor}
            column={4}
            row={2}
          >
            x
          </Control>
          <Control onClick={handleNumber} column={1} row={3}>
            4
          </Control>
          <Control onClick={handleNumber} column={2} row={3}>
            5
          </Control>
          <Control onClick={handleNumber} column={3} row={3}>
            6
          </Control>
          <Control
            activeBgColor={operatorColumnActiveBgColor}
            bgColor={operatorColumnBgColor}
            column={4}
            row={3}
          >
            -
          </Control>
          <Control onClick={handleNumber} column={1} row={4}>
            1
          </Control>
          <Control onClick={handleNumber} column={2} row={4}>
            2
          </Control>
          <Control onClick={handleNumber} column={3} row={4}>
            3
          </Control>
          <Control
            activeBgColor={operatorColumnActiveBgColor}
            bgColor={operatorColumnBgColor}
            column={4}
            row={4}
          >
            +
          </Control>
          <BottomLeftControl
            onClick={handleNumber}
            column={1}
            row={5}
            columnCount={2}
          >
            0
          </BottomLeftControl>
          <Control column={3} row={5} onClick={handleDot}>
            .
          </Control>
          <BottomRightControl
            activeBgColor={operatorColumnActiveBgColor}
            bgColor={operatorColumnBgColor}
            column={4}
            row={5}
          >
            =
          </BottomRightControl>
        </ControlGrid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MacCalculator;
