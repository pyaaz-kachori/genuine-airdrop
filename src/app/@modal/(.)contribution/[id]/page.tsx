import { Modal } from "./modal";
const ContributionModal = ({
  params: { id: userId },
}: {
  params: { id: string };
}) => {
  return (
    <Modal>
      <div className="w-full h-full ">
        {userId}
        {userId}
      </div>
      {/* <FullPageImageView id={idAsNumber}/> */}
    </Modal>
  );
};

export default ContributionModal;
