import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Get farm data/i);
  expect(linkElement).toBeInTheDocument();
});

test('button click requests api', () =>{

  render(<App />);

  const apiFetchButton = screen.getByText(/Get farm data/i);
  //user clicks the button
  return userEvent.click(apiFetchButton).then( data => {

    expect(screen.getByText(/success/i)).toBeInTheDocument()

  })
 
});
