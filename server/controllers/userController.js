const Users = require('../models/users');
const transporter = require('../config/mail');


const userlist = (req, res) => {

    Users.findAll(function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const userdata = (req, res) => {

    const id = req.params.id;
    Users.findById(id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const update_user = (req, res) => {

    const id = req.params.id;
    let data = new Users(req.body);
    Users.update(data, id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const delete_user = (req, res) => {
    const id = req.params.id;
    Users.delete(id, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const add_user = (req, res) => {

    let data = new Users(req.body);

    Users.create(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {

            const htmlmessage = `<b>Hi ${data.username}, </b> <p>Welcome to LMS,</p><p>You are successfully registered in LMS</p><p>Your Credentials are given below</p><p>Email id : ${data.email} </p><p>Password : ${data.password}</p><p>Thanks & Regards</p><p>Vikas Verma (CEO)</p>`;

            const mailOptions = {
                from: 'noreply@gmail.com',
                to: data.email,
                subject: 'Credentials for login in LMS',
                html: htmlmessage
            };
            // Verify connection configuration.
            transporter.verify(function (error, success) {
                if (error) {
                    console.log('Connection error:', error);
                } else {
                    // Send the email
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send(results);
                        }
                    });
                }
            });

        }
    })
};
const search = (req, res) => {
    let searchvalue = req.query.search;

    Users.search(searchvalue, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const is_valid = async (id) => {
    try {
        const result = await Users.findId(id);
        return result.length > 0 ? true : false;
    } catch (err) {
        return false;
    }
};

const updateprofile = async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    let data = req.body;
    Users.updateProfile(data, id, file, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};

const get_total_users = (req, res) => {
    Users.getTotalUsers(function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    })
};
const sendotp = (req, res) => {
    const otp = Math.floor(1000 + Math.random() * 9000);  // Get 4 digit random number
    const id = req.body.id;
    const name = req.body.name;
    const receivermail = req.body.to;
    Users.sendotp(otp, id, function (err, results) {
        if (err) {
            res.send(err);
        }
        else {
            const htmlmessage = `<b>Hi ${name}, </b> <p>Your OTP for update profile is : ${otp}</p><p>This OTP is valid for 5 minutes.</p><p>Thanks & Regards</p><p>Vikas Verma (CEO)</p>`;

            const mailOptions = {
                from: 'noreply@gmail.com',
                to: receivermail,
                subject: 'OTP for update profile in LMS',
                html: htmlmessage
            };
            // Verify connection configuration.
            transporter.verify(function (error, success) {
                if (error) {
                    console.log('Connection error:', error);
                } else {
                    // Send the email
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send(results);
                        }
                    });
                }
            });
        }
    })

};

const validateOtp = (req, res) => {
    const data = req.body;
    Users.validateOtp(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
};

const getallrecord = (req, res) => {
    const data = req.body;
    Users.getallrecord(data, function (err, results) {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
};
module.exports = {
    userlist,
    userdata,
    update_user,
    delete_user,
    add_user,
    search,
    is_valid,
    updateprofile,
    get_total_users,
    sendotp,
    validateOtp,
    getallrecord
};