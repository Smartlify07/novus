import { useTransferWorkflowStore } from '@/store/transfer-workflow-store';
import AccountSourceCard from './account-source-card';
import RecepientsAccountInput from './recepients-account-input';
import RecepientReviewCard from './recepient-preview-card';
import RecentTransfers from './recent-transfers';

export default function EnterRecepientStep() {
  const data = useTransferWorkflowStore((s) => s.data);
  const recepientVerificationStatus = useTransferWorkflowStore((s) => s.recepientVerificationStatus);
  const recentTransfers = useTransferWorkflowStore((s) => s.recentTransfers);
  const updateRecipientAccount = useTransferWorkflowStore((s) => s.updateRecipientAccount);
  const updateVerificationStatus = useTransferWorkflowStore((s) => s.updateVerificationStatus);
  const handleSelectRecepient = useTransferWorkflowStore((s) => s.handleSelectRecepient);

  return (
    <>
      <AccountSourceCard />
      <div className="flex flex-col gap-4">
        <RecepientsAccountInput
          initialValue={data.recepient?.accountNumber ?? ''}
          onChange={updateRecipientAccount}
        />
        {(recepientVerificationStatus.error ||
          recepientVerificationStatus.success) && (
          <RecepientReviewCard
            variant={
              recepientVerificationStatus.success ? 'success' : 'error'
            }
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
