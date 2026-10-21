function getColorMultiplier(color) {
    return color === "white" ? -1 : 1;
}
function switchColor(color) {
    return color === "white" ? "black" : "white";
}
export { getColorMultiplier, switchColor };
