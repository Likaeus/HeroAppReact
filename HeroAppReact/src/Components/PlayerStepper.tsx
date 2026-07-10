interface Props { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number }

const PlayerStepper = ({ label, value, onChange, min = 1, max = 20 }: Props) => <div className="player-stepper">
  <span>{label}</span><div><button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Reducir ${label.toLowerCase()}`}>−</button><strong>{value}<small> aventureros</small></strong><button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Aumentar ${label.toLowerCase()}`}>＋</button></div>
</div>;

export default PlayerStepper;
