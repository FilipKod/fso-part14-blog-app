interface IProps {
  label: string;
  defaultValue: string;
}

export default function Label({ label, defaultValue }: IProps) {
  return (
    <div>
      <label>
        <span style={{ textTransform: "capitalize", marginRight: 10 }}>
          {label}:
        </span>
        <input type="text" name={label} required defaultValue={defaultValue} />
      </label>
    </div>
  );
}
