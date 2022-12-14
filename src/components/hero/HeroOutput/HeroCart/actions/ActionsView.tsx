import s from "../HeroCart.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ActionsViewTypes {
  deleteItem: boolean;
  deleteCart: () => void;
  setDeleteItem: (n: boolean) => void;
}

export const ActionsView = ({ deleteItem, deleteCart, setDeleteItem }: ActionsViewTypes) => {
  return (
    <div className={s.buttons}>
      <button>История изменений</button>
      {!deleteItem ? (
        <button onClick={() => setDeleteItem(true)}>
          <FontAwesomeIcon icon={faTrash as IconProp} />
        </button>
      ) : (
        <div className={s.buttonsDelete}>
          <button onClick={() => deleteCart()}>
            <FontAwesomeIcon icon={faCheck as IconProp} />
          </button>
          <button onClick={() => setDeleteItem(false)}>
            <FontAwesomeIcon icon={faXmark as IconProp} />
          </button>
        </div>
      )}
    </div>
  );
};
