function Validation(values) {
    let error = {}
    const email_pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate email
    if (values.email === '') {
        error.email = 'Email is required';
    }
    else if (!email_pattern.test(values.email)) {
        error.email = 'Email is invalid';
    }
    else {
        error.email = '';
    }

    // Validate password
    if (values.password === '') {
        error.password = 'Password is required';
    }
    else if (!password_pattern.test(values.password)) {
        error.password = 'Password is invalid';
    }
    else {
        error.password = '';
    }

    // Validate first name
    if (values.first_name === '') {
        error.first_name = 'First name is required';
    }
    else {
        error.first_name = '';
    }

    // Validate last name
    if (values.last_name === '') {
        error.last_name = 'Last name is required';
    }
    else {
        error.last_name = '';
    }

    // Validate username
    if (values.username === '') {
        error.username = 'Username is required';
    }
    else {
        error.username = '';
    }
    // Validate mobile
    if (values.mobile === '') {
        error.mobile = 'Mobile No. is required';
    }
    else {
        error.mobile = '';
    }

    // Validate gender
    if (values.gender === '') {
        error.gender = 'Gender is required';
    }
    else {
        error.gender = '';
    }
    return error;
}

export default Validation;