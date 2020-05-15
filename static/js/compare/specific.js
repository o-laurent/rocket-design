//Separate file made to avoid errors
document.getElementById("zoomInput").addEventListener("input", loadNFill_R)
document.getElementById("fuelCheckbox").addEventListener("change", loadNFill_R)

updateNames()
async function updateNames() {
    names = await getNames()
    fillRocketSelector('rocketSelectorL')
    fillRocketSelector('rocketSelectorR')
}