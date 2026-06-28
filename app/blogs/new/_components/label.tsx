interface IProps {
  label: string,
}

export default function Label({label}: IProps) {
  return (
    <div>
      <label>
        <span style={{textTransform: "capitalize", marginRight: 10}}>
          {label}:
        </span>
        <input type="text" name={label} required />
      </label>
    </div>
  )
}