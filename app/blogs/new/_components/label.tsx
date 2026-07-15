interface IProps {
  label: string;
  defaultValue: string;
}

export default function Label({ label, defaultValue }: IProps) {
  return (
    <div className="my-1">
      <label className="flex items-center">
        <span
          style={{ textTransform: "capitalize", marginRight: 10 }}
          className="w-1/7"
        >
          {label}:
        </span>
        <input
          type="text"
          name={label}
          required
          defaultValue={defaultValue}
          className="grow bg-gray-200 rounded-md px-4 py-2"
        />
      </label>
    </div>
  );
}
