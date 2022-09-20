import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('', () => {
  test('exibido na tela um h2 com o texto <name> Details ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25/');
    });

    const { pathname } = history.location;
    expect(pathname).not.toBe('/');
    expect(pathname).toBe('/pokemons/25/');

    const namePoke = screen.getByRole('heading', { name: /pikachu details/i });
    const pokeSummary = screen.getByRole('heading', { name: /Summary/i });
    const pokelocations = screen
      .getByRole('heading', { name: /Game Locations of pikachu/i });
    const pokelocationsImg = screen
      .getAllByAltText(/pikachu location/i);

    // É exibido na tela um h2 com o texto <name> Details
    expect(namePoke).toBeInTheDocument();
    // É exibido na tela um h2 com o texto Summary
    expect(pokeSummary).toBeInTheDocument();
    expect(pokelocations).toBeInTheDocument();

    const textoPrimeiraParte = /This intelligent Pokémon roasts hard berries/i;
    const textDoSummary = screen.getByText(textoPrimeiraParte);
    // É exibido na tela um texto contendo <summary>
    expect(textDoSummary).toBeInTheDocument();

    // São exibidas na tela imagens de localização com o src correto
    const { foundAt } = pokemons[0];
    // É exibido na tela um h2 com o texto Game Locations of <name>
    pokelocationsImg.forEach((e) => {
      const verifica = foundAt.some((el) => el.map === e.src);
      expect(verifica).not.toBeFalsy();
    });
    // É exibido na tela uma label com o texto Pokémon favoritado?
    const checkBoxFav = screen.getByLabelText(/Pokémon favoritado/i);
    expect(checkBoxFav).toBeInTheDocument();
  });
});
