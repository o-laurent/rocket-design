var names 
updateNames()

async function updateNames() {
    names = await getNames()
    fillRocketSelector('rocketSelectorL')
    fillRocketSelector('rocketSelectorR')
}
