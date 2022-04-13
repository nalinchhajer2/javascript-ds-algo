let logIndex = 0
export function startLog() {
    let startTime = performance.now()
    let lastTime = startTime
    logIndex++
    let index = logIndex
    console.log('>>>>> Starting log ', index)

    const addLog = function (message = '') {
        console.log(index, message, performance.now() - lastTime)
        lastTime = performance.now()
    }

    const endLog = function (message = '') {
        addLog(message)
        console.log('<<<< Ending log ', index, performance.now() - startTime)
        startTime = 0
        logIndex--
    }

    return {
        addLog,
        endLog,
    }
}
