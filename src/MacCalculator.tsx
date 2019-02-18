import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Display from './components/Display';
import theme from './theme';

const Wrapper = styled.div`
  background-color: #444;
  border-radius: 4px;
`;

const MacCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const handleKeypress = ({ which, key }: KeyboardEvent) => {
      const isNumber = which >= 48 && which <= 57;

      if (isNumber) {
        if (displayValue === '0') setDisplayValue(key);
        else setDisplayValue(`${displayValue}${key}`);
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
      </Wrapper>
    </ThemeProvider>
  );
};

export default MacCalculator;
