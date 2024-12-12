
const DefaultTime = {
    ONE_MINUTE: new Date(Date.now() + 60 * 1000),
    ONE_HOUR: new Date(Date.now() + 60 * 60 * 1000),
    ONE_DAY: new Date(Date.now() + 60 * 60 * 24 * 1000),
    ONE_WEEK: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
}

module.exports = {DefaultTime}