import Container from "@mui/material/Container";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CustomContainer = ({ children }: Props) => {
  return (
    <Container
      maxWidth="xl"
      style={{ textAlign: "center", paddingTop: "10px" }}
    >
      {children}
    </Container>
  );
};
