type Props = {
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  name: string
}
export const Input = ({
  value,
  onChange,
  placeholder,
  name
}: Props) => {
  return (
    <input
      className=" bg-gray-500 h-8 rounded shadow px-2"
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
