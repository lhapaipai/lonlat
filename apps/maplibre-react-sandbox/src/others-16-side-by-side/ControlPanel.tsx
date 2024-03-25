import { ChangeEvent, Dispatch, SetStateAction, memo, useCallback } from "react";

export type Mode = "side-by-side" | "split-screen";

function ControlPanel({
  mode,
  onModeChange,
}: {
  mode: Mode;
  onModeChange: Dispatch<SetStateAction<Mode>>;
}) {
  const handleModeChange = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      onModeChange(evt.target.value as Mode);
    },
    [onModeChange],
  );

  return (
    <div className="control-panel">
      <h3>Side by Side</h3>
      <p>Synchronize two maps.</p>

      <div>
        <label>Mode: </label>
        <select value={mode} onChange={handleModeChange}>
          <option value="side-by-side">Side by side</option>
          <option value="split-screen">Split screen</option>
        </select>
      </div>
    </div>
  );
}

export default memo(ControlPanel);
