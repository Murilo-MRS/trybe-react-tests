import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { render } from 'react-dom';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste o componente <About.js />.', () => {
  test('A página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const textoA = screen.getByText(/This application simulates a Pokédex,/i);
    const textoB = screen.getByText(/One can filter Pokémons by type, and /i);

    expect(textoA).toBeInTheDocument();
    expect(textoB).toBeInTheDocument();
  });

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole(
      'heading',
      { name: /About Pokédex/i, level: 2 },
    );
    expect(aboutTitle).toBeInTheDocument();
  });

  test('A página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgAbout = screen.getByAltText(/Pokédex/i);
    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
