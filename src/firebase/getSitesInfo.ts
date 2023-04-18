import { setSites } from "../store/slices/usefulSitesSlice";
import { checkPerson } from "../store/types/items";
import { UsefulSitesType } from "../store/types/user";
import { firestore } from "./config";

export const GetSitesInfo = async ({ dispatch }: Pick<checkPerson, "dispatch">) => {
  const store = firestore.collection("usefulSites");
  const docs = await store.get();

  const mappedData = docs.docs.map((doc) => doc.data());

  dispatch(setSites(mappedData as UsefulSitesType[]));
};
