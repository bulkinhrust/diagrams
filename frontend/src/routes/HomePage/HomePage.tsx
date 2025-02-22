import React from 'react';

import { Button } from '@modules/UIKit';
import classes from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToAuth = (method: string) => () => navigate(`/auth/${method}`);

  return (
    <div className={classes.component}>
      <div className={classes.header}>
        <h1>Crafty Craft</h1>
        <div className={classes.buttons}>
          <Button onClick={goToAuth('signin')} type="text">
            Войти
          </Button>
          <Button onClick={goToAuth('signup')} variant="primary">
            Зарегистрироваться
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        <p>Великолепное приложение!</p>
        <p>Купи лицензию!</p>
        <p>Здесь описаны все фишки приложения</p>
        <p>Здесь до сих пор нет стоимости лицензии</p>
        <p>Божечки, какое приложение!!!</p>
        <p>Купи!</p>
        <p>Вот тут отзывы от ненастоящих людей</p>
        <p>Успей купить пока всё не разобрали</p>
        <p className={classes.cost}>Стоимость всего 1 рубль</p>
      </div>
    </div>
  );
};

export default HomePage;
