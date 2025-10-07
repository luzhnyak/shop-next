"use client";

import { Add, Done, Cancel, ExitToApp } from "@mui/icons-material";

import {
  useAcceptInviteMutation,
  useAddRequestMutation,
  useCancelInviteMutation,
  useCancelRequestMutation,
  useGetMembershipQuery,
  useLeaveCompanyMutation,
} from "@/redux/memberships/membershipsApi";
import { useTranslations } from "next-intl";
import { ColorBtn, MembershipStatus } from "@/types";
import { Box } from "@mui/material";
import { ActionsBtn, BtnAction } from "../ui/ActionsBtn";

type Props = {
  companyId: number;
  userId: number;
};

export const CompanyActionsBtn = ({ companyId, userId }: Props) => {
  const [addRequest, { isLoading: isLoadingAdd }] = useAddRequestMutation();
  const [cancelRequest, { isLoading: isLoadingCancel }] =
    useCancelRequestMutation();
  const [leaveCompany, { isLoading: isLoadingLeave }] =
    useLeaveCompanyMutation();
  const [acceptInvite, { isLoading: isLoadingAccept }] =
    useAcceptInviteMutation();
  const [cancelInvite, { isLoading: isLoadingCancelInvite }] =
    useCancelInviteMutation();

  const { data: membership } = useGetMembershipQuery(
    {
      companyId,
      userId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const t = useTranslations();

  const actions: BtnAction[] = [
    {
      key: "leave",
      status: MembershipStatus.MEMBER,
      color: ColorBtn.ERROR,
      icon: <ExitToApp />,
      disabled: isLoadingLeave,
      label: t("actions.btnLeave"),
      confirm: {
        title: t("dialog.leaveConfirmTitle"),
        description: t("dialog.leaveCompanyConfirmMessage"),
      },
      onClick: (membership) => leaveCompany(membership.id),
    },
    {
      key: "cancelRequest",
      status: MembershipStatus.PENDING_REQUEST,
      color: ColorBtn.ERROR,
      icon: <Cancel />,
      disabled: isLoadingCancel,
      label: t("actions.btnCancel"),
      confirm: {
        title: t("dialog.cancelConfirmTitle"),
        description: t("dialog.cancelRequestConfirmMessage"),
      },
      onClick: (membership) => cancelRequest(membership.id),
    },
    {
      key: "acceptInvite",
      status: MembershipStatus.PENDING_INVITE,
      color: ColorBtn.SECONDARY,
      icon: <Done />,
      disabled: isLoadingAccept,
      label: t("actions.btnAccept"),
      onClick: (membership) => acceptInvite(membership.id),
    },
    {
      key: "cancelInvite",
      status: MembershipStatus.PENDING_INVITE,
      color: ColorBtn.ERROR,
      icon: <Cancel />,
      disabled: isLoadingCancelInvite,
      label: t("actions.btnCancel"),
      confirm: {
        title: t("dialog.cancelConfirmTitle"),
        description: t("dialog.cancelInviteConfirmMessage"),
      },
      onClick: (membership) => cancelInvite(membership.id),
    },
    {
      key: "join",
      status: MembershipStatus.NONE,
      color: ColorBtn.PRIMARY,
      icon: <Add />,
      disabled: isLoadingAdd,
      label: t("actions.btnJoin"),
      onClick: (membership) => addRequest(membership.company_id),
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, justifyContent: "center", pt: 3 }}>
      {actions.map((action) => {
        if (action.status === membership?.status) {
          return (
            <ActionsBtn
              key={action.key}
              membership={membership}
              action={action}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};
