"use client";

import { ColorBtn } from "@/types";
import { Popconfirm } from "@/components/ui/Popconfirm";
import IconButton from "@mui/material/IconButton";
import { ReactNode } from "react";

export type Action<T> = {
  key: string;
  icon: ReactNode;
  color: ColorBtn;
  onClick: (entity: T) => void;
  confirm?: { title: string; description: string };
  hide?: boolean;
};

type Props<T> = {
  entity: T;
  actions: Action<T>[];
};

export const TableActionsBtn = <T,>({ entity, actions }: Props<T>) => {
  return actions.map((action) =>
    action.hide ? null : action.confirm ? (
      <Popconfirm
        key={action.key}
        title={action.confirm.title}
        description={action.confirm.description}
        onConfirm={() => action.onClick(entity)}
      >
        <IconButton color={action.color || "primary"}>{action.icon}</IconButton>
      </Popconfirm>
    ) : (
      <IconButton
        key={action.key}
        color={action.color || "primary"}
        onClick={() => action.onClick(entity)}
      >
        {action.icon}
      </IconButton>
    )
  );
};
