interface LimitExhaustProps {}

const LimitExhaust = ({}: LimitExhaustProps) => {
  return (
    <div className="border rounded-md flex flex-col gap-1 items-center justify-center mt-8 h-[34.9rem]">
      <span className="text-base font-semibold ">
        Your limit has been Exhaust!
      </span>
      <p className="text-slate-500 text-sm">
        Please retry after 24 hours from now.
      </p>
    </div>
  );
};

export default LimitExhaust;
