import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../modules/ui-kit';
import userStore from '../../stores/user/userStore';
import classes from './Main.module.scss';

type Props = {};

const Main: React.FC<Props> = (props) => {
  const {} = props;
  const { isAuth, user } = userStore;

  return (
    <div className={classes.component}>
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

export default Main;
