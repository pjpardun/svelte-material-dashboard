let dbConfig = function() {
    return {
        driver: 'msnodesqlv8',
        server: 'cockapooserver',
        port: 1000,
        database: 'cockapoo',
        options: {
            trustedConnection: true,
            enableArithAbort: false
        }
    }
}
exports.get = dbConfig

