import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { render } from 'react-dom';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
// import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`exibida na tela a mensagem No favorite pokemon found,
   caso a pessoa não tenha pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundFavoritePokemon = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundFavoritePokemon).toBeInTheDocument();
  });
});
