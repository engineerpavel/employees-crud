# Тестовое задание на должность Frontend Developer

Необходимо разработать CRUD интерфейс для работы с базой сотрудников.

Обязательными являются следующие функции:

- список людей
- создание
- редактирование
- удаление
- фильтрация списка (необязательно)

Приложение должно прочитать базу один раз из файла **mates.json**. Ее содержимое можно положить, например, в глобальную переменную **window.db**

Большим плюсом будет добавить еще несколько колонок в список:

  Колонка аватар, в ячейке которой всегда должна отображаться картинка user.png, приложенная в архиве (картинку можно использовать любую)
  Колонка агрегатор, в которой должны быть инициалы пользователя и его почта

   например для пользователя :

    {
      "guid": "69827b93-1b7a-4475-9b27-5caffdf5257e",
      "age": 37,
      "name": {
        "first": "Whitney",
        "last": "Pope"
      },
      "email": "whitney.pope@undefined.net"
    }

В ячейке должно получиться: W.P. - whitney.pope@undefined.net

Список может выглядеть так

![List sample](src/assets/images/sample_list.png)


А форма создания так

![Create form sample](src/assets/images/create_form.png)

Приложение должно быть чисто frontend. Базу сохранять обратно в файл не нужно.

При создании записи форма должна валидироваться.

# EmployeesCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
