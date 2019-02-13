import React from 'react';
import ReactDOM from 'react-dom';
import MacCalculator from './MacCalculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MacCalculator />, div);
  ReactDOM.unmountComponentAtNode(div);
});
