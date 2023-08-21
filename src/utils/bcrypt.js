import bcrypt from 'bcryptjs';
const salt =  bcrypt.genSaltSync(10);

export const hashPassword = (plantPassword) => {
    return bcrypt.hashSync(plantPassword,salt);
}

export const comparePassoword = (plainPassword, hashPassword) =>{
    return bcrypt.compareSync(plainPassword, hashPassword)
}
