const fs = require("fs")

// Used for getting files from a directory with a certain extension

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

module.exports = {
    getFiles
}