import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import { Pokedex } from '../pages';
// import data from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const arrLength = 7;
    const typesFilter = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const btnFilter = screen.queryAllByTestId('pokemon-type-button');
    expect(btnFilter.length).toBe(arrLength);
    btnFilter
      .forEach((e, index) => { expect(e).toHaveTextContent(typesFilter[index]); });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByTestId('next-pokemon');
    const btnFilter = screen.getByRole('button', { name: /all/i });

    expect(btnFilter).toBeInTheDocument();
    userEvent.click(btnFilter);
    expect(btnNext).not.toBeDisabled();
  });
});
