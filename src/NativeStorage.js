
    function setItem(key, value) {
        const message = JSON.stringify({ key, value });
        console.log("%c[handleOutgoingWrapperMessages] -> outgoing setItem: ", 'color: darkcyan', message);
        window.nativeInterface.setUserDefaultItem(message);
    }
    function getItem(key) {
        const message = JSON.stringify({ key });
        console.log("%c[handleOutgoingWrapperMessages] -> outgoing getItem: ", 'color: darkcyan', message);
        window.nativeInterface.getUserDefaultItem(message);
    }
    function removeItem(key) {
        const message = JSON.stringify({ key });
        console.log("%c[handleOutgoingWrapperMessages] -> outgoing removeItem: ", 'color: darkcyan', message);
        window.nativeInterface.removeUserDefaultItem(message);
    }



export default {
    setItem,
    getItem,
    removeItem
};