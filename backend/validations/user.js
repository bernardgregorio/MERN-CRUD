const requiredUserSchema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isLength: {
      options: { min: 4, max: 15 },
      errorMessage: "Name must be between 4 and 15 characters",
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Password must be between 4 and 15 characters",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be a valid email",
    },
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
  },
};

const updateUserSchema = {
  username: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Username should be a string",
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
  },
  password: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Password should be a string",
  },
  email: {
    in: ["body"],
    optional: true,
    isEmail: true,
    errorMessage: "Email should be a valid email address",
  },
  status: {
    in: ["body"],
    optional: true,
    isString: true,
    errorMessage: "Status should be a string",
  },
  expirationDate: {
    in: ["body"],
    optional: true,
    isDate: true,
    errorMessage: "Expiration date should be a date",
    custom: {
      options: (value) => {
        const currentDate = new Date();
        const inputDate = new Date(value);
        return inputDate >= currentDate;
      },
      errorMessage: "Expiration date must be a current or future date",
    },
  },
};

export { requiredUserSchema, updateUserSchema };
