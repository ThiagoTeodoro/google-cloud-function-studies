exports.helloWorld = (req, res) => {
    res.send('Essa é a minha primeira função no Google Cloud Function!');
}

exports.multipleTarget = (req, res) => {
    res.send('Essa é a minha segunda função no Google Cloud Function!');
}