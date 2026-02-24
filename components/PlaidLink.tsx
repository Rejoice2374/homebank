import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";
import {
  exchangePublicToken,
  createLinkToken,
} from "../lib/actions/user.actions"; // adjust the path based on your project structure

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      console.log("Link Token Data:", data);

      if (data?.LinkToken) {
        setToken(data.LinkToken);
      }
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
    },
    [user, router],
  );

  const config: PlaidLinkOptions = {
    token: token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  console.log("token created:", token);
  console.log("Plaid Link Ready:", ready);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready || !token}
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank</Button>
      ) : (
        <Button></Button>
      )}
    </>
  );
};

export default PlaidLink;
