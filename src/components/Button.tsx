import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
  loading?: boolean;
}

export const Button = ({
  text,
  loading,
  disabled,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer w-[300px] flex items-center justify-center h-[60px] bg-zinc-950 rounded-xl ${
        disabled ? "opacity-50" : undefined
      }`}
      {...buttonProps}
      disabled={disabled}
    >
      <p className="text-white font-medium ">
        {loading ? <Loader2 className="animate-spin" /> : text}
      </p>
    </button>
  );
};
