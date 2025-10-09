"use client";

import { selectStatusPendingInMethods } from "@/redux/common/loaderSelectors";

import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export const Loader = () => {
  const isLoading = useSelector(selectStatusPendingInMethods);
  return (
    <Stack
      sx={{
        width: "100%",
        height: "4px",
        zIndex: 10000,
        top: 0,
        left: 0,
      }}
    >
      {isLoading && <LinearProgress color="primary" sx={{ height: "4px" }} />}
    </Stack>
  );
};
