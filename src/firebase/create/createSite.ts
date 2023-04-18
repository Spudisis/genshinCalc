export const CreateSite = async ({ uid, firestore, obj }: any) => {
  await firestore.collection("usefulSites").doc(uid).set(obj);
};
