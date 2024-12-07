import ContributionView from "@/components/full-contribution-page";

const ContributionPage = ({
  params: { id: userId },
}: {
  params: { id: string };
}) => {
  return (
    <div>
      <ContributionView id={userId} />
    </div>
  );
};

export default ContributionPage;
