import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) {
      router.push("/sign-in");
    } else {
      // Handle logout failure, e.g., show an error message
      console.error("Logout failed");
    }
  };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-xl truncate font-semibold text-gray-600">
          {user.firstName}
        </h1>
        <p className="text-sm font-normal truncate text-gray-500">
          {user.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogout}>
        <Image src="icons/logout.svg" fill alt="favo" />
      </div>
    </footer>
  );
};

export default Footer;
