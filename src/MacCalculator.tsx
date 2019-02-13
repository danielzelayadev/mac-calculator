import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Display from './components/Display';
import theme from './theme';

const Wrapper = styled.div`
  background-color: #444;
  border-radius: 4px;
`;

class MacCalculator extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Display value={0} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default MacCalculator;
