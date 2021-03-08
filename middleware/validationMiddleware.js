const Joi = require('joi');

// validate user register input
exports.registerValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    }),
    password: Joi.string()
        .min(5)
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
        .required(),
    role: Joi.string().alphanum().min(3).max(30).required(),
  });
  const {error} = schema.validate(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  next();
};

// Validate user login input
exports.loginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  next();
};

// Validate change password input
exports.changePasswordValidate = (req, res, next) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(5)
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
    newPassword: Joi.string().min(5)
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  next();
};

// Validate change password input
exports.createNoteValidate = (req, res, next) => {
  const schema = Joi.object({
    text: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  next();
};
