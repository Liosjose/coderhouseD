import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({ 
     username: String,
     password: String
     
})


userSchema.methods.encryptPassword = (password) => {
     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
   };
   
   userSchema.methods.comparePassword= function (password) {
     return bcrypt.compareSync(password, this.password);
   };

export default mongoose.model('users', userSchema)