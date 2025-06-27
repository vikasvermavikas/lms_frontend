class customFunctions {
    
    // Get token.
    static get_token = () => {
        return localStorage.getItem('TOKEN');
    }

    // Get user.
    static get_current_user = () => {
        return JSON.parse(localStorage.getItem('USER'));
    }
}

export default customFunctions;