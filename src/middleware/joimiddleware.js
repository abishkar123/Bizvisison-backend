import Joi from 'joi'
const SHORTSTR = Joi.string().max(100);
const LONGSTR = Joi.string().max(500);
const SHORTREQUIRED = Joi.string().max(100).required();
const LONGREQUIRED = Joi.string().max(500).required();
const EMAIL = Joi.string().email({ minDomainSegments: 2 });
const NUMBER = Joi.number();
const NUMREQUIRED = Joi.number().required();


const joiValidation = (schema, req, res, next) => {
    try {
      //compare
      const { error } = schema.validate(req.body);
  
      error
        ? res.json({
            status: "error",
            message: error.message,
          })
        : next();
    } catch (error) {
      next(error);
    }
  };


  // ================admin validation
export const newAdminValidation = (req, res, next) => {
    const schema = Joi.object({
     
      email: EMAIL,
      fname: SHORTREQUIRED,
      lname: SHORTREQUIRED,
      password: SHORTREQUIRED,
      phonenumber: SHORTREQUIRED,
    });
  
    joiValidation(schema, req, res, next);
  };


  export const passResetValidation = (req, res, next) => {
    const schema = Joi.object({
      email: EMAIL,
      password: SHORTSTR ,
      otp: SHORTSTR ,
    });
  
    joiValidation(schema, req, res, next);
  };