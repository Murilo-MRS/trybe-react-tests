import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { render } from 'react-dom';

describe('Teste o componente <App.js />:', () => {
    test('A aplicação contém um conjunto fixo de links de navegação "Home, About e Favorite Pokémons" :', () => {
        renderWithRouter(<App />);
        const linkHome = screen.getByRole('link',{name: /Home/i});
        const linkAbout = screen.getByRole('link',{name: /About/i});
        const linkFavoritePokemon = screen.getByRole('link',{name: /Favorite Pokémons/i});

        expect(linkHome).toBeInTheDocument();
        expect(linkAbout).toBeInTheDocument();
        expect(linkFavoritePokemon).toBeInTheDocument();
    });

    test('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
        const { history } = renderWithRouter(<App />);
        const linkHome = screen.getByRole('link',{name: /Home/i});
        expect(linkHome).toBeInTheDocument();
        const { pathname } = history.location;

        userEvent.click(linkHome);

        expect(pathname).toBe('/');
        const homeTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
            expect(homeTitle).toBeInTheDocument();
    });

    test('A aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
        const { history } = renderWithRouter(<App />);
        const linkAbout = screen.getByRole('link',{name: /About/i});
        expect(linkAbout).toBeInTheDocument();
        
        userEvent.click(linkAbout);
        const { pathname } = history.location;
        expect(pathname).not.toBe('/');
        expect(pathname).toBe('/about');
        
        const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i });
        expect(aboutTitle).toBeInTheDocument();
    });
    
    test('A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação;', () => {
        const { history } = renderWithRouter(<App />);
        const linkFavorite = screen.getByRole('link',{name: /Favorite Pokémons/i});
        expect(linkFavorite).toBeInTheDocument();
        
        userEvent.click(linkFavorite);
        const { pathname } = history.location;
        expect(pathname).not.toBe('/');
        expect(pathname).toBe('/favorites');
        
        const favoritesTitle = screen.getByRole('heading', { name: /Favorite pokémons/i });
        expect(favoritesTitle).toBeInTheDocument();
    })
    // Segundo https://app.betrybe.com/course/front-end/testes-automatizados-com-react-testing-library/rtl-testando-react-router/58c480e0-79ed-47bd-a819-f88d82997927/conteudos/5fced5ef-b98a-4040-8d69-0808129ed580/escrevendo-os-testes-da-aplicacao/7b515ca2-4d8c-4388-b80e-432b4aba70a6?use_case=side_bar
    test('', () => {
        const { history } = renderWithRouter(<App />);
        act(() => {
            history.push('/pagina/que-nao-existe/');
          });
        const notFoundTitle = screen.getByRole('heading',{ name: /Page requested not found/i });
        expect(notFoundTitle).toBeInTheDocument();
    })
});
