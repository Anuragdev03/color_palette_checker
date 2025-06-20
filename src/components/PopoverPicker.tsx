import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useOutsideClick";

export const PopoverPicker = ({ color, onChange }: {color: string; onChange: (str: string) => void}) => {
  const popover = useRef<HTMLDivElement | null>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker" onMouseMove={e => e.preventDefault()}>
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(!isOpen)}
      />

      {isOpen && (
        <div className="color-popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};