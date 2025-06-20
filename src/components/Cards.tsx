import "./styles/cards.css"
import settingIcon from "../assets/settings.png";
import { useReducer, useState } from "react";
import ColorSelectorModal from "./ColorSelectorModal";

export type CardActionType =
    | "UPDATE_TITLE_1"
    | "UPDATE_BACKGROUND_1"
    | "UPDATE_DESCRIPTION_1"
    | "UPDATE_TITLE_2"
    | "UPDATE_BACKGROUND_2"
    | "UPDATE_DESCRIPTION_2";

interface CardAction {
    type: CardActionType;
    payload: string
}

interface CardState {
    title1: string;
    background1: string;
    description1: string;

    title2: string;
    background2: string;
    description2: string;
}

export default function Cards() {
    const [openSelector1, setOpenSelector1] = useState(false);
    const [openSelector2, setOpenSelector2] = useState(false);

    const [card, setCard] = useReducer(reducer, {
        title1: "#0d1b2a",
        background1: "#FFF",
        description1: "#0d1b2a",

        title2: "#000",
        background2: "#fff",
        description2: "#000"
    })


    function handleToggle1() {
        setOpenSelector1(!openSelector1)
    }

    function handleToggle2() {
        setOpenSelector2(!openSelector2)
    }

    function reducer(state: CardState, action: CardAction) {
        switch (action.type) {
            case "UPDATE_TITLE_1":
                return { ...state, title1: action.payload };
            case "UPDATE_BACKGROUND_1":
                return { ...state, background1: action.payload };
            case "UPDATE_DESCRIPTION_1":
                return { ...state, description1: action.payload };
            case "UPDATE_TITLE_2":
                return { ...state, title2: action.payload };
            case "UPDATE_BACKGROUND_2":
                return { ...state, background2: action.payload };
            case "UPDATE_DESCRIPTION_2":
                return { ...state, description2: action.payload };
            default:
                return state;
        }
    }

    function updateStyle(type: CardActionType, value: string) {
        setCard({ type: type, payload: value })

    }

    const Card1 = () => (
        <div className="card1" style={{ backgroundColor: card.background1 }}>
            <div>
                <div className="title-container">
                    <h3 style={{ color: card.title1 }}>Title</h3>
                    <img className="setting-icon" src={settingIcon} onClick={handleToggle1} />
                </div>
                <img className="card1-img" src="https://images.unsplash.com/vector-1744267025873-b6806f53717d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <p style={{ color: card.description1 }} className="card1-desc">Instantly Preview Color Palettes on Real UI Components</p>
            </div>
        </div>
    )

    const Card2 = () => (
        <div className="card1" style={{ backgroundColor: card.background2 }}>
            <div>
                <div className="title-container">
                    <h3 style={{ color: card.title2 }}>Title</h3>
                    <img className="setting-icon" src={settingIcon} onClick={handleToggle2} />
                </div>
                <img className="card1-img" src="https://images.unsplash.com/vector-1744267025873-b6806f53717d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <p style={{ color: card.description2 }} className="card1-desc">Instantly Preview Color Palettes on Real UI Components</p>
            </div>
        </div>
    )

    function closeModal1() {
        setOpenSelector1(false)
    }

    function closeModal2() {
        setOpenSelector2(false)
    }

    return (
        <div className="cards-container">
            <h4 className="cards-title">Cards</h4>

            <div className="cards-list">
                <Card1 />
                <p>Compare</p>
                <Card2 />
            </div>

            {openSelector1 ?
                <ColorSelectorModal
                    cardType="Card 1"
                    titleColor={card.title1}
                    descriptionColor={card.description1}
                    backgroundColor={card.background1}
                    updateStyles={updateStyle}
                    close={closeModal1}
                />
                : null}

            {openSelector2 ?
                <ColorSelectorModal
                    cardType="Card 2"
                    titleColor={card.title2}
                    descriptionColor={card.description2}
                    backgroundColor={card.background2}
                    updateStyles={updateStyle}
                    close={closeModal2}
                />
                : null}
        </div>
    )
}