"use client";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { Box } from "@mui/material";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  pathname?: string;
  query?: Record<string, string | number | undefined>;
}

const buildQuery = (
  query: Record<string, string | number | undefined> = {},
  page: number,
  limit: number
) => ({
  ...query,
  page: page,
  limit: limit,
});

export default function PaginationLinks({
  total,
  page,
  limit,
  pathname = "",
  query = {},
}: PaginationProps) {
  const pagesCount = Math.ceil(total / limit);
  if (pagesCount <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Stack spacing={2}>
        <Pagination
          count={pagesCount}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={{
                pathname,
                query: buildQuery(query, item.page as number, limit),
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
