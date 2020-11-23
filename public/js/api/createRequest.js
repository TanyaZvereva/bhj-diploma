/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = options => {
    const xhr = new XMLHttpRequest,
        formData = new FormData
    try {
        if (options.method === 'GET') {
            let str = ""
            for (const key in options.data) {
                if (str !== "") {
                    str += "&"
                }
                str += key + "=" + options.data[key]
            }
            xhr.open('GET', `${options.url}?${str}`, true)
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.responseType = 'json'
            xhr.onload = function () {
                options.callback(null, xhr.response)
            }
            xhr.send()
        } else {
            xhr.open(options.method, options.url, true)
            xhr.setRequestHeader('Accept', 'application/json')
            xhr.responseType = 'json'
            for (const key in options.data) {
                formData.append(key, options.data[key])
            }
            xhr.onload = function () {
                options.callback(null, xhr.response)
            }
            xhr.send(formData)
        };
    } catch (e) {
        // перехват сетевой ошибки
        options.callback(e)
    }
}