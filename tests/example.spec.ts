import { test, expect } from '@playwright/test';

const TEST_URL:string = 'http://localhost:3000/github-repository-search#/';
// https://uchenick55.github.io/github-repository-search/#/

const TEST_TOKEN: string = "_pat_11AZK6O3Y0akW17a6emDAf_4mTlJPBGa7lCxJmBiGqSt0fsNaxhCgQYhiKfOe8LZGZEHD644UANIWYLx4q"
//github

test('Success authority', async ({ page }) => { // успешный вход по токену (авторизация)
  await page.goto(TEST_URL);

  // заполнить поле ввода верным значением токена
  await page.getByRole('textbox').fill(TEST_TOKEN);

 // жмем на кнопку отправить
  await page.getByText('Enter').click();

  // URL содержит строку list
  await expect(page).toHaveURL(/.*list/);
});


test('Error token', async ({ page }) => { // отображение ошибок неверного ввода токена
  await page.goto(TEST_URL);

  const ErrorsField = page.getByTestId('errors') // присваиваем константу полю ошибок

  // заполнить поле ввода неверным значением токена
  await page.getByRole('textbox').fill('123');

  // жмем на кнопку отправить
  await page.getByText('Enter').click();

  // проверяем наличие ошибки 401
  await expect(ErrorsField).toHaveText("Request failed with status code 401")

  // заполнить поле русскими символами
  await page.getByRole('textbox').fill('абвгд');

  // жмем на кнопку отправить
  await page.getByText('Enter').click();

  // проверяем наличие ошибки String contains non ISO-8859-1
  await expect(ErrorsField).toHaveText("Failed to execute 'setRequestHeader' on 'XMLHttpRequest': String contains non ISO-8859-1 code point.")

});

test('Pagination', async ({ page }) => { // переключение между страницами пагинации
  await page.goto(TEST_URL);

  // заполнить поле ввода верным значением токена
  await page.getByRole('textbox').fill(TEST_TOKEN);

  // жмем на кнопку отправить
  await page.getByText('Enter').click();

  // URL содержит строку list
  await expect(page).toHaveURL(/.*list/);

  //поле ввода поиска репозиториев очистить
  await page.getByRole('textbox').fill("123");

  // жмем на кнопку Enter поиска репозиториев
  await page.getByText('Enter').click();

  // жмем на ссылку
  await page.getByText('Enter').click();

  //кликаем по третьей странице пагинации
  await  page.getByRole('link', { name: '3', exact: true }).click();

  // URL заканчивается на символ 3
  await expect(page).toHaveURL(/.*3/);

  //кликаем по первой странице пагинации
  await  page.getByRole('link', { name: '1', exact: true }).click();

  // URL заканчивается на символ 1
  await expect(page).toHaveURL(/.*1/);
});

test('Card open', async ({ page }) => { // открытие карточки репозитория
  await page.goto(TEST_URL);

  // заполнить поле ввода верным значением токена
  await page.getByRole('textbox').fill(TEST_TOKEN);

  // жмем на кнопку отправить
  await page.getByText('Enter').click();

  // URL содержит строку list
  await expect(page).toHaveURL(/.*list/);

  //поле ввода поиска репозиториев очистить
  await page.getByRole('textbox').fill("");

  // жмем на кнопку Enter поиска репозиториев
  await page.getByText('Enter').click();

  //кликаем по первой странице пагинации
  await  page.getByRole('link', { name: '1', exact: true }).click();

  // URL заканчивается на символ 1
  await expect(page).toHaveURL(/.*1/);

  //кликаем по первому репозиторию в списке
  await  page.getByRole('link', { name: 'react-kabzda-1' }).click();


  // URL заканчивается на символы R_kgDOHZeBEg (мы зашли на карточку)
  await expect(page).toHaveURL(/.*R_kgDOHZeBEg/);

  //кликаем по названию репозитория
  await  page.getByRole('link', { name: 'react-kabzda-1' }).click();

  // URL соответствует репозиторию на Github
  await expect(page).toHaveURL("https://github.com/uchenick55/react-kabzda-1");

  await page.goBack() // возвращаемся назад на карточку репозитория

  //кликаем по имени автора
  await  page.getByRole('link', { name: 'uchenick55' }).click();

  // URL соответствует репозиторию на Github
  await expect(page).toHaveURL("https://github.com/uchenick55");

});

