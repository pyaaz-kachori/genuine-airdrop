const ContributionView = (props: { id: string }) => {
  //   const contribution = await getContribution(props.id);
  return (
    <div className="flex h-full w-full min-w-0 flex-row justify-between">
      {/* {contribution.id} */}

      {props.id}
    </div>
  );
};

export default ContributionView;
