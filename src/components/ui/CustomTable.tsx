"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { Action, TableActionsBtn } from "./TableActionsBtn";

export interface Column<T> {
  id: keyof T;
  label: string;
}

interface Props<T extends { id: number }> {
  columns: Column<T>[];
  items: T[];
  actions?: Action<T>[];
}

export const CustomTable = <T extends { id: number }>({
  columns,
  items,
  actions,
}: Props<T>) => {
  const t = useTranslations("paginatedTable");

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)}>{column.label}</TableCell>
              ))}
              <TableCell align="center">{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      {row[column.id] as ReactNode}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center">
                      <TableActionsBtn<T> entity={row} actions={actions} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  {t("noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
