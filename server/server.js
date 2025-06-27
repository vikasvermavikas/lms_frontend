const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const db = require('./database');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const secretKey = 'secretkey';

// Defined controllers.
const hello_controller = require('./controllers/helloController');
const userController = require('./controllers/userController');
const auth = require('./controllers/authController');
const booksController = require('./controllers/bookController');
const guestController = require('./controllers/guestController');
const notifyController = require('./controllers/notifyController');
const subscriptionController = require('./controllers/subscriptionController');

const app = express();
app.use(session({ secret: 'Your_Secret_Key', resave: false, saveUninitialized: true }));

// Prevent XSS vulnerabilities.
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));


// Require controller modules.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage });
// Define routes.

// Define Middleware.
async function verifytoken(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], secretKey, async (err, decode) => {
            if (err) {
                return res.status(401).send('Unauthorized user');
            } else {
                req.userId = decode.id;
                req.roleId = decode.roleid;
                const isValid = await userController.is_valid(decode.id);
                if (!isValid) {
                    return res.status(401).send('Unauthorized user');
                }

                next();
            }
        });
    } else {
        return res.status(401).send('Unauthorized user');
    }
};

// ************** Define Routes **************

// ************** Manage Books **************
// Add Book.
app.post('/books/create', verifytoken, booksController.add_book);
app.get('/books/read/:search?', verifytoken, booksController.read_book);
app.get('/books/edit/:id', verifytoken, booksController.get_book);
app.put('/books/update/:id', verifytoken, booksController.update_book);
app.delete('/books/delete/:id', verifytoken, booksController.delete_book);
app.post('/books/assign/', verifytoken, booksController.assign_book);
app.get('/books/assignments/:search?', verifytoken, booksController.get_book_assignments);
app.get('/books/assignment_detail/:id', verifytoken, booksController.get_assignment_detail);
app.get('/books/is_assign/:id', verifytoken, booksController.is_assign);
app.put('/books/bookreturn/:id', verifytoken, booksController.book_return);
app.get('/books/stock/:search?', verifytoken, booksController.get_book_stock);
app.get('/books/total/categories', verifytoken, booksController.get_total_books);
app.get('/books/total/assignments', verifytoken, booksController.get_total_assignments);
app.get('/books/total/pending_assignments', verifytoken, booksController.get_total_pending_assign);
app.get('/books/getthreshold', verifytoken, booksController.get_book_threshold);
app.post('/books/updateThreshold', verifytoken, booksController.update_book_threshold);


// ************** Manage Users **************


// Get Routes
app.get("/", hello_controller);

// Do registration.
app.post('/signup', upload.single('image'), auth.usersignup);

// Do login.
app.post('/login', auth.login);

// Do Logout.
app.post('/logout', auth.logout);

// Get top notifications.
app.get('/get_top_notify', verifytoken, notifyController.get_notify);

// Get all notifications.
app.get('/user/getNotification', verifytoken, notifyController.get_all_notify);

// Get notifications count.
app.get('/user/notifications/count', verifytoken, notifyController.get_notify_count);

// ************** Manage Users **************
// Get Users.
app.get('/users', verifytoken, userController.userlist);

// Insert Users.
app.post('/users', verifytoken, userController.add_user);

// Read user.
app.get('/read/:id', verifytoken, userController.userdata);

// Update user.
app.put('/update/:id', verifytoken, userController.update_user);

// Delete user.
app.delete('/delete/:id', verifytoken, userController.delete_user);

// Get total users.
app.get('/users/count', verifytoken, userController.get_total_users);

// Search user.
app.get('/user', verifytoken, userController.search);

// Send otp.
app.post('/user/sendmail', verifytoken, userController.sendotp);

// Send otp.
app.post('/user/getallrecord', verifytoken, userController.getallrecord);

// Validate otp.
app.post('/user/validateOtp', verifytoken, userController.validateOtp);

app.put('/user/updateprofile/:id', verifytoken, upload.single('image'), userController.updateprofile);
// ************** End Manage users ************

// ************** Guest routes ****************
app.post('/guest/assignments/:search?', verifytoken, guestController.guestAssignments);
app.post('/guest/book/view', verifytoken, guestController.guestBookView);
// ************** End Guest Routes ************


// ************** Manage Subscription **************
app.post('/addSubscription', verifytoken, subscriptionController.add_subscription);
app.get('/getSubscriptions', verifytoken, subscriptionController.get_all_subscriptions);
app.post('/get_subscription', verifytoken, subscriptionController.get_subscription);
app.put('/update_subscription', verifytoken, subscriptionController.update_subscription);
app.delete('/subscription/delete/:id', verifytoken, subscriptionController.delete_subscription);

// ************** End Manage subcription **************
// Listen for changes.
app.listen(8082, () => {
    console.log('Server is running on port 8082');
});