import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch } from "../../store/hooks";
import { addSynchro } from "../../store/slices/synchronization";
import { Synchronization } from "../../store/types/items";
import s from "./sync.module.scss";

type addSync = {
  store: string[];
  synchroName: string[];
  sum: number;
};

export const AddSync = ({ store, synchroName, sum }: addSync) => {
  const dispatch = useAppDispatch();

  const addSynchroFunc = (values: Synchronization) => {
    dispatch(addSynchro(values));
  };
  const names = store.map(
    (elem, id) =>
      !synchroName.includes(elem) && (
        <label key={id + "field name hero"}>
          <Field type="radio" name="name" value={elem} />
          {elem}
        </label>
      )
  );
  return (
    <Formik
      enableReinitialize
      initialValues={{ id: Math.random(), name: "select", value: 0, typeValue: "select" }}
      validate={(values: any) => {
        const errors: any = {};
        if (values.name === "" || values.name === "select") {
          errors.name = "Необходимо выбрать имя";
        }
        if (values.typeValue === "" || values.typeValue === "select") {
          errors.typeValue = "Необходимо выбрать параметр";
        }
        if (values.value === 0 || values.value < 0 || !values.value) {
          errors.value = "Значение должно быть больше 0";
        }
        if (values.typeValue === "percent" && +values.value + +sum > 100) {
          errors.value = "Синхронизация превышает 100%";
        }
        return errors;
      }}
      onSubmit={(values: any, { setSubmitting }: any) => {
        addSynchroFunc(values);
      }}
    >
      {({ values }: any) => (
        <Form>
          {names[0] ? (
            <div className={s.formAdd}>
              {store.length !== 0 && (
                <div className={s.groupInput}>
                  <div role="group" aria-labelledby="my-radio-groupHeroes" className={s.groupRadio}>
                    <button type="button" className={s.select}>
                      Имя: {values.name}
                    </button>
                    <div className={s.list}>{names}</div>
                    <ErrorMessage className={s.error} name="name" component="div" />
                  </div>
                </div>
              )}
              <div className={s.groupInput}>
                <label className={s.inputGem}>
                  <div className={s.text}>Кол-во:</div>
                  <Field type="numeric" name="value" />
                  <ErrorMessage className={s.error} name="value" component="div" />
                </label>
              </div>
              <div className={s.groupInput}>
                <div role="group" aria-labelledby="my-radio-groupTypes" className={s.groupRadio}>
                  <button type="button" className={s.select}>
                    Тип: {values.typeValue}
                  </button>
                  <div className={s.list}>
                    <label>
                      <Field type="radio" name="typeValue" value="number" />
                      Примогемов
                    </label>
                    <label>
                      <Field type="radio" name="typeValue" value="percent" />
                      Процентов
                    </label>
                  </div>

                  <ErrorMessage className={s.error} name="typeValue" component="div" />
                </div>
              </div>

              <button type="submit" className={`${s.button} ${s.add}`}>
                Добавить
              </button>
            </div>
          ) : (
            <div className={s.nullHero}>Все персонажи задействованы</div>
          )}
        </Form>
      )}
    </Formik>
  );
};
