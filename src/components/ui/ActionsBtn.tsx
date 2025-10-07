"use client";

import { ColorBtn, IMembership, MembershipStatus } from "@/types";
import { Popconfirm } from "@/components/ui/Popconfirm";
import Button from "@mui/material/Button";

export type BtnAction = {
  key: string;
  status: MembershipStatus;
  color: ColorBtn;
  icon: React.ReactNode;
  disabled: boolean;
  label: string;
  confirm?: {
    title: string;
    description: string;
  };
  onClick: (membership: IMembership) => void;
};

type Props = {
  membership: IMembership;
  action: BtnAction;
};

export const ActionsBtn = ({ membership, action }: Props) => {
  return action.confirm ? (
    <Popconfirm
      title={action.confirm.title}
      description={action.confirm.description}
      onConfirm={() => action.onClick(membership)}
    >
      <Button
        variant="contained"
        color={action.color || "primary"}
        startIcon={action.icon}
        disabled={action.disabled}
      >
        {action.label}
      </Button>
    </Popconfirm>
  ) : (
    <Button
      variant="contained"
      color={action.color || "primary"}
      startIcon={action.icon}
      disabled={action.disabled}
      onClick={() => action.onClick(membership)}
    >
      {action.label}
    </Button>
  );
};
