function Validation(values){
    let error = {}
    const email_pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate email
    if (values.email === ''){
        error.email = 'Email is required';
    }
    else if (!email_pattern.test(values.email)){
        error.email = 'Email is invalid';
    }
    else{
        error.email = '';
    }

    // Validate password
    if (values.password === ''){
        error.password = 'Password is required';
    }
    else if (!password_pattern.test(values.password)){
        error.password = 'Password is invalid';
    }
    else{
        error.password = '';
    }
    return error;
}

export default Validation;