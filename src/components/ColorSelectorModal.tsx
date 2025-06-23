import { useRef, useState } from "react";
import "./styles/ColorSelectorModal.css";
import { PopoverPicker } from "./PopoverPicker";
import moveIcon from "../assets/move.png";
import closeIcon from "../assets/close.png";
import type { CardActionType } from "./Cards";

type CardType = "Card 1" | "Card 2" | "Primary Button" | "Secondary Button" | "Disabled Button";

interface Props {
    cardType: CardType;
    titleColor?: string;
    backgroundColor?: string;
    descriptionColor?: string;

    updateStyles?: (type: CardActionType, value: string) => void;
    close: () => void;
    fields: string[];

    buttonColor?: string;
    buttonTextColor?: string;
    updateButtonState?: (type: string, val: string) => void
}


export default function ColorSelectorModal(props: Props) {
    const { cardType,
        close,
        titleColor = "#fff",
        backgroundColor = "#fff",
        descriptionColor = "#fff",
        updateStyles,
        fields,
        buttonColor = "blue",
        buttonTextColor = "white",
        updateButtonState
    } = props;

    const modalRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [title, setTitle] = useState(titleColor);
    const [background, setBackground] = useState(backgroundColor)
    const [description, setDescription] = useState(descriptionColor)

    const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        if (!modalRef.current) return;
        const rect = modalRef.current.getBoundingClientRect();
        setIsDragging(true);
        setOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const onDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;
        if (!modalRef.current) return;

        modalRef.current.style.left = `${e.clientX - offset.x}px`;
        modalRef.current.style.top = `${e.clientY - offset.y}px`;
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    function handleTitleColorChange(color: string) {
        if (!updateStyles) return;
        setTitle(color)
        if (cardType === "Card 1") {
            updateStyles("UPDATE_TITLE_1", color)
        } else if (cardType === "Card 2") {
            updateStyles("UPDATE_TITLE_2", color)
        }
    }

    function handleDescriptionColor(color: string) {
        if (!updateStyles) return;
        setDescription(color)
        if (cardType === "Card 1") {
            updateStyles("UPDATE_DESCRIPTION_1", color)
        } else if (cardType === "Card 2") {
            updateStyles("UPDATE_DESCRIPTION_2", color)
        }
    }

    function handleBackgroundColor(color: string) {
        handleButtonBg(color); // Handle buttons background color
        if (!updateStyles) return;
        setBackground(color)
        if (cardType === "Card 1") {
            updateStyles("UPDATE_BACKGROUND_1", color)
        } else if (cardType === "Card 2") {
            updateStyles("UPDATE_BACKGROUND_2", color)
        }
    }

    function handleButtonBg(color: string) {
        if (!updateButtonState) return;
        if (cardType === "Primary Button") {
            updateButtonState("Primary Bg", color)
        } else if (cardType === "Secondary Button") {
            updateButtonState("Secondary Bg", color)
        } else if (cardType === "Disabled Button") {
            updateButtonState("Disabled Bg", color)
        }

    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!updateStyles) return;

        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        if (cardType === "Card 1") {
            updateStyles("UPDATE_IMAGE_1", url)
        } else if (cardType === "Card 2") {
            updateStyles("UPDATE_IMAGE_2", url)
        }
    }

    function handleButtonColor(color: string) {
        if (!updateButtonState) return;
        if (cardType === "Primary Button") {
            updateButtonState("Primary Button Bg", color)
        } else if (cardType === "Secondary Button") {
            updateButtonState("Secondary Button Bg", color)
        } else if (cardType === "Disabled Button") {
            updateButtonState("Disabled Button Bg", color);
        }
    }

    function handleButtonTextColor(color: string) {
        if (!updateButtonState) return;
        if (cardType === "Primary Button") {
            updateButtonState("Primary Button Text", color)
        } else if (cardType === "Secondary Button") {
            updateButtonState("Secondary Button Text", color)
        } else if (cardType === "Disabled Button") {
            updateButtonState("Disabled Button Text", color);
        }
    }


    return (
        <div
            ref={modalRef}
            className={`popover`}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
        >
            <img className="move-icon" src={moveIcon} onMouseDown={startDrag} alt="Design System Color Preview Tool" />
            <img className="close-icon" src={closeIcon} onClick={close} alt="design component color accessibility" />
            <h3 className="color-select-title">Color selector modal</h3>
            <p className="card-type">For {cardType}</p>

            <div>
                {fields.includes("title") && <div className="input-container">
                    <label htmlFor="title">Title Color</label>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <input value={title} className="input" id="title" onChange={(e) => handleTitleColorChange(e.target.value)} />
                        <PopoverPicker color={titleColor} onChange={handleTitleColorChange} />
                    </div>
                </div>}

                {fields.includes("background") && <div className="input-container">
                    <label htmlFor="background-color">Background Color</label>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <input value={background} className="input" id="background-color" onChange={(e) => handleBackgroundColor(e.target.value)} />
                        <PopoverPicker color={backgroundColor} onChange={handleBackgroundColor} />
                    </div>
                </div>}

                {fields.includes("description") && <div className="input-container">
                    <label htmlFor="description">Description Color</label>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <input value={description} className="input" id="description" onChange={(e) => handleDescriptionColor(e.target.value)} />
                        <PopoverPicker color={descriptionColor} onChange={handleDescriptionColor} />
                    </div>
                </div>}

                {fields.includes("image") && <div className="input-container">
                    <label htmlFor="select-image">Change Image</label>
                    <input id="select-image" type="file" accept="image/*" onChange={handleImageChange} />
                </div>}

                {fields.includes("button") && <>
                    <div className="input-container">
                        <label htmlFor="button-color">Button Color</label>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <input value={buttonColor} className="input" id="button-color" onChange={(e) => handleButtonColor(e.target.value)} />
                            <PopoverPicker color={buttonColor} onChange={handleButtonColor} />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="button-text-color">Button Text Color</label>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <input value={buttonTextColor} className="input" id="button-text-color" onChange={(e) => handleButtonTextColor(e.target.value)} />
                            <PopoverPicker color={buttonTextColor} onChange={handleButtonTextColor} />
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}