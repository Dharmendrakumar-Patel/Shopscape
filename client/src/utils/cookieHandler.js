const cookieHandler = (cname,cvalue,expiry) => {
    const d = new Date();
    d.setTime(d.getTime() + (expiry * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export default cookieHandler;