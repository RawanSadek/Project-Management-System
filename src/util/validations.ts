export const REQUIRED_VALIDATION = (field_name: string) => ({
  required: `${field_name} is required!`,
});

export const EMAIL_VALIDATION = {
  required: "Email is required!",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid Email!",
  },
};

export const PASSWORD_VALIDATION = {
  required: "Password is required!",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/,
    message:
      "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
  },
};

export const PHONE_VALIDATION = {
  required: "Phone Number is required!",
  pattern: {
    value: /^\+?[0-9\s-]{9,15}$/,
    message: "Invalid phone number!!",
  },
};

export const CONFIRM_PASSWORD_VALIDATION = (password: string) => ({
  required: "Please confirm your password",
  validate: (value: string) => value === password || "Passwords must match",
});
export const OTP_VALIDATION = {
  required: "OTP is required!",
  pattern: {
    value: /^[0-9]{6}$/,
    message: "Invalid OTP!",
  },
};
