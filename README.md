# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Idea

Изначально сайт создавался с целью автоматизировать подсчет валюты, т.к. самому считать это каждый день было невмоготу.\
Далее добавился функционал ведения статистики изменения валюты.\
К сожалению, Hoyoverse не представляют своё api для пользования, поэтому всё для учета приходится вписывать вручную.\
На ветке newBackend переписан функционал под бекэнд на NodeJS, если случится так, что Hoyoverse вдруг решат открыть публичное api, эта ветка станет основной, где, возможно, вернется использование firebase исключительно для авторизации и хранения некоторых данных необходимых для запроса к возможным api.

## Стэк разработки

Firebase - авторизация и хранение вводимых данных. Также firebase hooks для удобной работы.\
Redux toolkit\
ReactJS\
TypeScript\
Redux-persist - для хранения настроек.\
Formik - работа с формами.\

