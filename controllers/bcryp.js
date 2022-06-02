import bCrypt from 'bCrypt'

function isValidPassword(user, password){ 
     return bCrypt.compareSync(password, user.password)
}

export {isValidPassword}