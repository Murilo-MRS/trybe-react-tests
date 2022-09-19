import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const headingText = screen
      .getByRole('heading', { name: /Page requested not found/i });

    expect(headingText).toBeInTheDocument();
  });

  test('a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByAltText(/Pikachu crying because/i);
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
