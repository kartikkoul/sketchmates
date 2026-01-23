
type HexColorPickerProps = {
  value?: string;
  onChange?: (color: string) => void;
}

const HexColorPicker = ({ value, onChange }: HexColorPickerProps) => {
  return (
    <input type="color" className="cursor-pointer" value={value} onChange={(e) => onChange?.(e.target.value)} />
  )
}

export default HexColorPicker