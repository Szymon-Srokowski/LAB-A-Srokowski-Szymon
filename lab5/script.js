"use strict";
const styles = {
    default: "styles/style1.css",
    dark: "styles/style2.css"
};
let currentStyle = "default";
function changeStyle(styleName) {
    currentStyle = styleName;
    const link = document.getElementById("theme-stylesheet");
    link.href = styles[styleName];
}
function generateLinks() {
    const container = document.getElementById("style-links");
    for (const [key, value] of Object.entries(styles)) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `Zmień na ${key}`;
        link.onclick = () => {
            changeStyle(key);
            return false; // Zapobiega przeładowaniu strony
        };
        container.appendChild(link);
        container.appendChild(document.createElement("br"));
    }
}
generateLinks();
