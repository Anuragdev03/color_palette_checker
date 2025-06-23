import "./styles/buttons.css"
import settingIcon from "../assets/settings.png";
import { useState } from "react";
import ColorSelectorModal from "./ColorSelectorModal";

export default function Buttons() {
    const [pModal, setPModal] = useState(false); // For Primary button
    const [sModal, setSModal] = useState(false); // For secondary button
    const [dModal, setDModal] = useState(false); // For Disabled button

    // BackgroundColor
    const [backgroundColor, setBackgroundColor] = useState({
        background1: "#FFF",
        background2: "#FFF",
        background3: "#FFF",
    })

    // Button Bg color
    const [buttonColor, setButtonColor] = useState({
        btnBg1: "#004085",
        btnBg2: "#6c757d",
        btnBg3: "#cccccc"
    })

    const [textColor, setTextColor] = useState({
        textColor1: "#FFF",
        textColor2: "#fff",
        textColor3: "#666666"

    })

    function handlePrimaryModal() {
        setPModal(!pModal)
    }

    function handleSecondaryModal() {
        setSModal(!sModal)
    }

    function handleDisabledModal() {
        setDModal(!dModal)
    }
    const Button1 = () => (
        <div className="button1" style={{backgroundColor: backgroundColor.background1}}>
            <div className="title-container">
                <h3>Primary</h3>
                <img className="setting-icon" src={settingIcon} onClick={handlePrimaryModal} alt="Color palette checker showing accessible button colors" />
            </div>

            <button className="button primary" style={{backgroundColor: buttonColor.btnBg1, color: textColor.textColor1}}>Primary Button</button>

        </div>
    )

    const Button2 = () => (
        <div className="button1" style={{backgroundColor: backgroundColor.background2}}>
            <div className="title-container">
                <h3>Secondary</h3>
                <img className="setting-icon" src={settingIcon} onClick={handleSecondaryModal} alt="Ensuring WCAG Compliance for Your UI Buttons" />
            </div>


            <button className="button secondary" style={{backgroundColor: buttonColor.btnBg2, color: textColor.textColor2}}>Secondary Button</button>

        </div>
    )

    const Button3 = () => (
        <div className="button1" style={{backgroundColor: backgroundColor.background3}}>
            <div className="title-container">
                <h3>Disabled</h3>
                <img className="setting-icon" src={settingIcon} onClick={handleDisabledModal} alt="Check Your UI Component Color Palettes for Accessibility" />
            </div>

            <button className="button disabled" disabled style={{backgroundColor: buttonColor.btnBg3, color: textColor.textColor3}}>Disabled Button</button>
        </div>
    )

    function updateStyle(type: string, val: string) {
        // Upgrade Background color
        if(type === "Primary Bg") {
            setBackgroundColor({...backgroundColor, background1: val})
        }

        if(type === "Secondary Bg") {
            setBackgroundColor({...backgroundColor, background2: val})
        }

        if(type === "Disabled Bg") {
            setBackgroundColor({...backgroundColor, background3: val})
        }

        // Update Button bg Color
        if(type === "Primary Button Bg") {
            setButtonColor({...buttonColor, btnBg1: val});
        }

        if(type === "Secondary Button Bg") {
            setButtonColor({...buttonColor, btnBg2: val});
        }

        if(type === "Disabled Button Bg") {
            setButtonColor({...buttonColor, btnBg3: val})
        }

        // Update Button Text Color
        if(type === "Primary Button Text") {
            setTextColor({...textColor, textColor1: val});
        }

        if(type === "Secondary Button Text") {
            setTextColor({...textColor, textColor2: val});
        }

        if(type === "Disabled Button Text") {
            setTextColor({...textColor, textColor3: val});
        }
    }

    function closeModal1() {
        setPModal(false)
    }

    function closeModal2() {
        setSModal(false)
    }

    function closeModal3() {
        setDModal(false);
    }

    return (
        <div className="buttons-container">
            <h4 className="buttons-title">Buttons</h4>

            <div className="buttons-list">
                <Button1 />

                <Button2 />

                <Button3 />

            </div>
            {pModal ?
                <ColorSelectorModal
                    cardType="Primary Button"
                    updateButtonState={updateStyle}
                    close={closeModal1}
                    fields={["button", "background"]}
                    backgroundColor={backgroundColor.background1}
                    buttonColor={buttonColor.btnBg1}
                    buttonTextColor={textColor.textColor1}
                />
                : null}

                {sModal ?
                <ColorSelectorModal
                    cardType="Secondary Button"
                    updateButtonState={updateStyle}
                    close={closeModal2}
                    fields={["button", "background"]}
                    backgroundColor={backgroundColor.background2}
                    buttonColor={buttonColor.btnBg2}
                    buttonTextColor={textColor.textColor2}
                />
                : null}

                {dModal ?
                <ColorSelectorModal
                    cardType="Disabled Button"
                    updateButtonState={updateStyle}
                    close={closeModal3}
                    fields={["button", "background"]}
                    backgroundColor={backgroundColor.background3}
                    buttonColor={buttonColor.btnBg3}
                    buttonTextColor={textColor.textColor3}
                />
                : null}

        </div>
    )
}