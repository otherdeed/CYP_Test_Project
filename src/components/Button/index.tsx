type Props = {
  btnText: string;
  disabled: boolean;
  onClick?: (e:React.FormEvent) => Promise<void>;
};

export const Button = ({
  btnText,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      className={`${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} border h-8 rounded shadow px-2`}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};