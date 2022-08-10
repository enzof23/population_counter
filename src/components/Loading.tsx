import { SpringSpinner } from "react-epic-spinners";

export const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-10 items-center justify-center">
      <SpringSpinner color="green" />
      <p className={`text-center px-5`}>
        "That's a hell lot of people to count! Please wait one more second..."
      </p>
    </div>
  );
};
