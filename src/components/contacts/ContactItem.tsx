import { ReactNode } from "react";
import { Typography, Stack, Box, Link } from "@mui/material";

type Props = {
  icon: ReactNode;
  link: string;
  title: string;
  text: string;
};

export const ContactItem = ({ icon, link, title, text }: Props) => {
  return (
    <Stack direction="row" alignItems="center">
      {icon}

      <Box>
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        {link ? (
          <Link
            href={link}
            underline="none"
            color="text.secondary"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            {text}
          </Link>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
