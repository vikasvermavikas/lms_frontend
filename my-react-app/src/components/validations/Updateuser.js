function Updateuser(values) {
    let error = {};
    const email_pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;;

    // Validate email
    if (values.email === '') {
        error.email = 'Email is required df';
    }
    else if (!email_pattern.test(values.email)) {
        error.email = 'Email is invalid';
    }
    else {
        error.email = '';
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

    // Validate Aadhar
    if (values.aadhar === '') {
        error.aadhar = 'aadhar is required';
    }
    else {
        error.aadhar = '';
    }
    return error;
}

export default Updateuser;