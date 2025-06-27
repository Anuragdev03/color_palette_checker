import { useState } from "react"
import "./styles/contrastTracker.css"
import { PopoverPicker } from "./PopoverPicker";

export default function ContrastChecker() {
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");
    const [contrastRatio, setContrastRatio] = useState(0)

    const handleColor1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor1(e.target.value)
    }

    const handleColor2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor2(e.target.value)
    }


    function hexToRgb(hex: string): [number, number, number] {
        const cleanHex = hex.replace('#', '');
        const bigint = parseInt(cleanHex, 16);

        if (cleanHex.length !== 6 || isNaN(bigint)) {
            throw new Error("Invalid hex color");
        }

        return [
            (bigint >> 16) & 255, // R
            (bigint >> 8) & 255,  // G
            bigint & 255          // B
        ];
    }

    function getLuminance([r, g, b]: [number, number, number]): number {
        const toLinear = (channel: number) => {
            const sRGB = channel / 255;
            return sRGB <= 0.03928
                ? sRGB / 12.92
                : Math.pow((sRGB + 0.055) / 1.055, 2.4);
        };

        const R = toLinear(r);
        const G = toLinear(g);
        const B = toLinear(b);

        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    const getContrastRatio = (hex1: string, hex2: string): number => {
        const lum1 = getLuminance(hexToRgb(hex1));
        const lum2 = getLuminance(hexToRgb(hex2));

        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);

        return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
    }

    function handleCheck() {
        if (!color1) return;
        if (!color2) return;
        let res = getContrastRatio(color1, color2);
        setContrastRatio(res);
    }

    const data = [
        { ratio: '7:1 or more', level: 'AAA compliant' },
        { ratio: '4.5:1 or more', level: 'AA compliant for normal text' },
        { ratio: '3:1 or more', level: 'AA compliant for large text' },
        { ratio: 'Less than 3:1', level: 'Fails accessibility' },
    ];

    const handleColor1Change = (color: string) => {
        setColor1(color)
    }

    const handleColor2Change = (color: string) => {
        setColor2(color);
    }


    let contrastColor = contrastRatio > 7.1 ? "green" : contrastRatio > 4.5 ? "orange" : contrastRatio > 3.1 ? "#da8601" : "red"
    return (
        <div className="cards-container">
            <h4 className="title">WCAG Color Contrast Checker</h4>

            <div className="contrast-checker-box">
                <div className="c-inputs">
                    <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <input id="color-1" value={color1} className="input" placeholder="Color 1(Hex)" onChange={handleColor1} />
                        <PopoverPicker color={color1} onChange={handleColor1Change} />
                    </div>
                    <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <input id="color-2" value={color2} className="input" placeholder="Color 2(Hex)" onChange={handleColor2} />
                        <PopoverPicker color={color2} onChange={handleColor2Change} />
                    </div>
                </div>
                <div className="check-button">
                    <button className="button primary" onClick={handleCheck}>Check</button>
                </div>

                <p className="hex-info">(Hex code length should be 6)</p>

                <h4 style={{ textAlign: "center" }}>Contrast Ratio</h4>
                <h4 style={{ textAlign: "center", color: contrastColor }}>{contrastRatio} : 1</h4>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th className="thStyle">Contrast Ratio</th>
                            <th className="thStyle">Accessibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx} style={{ backgroundColor: idx % 2 ? '#f9f9f9' : 'white' }}>
                                <td className="tdStyle">{row.ratio}</td>
                                <td className="tdStyle">{row.level}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}