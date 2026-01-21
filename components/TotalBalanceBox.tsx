import React from "react";
import { formatAmount } from "@/lib/utils";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks = 0,
  totalCurrentBalance = 0,
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balancechart">{/* DoughnutChart */}</div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>

          <p className="total-balance-amount">
            {formatAmount(totalCurrentBalance)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
