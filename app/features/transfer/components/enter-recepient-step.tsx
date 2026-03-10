import { useTransferWorkflowStore } from '@/store/transfer-workflow-store';
import { useTransactions } from '@/app/features/transactions/hooks';
import { useAccountStore } from '@/store/account-store';
import AccountSourceCard from './account-source-card';
import RecepientsAccountInput from './recepients-account-input';
import RecepientReviewCard from './recepient-preview-card';
import RecentTransfers from './recent-transfers';

export default function EnterRecepientStep() {
  const data = useTransferWorkflowStore((s) => s.data);
  const recepientVerificationStatus = useTransferWorkflowStore(
    (s) => s.recepientVerificationStatus,
  );
  const updateRecipientAccount = useTransferWorkflowStore(
    (s) => s.updateRecipientAccount,
  );
  const updateVerificationStatus = useTransferWorkflowStore(
    (s) => s.updateVerificationStatus,
  );
  const handleSelectRecepient = useTransferWorkflowStore(
    (s) => s.handleSelectRecepient,
  );

  const currentAccount = useAccountStore((state) => state.currentAccount);
  const { data: transactionsData } = useTransactions({
    accountId: currentAccount?.id,
  });

  const recentTransfers =
    transactionsData?.transactions
      ?.filter(
        (tx) =>
          tx.transactionType === 'TRANSFER' &&
          tx.sourceAccountId === currentAccount?.id,
      )
      ?.slice(0, 4) ?? [];
  return (
    <>
      <AccountSourceCard />
      <div className="flex flex-col gap-4">
        <RecepientsAccountInput
          initialValue={data?.destinationAccountNumber ?? ''}
          onChange={(value) => updateRecipientAccount(value)}
        />
        {(recepientVerificationStatus.error ||
          recepientVerificationStatus.success) && (
          <RecepientReviewCard
            variant={recepientVerificationStatus.success ? 'success' : 'error'}
            onConfirm={handleSelectRecepient}
            onChange={() => {
              updateVerificationStatus(false, false);
            }}
            recepient={data.recepient}
          />
        )}
      </div>
      <RecentTransfers
        onSelect={handleSelectRecepient}
        recentTransfers={recentTransfers}
      />
    </>
  );
}
