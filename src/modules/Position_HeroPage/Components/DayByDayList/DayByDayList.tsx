import React from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { changeDBDStore } from "../../../../store/slices/heroes";
import { storeItem, valueDayByDay } from "../../../../store/types/items";
import { Button } from "../../../../UI/Button/Button";
import { getDateNow, getNumberOfDays } from "../../../../utils";
import { addDBD, changeDBD, deleteDBD } from "../../Api/dayByDays";
import s from "./DayByDayList.module.scss";
export const DayByDayList = ({ hero }: { hero: storeItem }) => {
  const dispatch = useAppDispatch();

  const [valueDayByDay, setValueDayByDays] = React.useState(hero.valueDayByDays);
  const [errorText, setErrorText] = React.useState("");

  React.useEffect(() => {
    setValueDayByDays(hero.valueDayByDays);
  }, [hero.valueDayByDays]);

  const handleChangeDateStart = (id: number, value: string, date_end: string | undefined) => {
    const errorMsg = Validate(TypeValidate.date_start, value, date_end, hero.date_start, hero.date_end);
    if (errorMsg) {
      return setErrorText(errorMsg);
    }
    setErrorText("");
    const newMas = valueDayByDay.map((elem) => {
      if (elem.id === id) {
        return { ...elem, date_start: value };
      }
      return elem;
    });
    setValueDayByDays(newMas);
  };
  const handleChangeDateEnd = (id: number, value: string, date_start: string | undefined) => {
    const errorMsg = Validate(TypeValidate.date_end, value, date_start, hero.date_start, hero.date_end);
    setErrorText("");
    const newMas = valueDayByDay.map((elem) => {
      if (elem.id === id) {
        return { ...elem, date_end: value };
      }
      return elem;
    });
    setValueDayByDays(newMas);
  };

  const handleChangeValueDBD = (id: number, value: string) => {
    const newMas = valueDayByDay.map((elem) => {
      if (elem.id === id) {
        return { ...elem, value: Number(value) };
      }
      return elem;
    });
    setValueDayByDays(newMas);
  };

  const saveDBD = async () => {
    // valueDayByDay.forEach((elem) => {
    //   const objStart = { date_start: elem.date_start, date_end: hero.date_end }; //начало таймлайна конец героя
    //   const objEnd = { date_end: elem.date_end, date_start: hero.date_start }; // конец таймлайна начало героя
    //   const error = { date_start: elem.date_start, date_end: elem.date_end }; // начало таймлайна конец таймлайна
    //   const heroDateChange = { date_end: hero.date_end, date_start: elem.date_end }; //

    //   if (getNumberOfDays(objStart) < 0) {
    //     return setErrorText("Проверьте дату начала накопления");
    //   }
    //   if (getNumberOfDays(objEnd) < 0) {
    //     return setErrorText("Проверьте дату конца накопления");
    //   }
    //   if (getNumberOfDays(error) < 0) {
    //     return setErrorText("начальная дата больше чем конец");
    //   }
    //   if (getNumberOfDays(heroDateChange) < 0) {
    //     return setErrorText("Дата превышает конечную дату");
    //   }
    // });
    try {
      if (errorText !== "") {
        return;
      }
      valueDayByDay.forEach((elem) => {
        changeDBD(elem);
      });
      dispatch(changeDBDStore(valueDayByDay));
    } catch (error) {
      console.log(error);
    }
  };
  const addTimeLine = async () => {
    if (valueDayByDay.length <= 10) {
      try {
        let date_start;
        if (!hero.date_end) {
          date_start = getDateNow();
        } else {
          date_start = hero.date_end;
        }
        const res = await addDBD(hero.id, date_start);
        setValueDayByDays((valueDayByDay) => [...valueDayByDay, res]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteDBDRow = async (id: number) => {
    try {
      await deleteDBD(id);
      const data = valueDayByDay.filter((elem) => {
        if (elem.id !== id) {
          return elem;
        }
      });
      setValueDayByDays(data);
    } catch (error) {
      console.log("не удалось удалить");
    }
  };
  return (
    <div className={s.infoDBD}>
      {valueDayByDay.map((elem) => {
        return (
          <div className={s.listDBD} key={elem.id}>
            <input
              type="date"
              onChange={(e) => handleChangeDateStart(elem.id, e.target.value, elem.date_end)}
              value={elem.date_start}
            />
            <input
              type="date"
              onChange={(e) => handleChangeDateEnd(elem.id, e.target.value, elem.date_start)}
              value={elem.date_end}
            />
            <input type="numeric" value={elem.value} onChange={(e) => handleChangeValueDBD(elem.id, e.target.value)} />
            <Button name="удалить" click={deleteDBDRow} param={elem.id} />
          </div>
        );
      })}
      <div className={s.buttons}>
        <Button name="Добавить" click={addTimeLine} param="" />
        <label>{errorText}</label>
        <Button name="Сохранить" click={saveDBD} param="" />
      </div>
    </div>
  );
};

enum TypeValidate {
  "date_start",
  "date_end",
}

const Validate = (
  CheckType: TypeValidate,
  value: string | undefined,
  date: string | undefined,
  heroDateStart: string,
  heroDateEnd: string | undefined
) => {
  if (CheckType === TypeValidate.date_start) {
    if (!value) {
      return "Должна быть начальная дата";
    }
    if (heroDateEnd) {
      const objStart = { date_start: value, date_end: heroDateEnd };
      if (getNumberOfDays(objStart) < 0) {
        return "Проверьте дату конца накопления";
      }
    }
    const objEnd = { date_start: heroDateStart, date_end: value };
    if (getNumberOfDays(objEnd) < 0) {
      return "Проверьте дату начала накопления";
    }
    if (date) {
      const error = { date_start: value, date_end: date };
      if (getNumberOfDays(error) < 0) {
        return "начальная дата больше чем конец";
      }
    }
  } else if (CheckType === TypeValidate.date_end) {
    if (!date) {
      return "Должна быть начальная дата";
    }

    if (heroDateEnd && value) {
      const objEnd = { date_start: value, date_end: heroDateEnd };
      if (getNumberOfDays(objEnd) < 1) {
        return "Проверьте дату конца накопления";
      }
    }
    if (value) {
      const error = { date_start: date, date_end: value };
      if (getNumberOfDays(error) < 0) {
        return "Конечная дата меньше начала";
      }
      const objStart = { date_start: heroDateStart, date_end: value };
      if (getNumberOfDays(objStart) < 1) {
        return "Проверьте дату начала накопления";
      }
    }
  }
};
