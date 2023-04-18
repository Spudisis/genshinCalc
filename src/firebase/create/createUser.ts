export const CreateUser = ({ uid, firestore }: any) => {
  firestore.collection("userStore").doc(uid).set({ store: {}, primogems: {}, synchro: {}, privilege: "user" });
};
