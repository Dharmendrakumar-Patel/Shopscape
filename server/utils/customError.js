class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
    
    logError = () => {
        console.log(`Error Message: ${this.message}`);
        console.log(`Status Code: ${this.status}`);
        return;
    };
}

module.exports = CustomError;