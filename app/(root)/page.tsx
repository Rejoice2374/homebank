import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import React from "react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams;

  const id = params?.id;
  const page = params?.page;

  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();

  // Prevent build crash
  if (!loggedIn) {
    return (
      <section className="home">
        <HeaderBox
          type="greeting"
          title="Welcome"
          user="Guest"
          subtext="Please log in to view your accounts."
        />
      </section>
    );
  }

  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return null;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home no-scrollbar">
      <div className="home-content no-scrollbar">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account."
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[accounts?.transactions]}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
