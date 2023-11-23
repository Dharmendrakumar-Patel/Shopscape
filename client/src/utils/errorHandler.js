const errorHandler = (error) => {
    var newError = error.data.replace(/<(?:.|\n)*?>/gm, '').trim().slice(15);
    console.log('%cError Type:', 'font-weight: bold; color: red', `${error.status}`)
    console.log('%cStatus Code:', 'font-weight: bold; color: red', `${error.originalStatus}`);
    console.log('%cError Message:', 'font-weight: bold; color: red', `${newError}`)
    return
};

export default errorHandler;