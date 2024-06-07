const infokey = 'hm_key'

const hiskey = 'hiskey'
    //userifo持久化
function getinfo() {
    const default_obj = { userId: '', token: '' }
    const result = localStorage.getItem(infokey)
    return result ? JSON.parse(result) : default_obj
}

function setinfo(obj) {
    localStorage.setItem(infokey, JSON.stringify(obj))
}

function delinfo() {
    localStorage.removeItem(infokey)
}


//历史记录持久化
function gethis() {
    const result = localStorage.getItem(hiskey)
    return result ? JSON.parse(result) : []
}

function sethis(arr) {
    localStorage.setItem(hiskey, JSON.stringify(arr))
}

function delhis() {

}

export { getinfo, setinfo, delinfo, gethis, sethis }