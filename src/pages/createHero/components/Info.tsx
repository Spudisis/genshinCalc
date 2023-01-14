import s from "../../head.module.scss";

export const Info = () => {
  return (
    <div className={s.headWrapper}>
      <div className={s.head}>
        <h2>Добавить персонажа </h2>
      </div>

      <p className={s.description}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum nemo recusandae fugit dolor dolores, ipsa libero
        veritatis voluptate tenetur officia magni dolorum consequuntur tempora sequi omnis quaerat numquam. Nesciunt,
        porro?
      </p>
    </div>
  );
};
