
    function setItem(key, value) {
        window.nativeInterface.setUserDefaultItem(JSON.stringify({ key, value }));
    }
    function getItem(key) {
        window.nativeInterface.getUserDefaultItem(JSON.stringify({ key }))
    }
    function removeItem(key) {
        window.nativeInterface.removeUserDefaultItem(JSON.stringify({ key }))
    }



export default {
    setItem,
    getItem,
    removeItem
};