import {test, expect} from '@playwright/test';

//=======================================================
// Сюда нужно подставить полный токен GitHub перед тестами
// Можете создайте свой: https://github.com/settings/tokens?type=beta
const TEST_TOKEN: string = "_pat_11AZK6O3Y0l6uyZNqOGbEI_6p29kVRnBjTrYe4z4ZJYP1nP96af9Jwf2IMgnXxjqztTR3ZFBDA9eSQT6rs"
//github
//=======================================================

//const TEST_URL:string = 'http://localhost:3000/github-repository-search#/';
const TEST_URL: string = 'https://uchenick55.github.io/github-repository-search/#/';

test.describe( 'Tests after login', () => {
    test.beforeEach( async ({page}, testInfo) => { // общая часть группы тестов для логина по токену

        await page.goto( TEST_URL ); // переход на тестовую страницу

        // заполнить поле ввода верным значением токена
        await page.getByRole( 'textbox' ).fill( TEST_TOKEN );

        // жмем на кнопку отправить
        await page.getByText( 'Enter' ).click();
    } );

    test( 'Success authority2', async ({page}) => { // успешный вход по токену (авторизация)
        // URL содержит строку list
        await expect( page ).toHaveURL( /.*list/ );
    } );


    test( 'Pagination4', async ({page}) => { // переключение между страницами пагинации

        // URL содержит строку list
        await expect( page ).toHaveURL( /.*list/ );

        //поле ввода поиска репозиториев заполнить
        await page.getByPlaceholder('Поиск по gitHub репозиториям').fill( "123" );

        // жмем на кнопку Enter поиска репозиториев
        await page.getByText( 'Enter' ).click();

        //кликаем по третьей странице пагинации
        await page.getByTestId( 'Pagination_page_3' ).click();

        // URL заканчивается на символ 3
        await expect( page ).toHaveURL( `${TEST_URL}list/3` );

        //кликаем по первой странице пагинации
        await page.getByTestId( 'Pagination_page_1' ).click();

        // URL заканчивается на символ 1
        await expect( page ).toHaveURL( `${TEST_URL}list/1` );
    } );


    test( 'Card open2', async ({page}) => { // открытие карточки репозитория

        //поле ввода поиска репозиториев очистить
        await page.getByPlaceholder('Поиск по gitHub репозиториям').fill( "" );

        // жмем на кнопку Enter поиска репозиториев
        await page.getByText( 'Enter' ).click();

        //кликаем по первой странице пагинации
        await page.getByTestId( 'Pagination_page_1' ).click();

        // URL содержит полный URL с list/1 в конце
        await expect( page ).toHaveURL( `${TEST_URL}list/1` );

        // кликаем по первому репозиторию в списке (он есть всегда)
        await page.getByTestId( '1' ).click();

        // URL содержит "card" символы (мы зашли на карточку)
        await expect( page ).toHaveURL( /.*card*/ );

        await page.route( '**/api/fetch_data_third_party_dependency', route => route.fulfill( {
            status: 200,
        } ) );
        await page.getByTestId( 'CardName' ).click(); // кликаем по имени репозитория в карточке


    } );
    test( 'LogOut List page', async ({page}) => { // логаут пользователя со страницы

        //нажать кнопку логаут
        await page.getByRole( 'img', {name: 'log out'} ).click();

        // URL содержит полный URL с list/1 в конце
        await expect( page ).toHaveURL( `${TEST_URL}` );

    } );
    test( 'LogOut Card page', async ({page}) => { // логаут пользователя со страницы

        //поле ввода поиска репозиториев очистить
        await page.getByPlaceholder('Поиск по gitHub репозиториям').fill( "" );

        // жмем на кнопку Enter поиска репозиториев
        await page.getByText( 'Enter' ).click();

        //кликаем по первой странице пагинации
        await page.getByTestId( 'Pagination_page_1' ).click();

        // URL содержит полный URL с list/1 в конце
        await expect( page ).toHaveURL( `${TEST_URL}list/1` );

        await page.getByTestId( '1' ).click(); // кликаем по первому репозиторию в списке (он есть всегда)

        // URL содержит "card" символы (мы зашли на карточку)
        await expect( page ).toHaveURL( /.*card*/ );

        //нажать кнопку логаут
        await page.getByRole( 'img', {name: 'log out'} ).click();

        // URL содержит полный URL с list/1 в конце
        await expect( page ).toHaveURL( `${TEST_URL}` );

    } );
    test( 'List page reload', async ({page}) => { // обновление страницы списка репозиториев с
        // сохранением данных поля ввода и страницы пагинации

        //поле ввода внести поисковые данные
        await page.getByPlaceholder('Поиск по gitHub репозиториям').fill( "444" );

        // жмем на кнопку Enter поиска репозиториев
        await page.getByText( 'Enter' ).click();

        //кликаем по 2 странице пагинации
        await page.getByTestId( 'Pagination_page_2' ).click();

        // URL содержит полный URL с list/2 в конце
        await expect( page ).toHaveURL( `${TEST_URL}list/2` );

        // перезагружаем страницу
        await page.reload();

        // URL содержит полный URL с list/2 в конце
        await expect( page ).toHaveURL( `${TEST_URL}list/2` );

    } );


} );


test( 'Error token', async ({page}) => { // отображение ошибок неверного ввода токена
    await page.goto( TEST_URL );

    const ErrorsField = page.getByTestId( 'errors' ) // присваиваем константу полю ошибок

    // заполнить поле ввода неверным значением токена
    await page.getByRole( 'textbox' ).fill( '123' );

    // жмем на кнопку отправить
    await page.getByText( 'Enter' ).click();

    // проверяем наличие ошибки 401
    await expect( ErrorsField ).toHaveText( "Request failed with status code 401" )

    // заполнить поле русскими символами
    await page.getByRole( 'textbox' ).fill( 'абвгд' );

    // жмем на кнопку отправить
    await page.getByText( 'Enter' ).click();

    // проверяем наличие ошибки String contains non ISO-8859-1
    await expect( ErrorsField ).toHaveText( "Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point." )

} );
