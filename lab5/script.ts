const styles: Record<string, string> = {
    default: "styles/style1.css",
    dark: "styles/style2.css",
    newStyle: "styles/style3.css" 
};

let currentStyle: string = "default";

function changeStyle(styleName: string): void {
    currentStyle = styleName;
    const link = document.getElementById("theme-stylesheet") as HTMLLinkElement;
    link.href = styles[styleName];
}

function generateLinks(): void {
    const container = document.getElementById("style-links") as HTMLElement;
    for (const [key, value] of Object.entries(styles)) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = `Zmień na ${key}`;
        link.onclick = (): boolean => {
            changeStyle(key);
            return false;
        };
        container.appendChild(link);
        container.appendChild(document.createElement("br"));
    }
}
generateLinks();

// Testowy kod do sprawdzenia TypeScript
const msg: string = "Hello!";
alert(msg);
