import { useAppDispatch } from "../../../../store/hooks";
import { addGemsItemStore, addGemsSoloHero } from "../../../../store/slices/heroes";
import { storeItem } from "../../../../store/types/items";
import { updateHero } from "../../../../api/heros";
import { FieldsView } from "./FieldsView";

type FieldsT = {
  id: number;
  hero: storeItem;
};

export const Fields = ({ hero }: FieldsT) => {
  const dispatch = useAppDispatch();

  const addPrimogems = async (id: number, valueAdd: number) => {
    await updateHero({ valueAdd, id }).then(() => dispatch(addGemsSoloHero(valueAdd)));
  };

  return (
    <>
      <FieldsView hero={hero} addPrimogems={addPrimogems} />
    </>
  );
};
