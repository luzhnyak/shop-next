import { NextResponse } from "next/server";

const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE!;
const redirectURI = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL!;

export const GET = async () => {
  const auth0Url =
    `https://${auth0Domain}/authorize?` +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectURI,
      response_type: "token",
      scope: "openid profile email",
      audience: audience,
    }).toString();

  return NextResponse.redirect(auth0Url);
};
