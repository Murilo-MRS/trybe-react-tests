import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('', () => {
  test('Renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<App />);
    // console.log(pokemons);

    const imagePoke = screen.getByRole('img', {
      name: `${pokemons[0].name} sprite`,
    });
    // const imageStar = screen.getByRole('img', {
    //   name: `${pokemons[0]} is marked as favorite`,
    // });

    const linkDetail = screen.getByRole('link', { name: /more details/i });

    const pokeName = screen.getByTestId(/pokemon-name/i);
    const pokeWeight = screen.getByTestId(/pokemon-weight/i);

    expect(pokeName).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    // imagem do pokemon possui o src correto
    expect(imagePoke).toHaveAttribute('src', `${pokemons[0].image}`);
    // A imagem do pokemon possui o alt <name> sprite
    expect(imagePoke).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
    // A imagem de favorito star possui o src /star-icon.svg
    // expect().toHaveAttribute('src', '../../public/star-icon.svg');
    expect(linkDetail).toBeInTheDocument();
  });

  test('Teste se ao clicar no link de navegação do pokémon, é redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    console.log(pokemons);
    const linkDetail = screen.getByRole('link', { name: /more details/i });

    userEvent.click(linkDetail);

    const { pathname } = history.location;
    expect(pathname).not.toBe('/');
    expect(pathname).toBe('/pokemons/25');
    const checkBoxFav = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(checkBoxFav);

    const favChecked = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });

    expect(favChecked).toHaveAttribute('src', '/star-icon.svg');
    expect(favChecked).toBeInTheDocument();
  });

  test('', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25/');
    });

    const pokeType = screen.getByTestId('pokemon-type', { name: /electric/i });
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Electric');
  });
});
