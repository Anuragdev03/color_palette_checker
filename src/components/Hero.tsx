import "./styles/header.css";

export default function HeroSection() {
    return (
        <div style={{ width: "100%" }}>
            <h6 className="logo">Color Palette Checker</h6>

            <div className="app-desc">
                <div>
                    <p>Instantly Preview Color Palettes on Real UI Components
                        Explore and test color combinations on buttons, cards, text,
                        and more — all in one place. Design with confidence and create
                        beautiful, accessible interfaces faster.</p>

                </div>
            </div>
        </div>
    )
}