// SEC-03 / BUG-03: the contact form must send trimmed values, enforce length
// caps in the submit handler (not only via the maxLength attribute), and drop
// submissions that fill the hidden honeypot field.
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { send } from '@emailjs/browser';
import Footer from './Footer';

jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn(() => Promise.resolve({ status: 200 })),
}));

beforeAll(() => {
  process.env.REACT_APP_EMAILJS_SERVICE_ID = 'service_test';
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'template_test';
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'public_test';
});

beforeEach(() => send.mockClear());

function openAndFill({ name, email, message }) {
  render(<Footer />);
  fireEvent.click(screen.getByTitle('Send a message'));
  fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: name } });
  fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: email } });
  fireEvent.change(screen.getByPlaceholderText('Your message'), { target: { value: message } });
}

const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Send' }));

test('sends trimmed values', async () => {
  openAndFill({ name: '  Ann  ', email: ' ann@example.com ', message: '  hello there, friend  ' });
  submit();
  await waitFor(() => expect(send).toHaveBeenCalledTimes(1));
  expect(send.mock.calls[0][2]).toEqual({
    name: 'Ann',
    email: 'ann@example.com',
    message: 'hello there, friend',
  });
});

test('rejects an oversized message without calling EmailJS', async () => {
  openAndFill({ name: 'Ann', email: 'ann@example.com', message: 'x'.repeat(5001) });
  submit();
  expect(await screen.findByText(/at most 5000 characters/)).toBeInTheDocument();
  expect(send).not.toHaveBeenCalled();
});

test('drops submissions that fill the honeypot', async () => {
  openAndFill({ name: 'Bot', email: 'bot@example.com', message: 'buy cheap things now' });
  fireEvent.change(screen.getByLabelText(/leave this field empty/i), { target: { value: 'spam co' } });
  submit();
  await screen.findByText(/sent successfully/);
  expect(send).not.toHaveBeenCalled();
});

test('inputs carry maxLength caps', () => {
  render(<Footer />);
  fireEvent.click(screen.getByTitle('Send a message'));
  expect(screen.getByPlaceholderText('Your name')).toHaveAttribute('maxLength', '100');
  expect(screen.getByPlaceholderText('Your email')).toHaveAttribute('maxLength', '254');
  expect(screen.getByPlaceholderText('Your message')).toHaveAttribute('maxLength', '5000');
});
