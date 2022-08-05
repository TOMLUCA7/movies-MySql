import express from 'express';
import bcryptjs from 'bcryptjs'; // הצפנה סיסמה
import jwt from 'jsonwebtoken';
import user from '../models/user.js';
import account from '../models/user.js';

const router = express.Router();


// יצירת משתמש חדש
router.post('/register', async(request,response) => {
    // לקבל את המידע של המשתמש
    const { firstname, lastname, email, password } = request.body;

    // שלח קוד אימות
    const code = generateRandomInteger(1111,9999);

    // לבדוק האם המשתמש קיים בdb    מהמודל                 
    user.findAll({where: {email: email}})
    .then(async accounts => {
       if(accounts.length > 0){
            return response.status(200).json({
                status: false,
                massage: 'account not valid'
            });
        } else {
         // הצפנה של הסיסמה 
         const hash_passwors = await bcryptjs.hash(password,10);
        
            // שמירת המשתמש בdb
            user.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hash_passwors,
                passcode: code,
                isApproved: false
            })
            .then(account_create => {
                return response.status(200).json({
                    status: true,
                    massage: account_create
                })
            })
            .catch(error => {
                return response.status(500).json({
                    massage: error.massage
                });
            })
        }
    })
});

// כניסה של המשתמש
router.post('/login', async(request,response) => {
    const { email,password } = request.body;
    user.findAll({where: {email: email}})
    .then(async account => {
        if(account.length > 0){
            const acc = account[0]
            console.log(acc);
            const ispasswordmatch = await bcryptjs.compare(password,acc.password);
            if (ispasswordmatch) {
               if(acc.isApproved){
                const data = {
                    firsname: acc.firsname,
                    lastname: acc.lastname,
                    id: acc.id,
                    email: acc.email
                }
                const token = await jwt.sign(data, 'vzAAtMoDXt');

                return response.status(200).json({
                    status: true,
                    massage: token
                })
               } else {
                    return response.status(200).json({
                        status: false,
                        massage: 'account not confirmed'
                    })
               }
            } else {
                return response.status(200).json({
                    status: false,
                    massage: 'password not match'
                })
            }
        } else {
            return response.status(200).json({
                status: false,
                massage: 'account not exist'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
    
})

// אישור משתמש
router.put('/verify', async(request,response) => {
    
    const {email, passcode} = request.body;

    user.findAll(({where: {email: email}}))
    .then(accounts => {
        if(accounts.length > 0){
            const acc = accounts[0]
            if(parseInt(passcode) === parseInt(acc.passcode)){
                acc.isApproved = true;
                acc.save()
                .then(account_updated => {
                    return response.status(200).json({
                        status: true,
                        massage: account_updated
                    })
                })
                .catch(error => {
                    return response.status(500).json({
                        status: false,
                        massage: error.massage
                    })
                })
            } else {
                return response.status(200).json({
                    status: false,
                    massage: 'passcode not match, please try again'
                })
            }
        } else {
            return response.status(200).json({
                status: false,
                massage: 'account not exist'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
})

router.get('/allusers', async(request,response) => {
    user.findAll()
    .then(result => {
        return response.status(200).json({
            users: result
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
})

router.get('/getUserById/:userid', async(request,response) => {
    
    const id = request.params.userid;
    
    user.findByPk(id)
    .then(account => {
        return response.status(200).json({
            status: true,
            account: account
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
});

router.get('/getUserByParam/:Param', async(request,response) => {
    
    const userparam = request.params.Param;
    
    user.findAll({where: {isApproved: userparam}})
    .then(results => {
        return response.status(200).json({
            status: true,
            results: results
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })
});


router.put('/UpdateUserById', async(request,response) => {
    
    const { id, firstname, lastname, email, password } = request.body;

    user.findByPk(id)
    .then(async account => {

        account.firsname = firstname
        account.lastname = lastname
        account.save()

        .then(updateuser => {
            return response.status(200).json({
                status: true,
                updateuser: updateuser
            })
        })
        .catch(error => {
            return response.status(500).json({
                status: false,
                massage: error.massage
            })
        })
        
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })

});

router.delete('/DeleteUserById/:deletuser', async(request,response) => {
    
    const deletid = request.params.deletuser

    user.findByPk(deletid)
    .then(account => {
        account.destroy();
        return response.status(200).json({
            status: true,
            account: account
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            massage: error.massage
        })
    })

});

// פונקציה שנותנת מספר רנדומלי
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;