import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Index from './index';
import Home from '../index';
import * as nextRouter from 'next/router';

describe('Calculator', () => {
  beforeEach(() => {
    jest.mock('next/router', () => ({
      useRouter() {
        return {
          route: '/',
          pathname: '',
          query: '',
          asPath: ''
        };
      }
    }));
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));
  });

  afterEach(cleanup);

  // it('renders a calculator', () => {
  //   render(<Home />);
  //   // check if all components are rendered
  //   expect(screen.getByTestId('result')).toBeInTheDocument();
  //   expect(screen.getByTestId('num1')).toBeInTheDocument();
  //   expect(screen.getByTestId('num2')).toBeInTheDocument();
  //   expect(screen.getByTestId('add')).toBeInTheDocument();
  //   expect(screen.getByTestId('subtract')).toBeInTheDocument();
  //   expect(screen.getByTestId('multiply')).toBeInTheDocument();
  //   expect(screen.getByTestId('divide')).toBeInTheDocument();
  // });
  // it('sums up two values', () => {
  //   expect(sum(2, 4)).toBe(6);
  // });
  it('renders counter', () => {
    render(<Index />);
    const count = screen.getByTestId('result');
    const button = screen.getByTestId('add');
    fireEvent.click(button);
    expect(count).toHaveTextContent('1');
  });
  // it('increments the result when the Add button is clicked', () => {
  //   render(<Index />);
  //   const addButton = screen.getByTestId('add');
  //   const resultDiv = screen.getByTestId('result');
  //
  //   expect(resultDiv.textContent).toBe('0');
  //
  //   fireEvent.click(addButton);
  //   expect(resultDiv.textContent).toBe('1');
  //
  //   fireEvent.click(addButton);
  //   expect(resultDiv.textContent).toBe('2');
  // });
  it('adds numbers', async () => {
    render(<Home />);

    const num1input = screen.getByTestId('num1');
    const num2input = screen.getByTestId('num2');
    const addButton = screen.getByTestId('add');
    const resultArea = screen.getByTestId('result');
    fireEvent.change(num1input, { target: { value: 5 } });
    fireEvent.change(num2input, { target: { value: 8 } });
    fireEvent.click(addButton);

    expect(resultArea).toHaveTextContent(13);
  });
});
