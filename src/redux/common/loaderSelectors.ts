import { RootState } from "@/redux/store";

export const selectStatusPendingInMethods = (state: RootState) =>
  Object.values(state).some(
    (api) =>
      api &&
      "queries" in api &&
      "mutations" in api &&
      [...Object.values(api.queries), ...Object.values(api.mutations)].some(
        (method) => method?.status === "pending"
      )
  );
