import ContributionView from "@/components/full-contribution-page";
import { Modal } from "./modal";
const ContributionModal = ({
  params: { id: userId },
}: {
  params: { id: string };
}) => {
  return (
    <Modal>
      <ContributionView id={userId} />
    </Modal>
  );
};

export default ContributionModal;
