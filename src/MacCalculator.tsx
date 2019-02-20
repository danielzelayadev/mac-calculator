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

type Operation = {
  left: number;
  operator?: string;
  right: number;
};

const calculateResult = ({ left, operator, right }: Operation) => {
  if (operator === '+') return left + right;
  if (operator === '-') return left - right;
  if (operator === 'x') return left * right;
  if (operator === '÷') return left / right;

  return left;
};

const initialOperation: Operation = {
  left: 0,
  right: 0
};

const MacCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [allClear, setAllClear] = useState(true);
  const [operation, setOperation] = useState(initialOperation);
  const [readRight, setReadRight] = useState(false);
  const [inputStarted, setInputStarted] = useState(false);

  const initialControlsBgColor = '#555';
  const initialControlsActiveBgColor = '#777';
  const operatorColumnActiveBgColor = '#d97f00';
  const operatorColumnBgColor = 'orange';

  const handleNumber = (num: string) => {
    if (displayValue === '0' || !inputStarted) setDisplayValue(num);
    else setDisplayValue(`${displayValue}${num}`);

    setAllClear(false);
    setInputStarted(true);
  };
  const handleDot = () => {
    if (displayValue.includes('.')) return;

    if (inputStarted) setDisplayValue(`${displayValue}.`);
    else setDisplayValue('0.');

    setAllClear(false);
    setInputStarted(true);
  };
  const handleNegation = () => {
    if (Number(displayValue) === 0) return;

    if (inputStarted) {
      if (displayValue[0] === '-') setDisplayValue(displayValue.substr(1));
      else setDisplayValue(`-${displayValue}`);
    } else setDisplayValue('0');

    setAllClear(false);
    setInputStarted(true);
  };
  const handlePercent = () => {
    const value = Number(displayValue);

    if (value === 0) return;

    if (!inputStarted) setDisplayValue('0');
    else {
      const result = value / 100;
      setDisplayValue(result.toString());
    }

    setAllClear(false);
    setInputStarted(true);
  };
  const handleDelete = () => {
    if (!inputStarted) {
      setDisplayValue('0');
      setInputStarted(true);
      return;
    }
    if (displayValue.length > 1)
      setDisplayValue(displayValue.substr(0, displayValue.length - 1));
    else if (displayValue !== '0') setDisplayValue('0');
  };

  const handleOperator = (operator: string) => {
    if (readRight) {
      if (!inputStarted) return;

      const result = calculateResult({
        ...operation,
        right: Number(displayValue)
      });

      setOperation({
        ...operation,
        left: result,
        operator
      });
      setDisplayValue(result.toString());
    } else {
      setOperation({
        ...operation,
        left: Number(displayValue),
        operator
      });
      setReadRight(true);
    }

    setInputStarted(false);
  };

  const handleEqual = () => {
    if (readRight) {
      const result = calculateResult({
        ...operation,
        right: inputStarted ? Number(displayValue) : operation.left
      });

      setOperation({
        ...operation,
        left: result
      });
      setDisplayValue(result.toString());
    }

    setInputStarted(false);
  };

  const handleClear = () => {
    if (allClear) return;
    setDisplayValue('0');
    setAllClear(true);
    setOperation(initialOperation);
    setReadRight(false);
    setInputStarted(false);
  };

  useEffect(() => {
    const handleKeypress = ({ which, key }: KeyboardEvent) => {
      const isNumber = which >= 48 && which <= 57;
      const isC = key === 'c' || key === 'C';
      const isDot = key === '.';
      const isPercent = key === '%';

      if (isNumber) handleNumber(key);
      else if (isC) handleClear();
      else if (isDot) handleDot();
      else if (isPercent) handlePercent();
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
            onClick={handlePercent}
          >
            %
          </Control>
          <Control
            activeBgColor={operatorColumnActiveBgColor}
            bgColor={operatorColumnBgColor}
            column={4}
            row={1}
            onClick={handleOperator}
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
            onClick={handleOperator}
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
            onClick={handleOperator}
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
            onClick={handleOperator}
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
            onClick={handleEqual}
          >
            =
          </BottomRightControl>
        </ControlGrid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MacCalculator;
