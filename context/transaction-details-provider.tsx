'use client';
import React, { createContext, useContext, useState } from 'react';

type TransactionDetailsContextType = {
  onUpdateId: (id: string) => void;
  currentId: string | null;
};
const TransactionDetailsContext =
  createContext<TransactionDetailsContextType | null>(null);
const TransactionDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentId, setCurrentId] =
    useState<TransactionDetailsContextType['currentId']>(null);
  const onUpdateId = (id: typeof currentId) => {
    setCurrentId(id);
  };
  return (
    <TransactionDetailsContext.Provider value={{ onUpdateId, currentId }}>
      {children}
    </TransactionDetailsContext.Provider>
  );
};

export const useTransactionDetails = () => {
  const values = useContext(
    TransactionDetailsContext,
  ) as TransactionDetailsContextType;
  return values;
};

export default TransactionDetailsProvider;
