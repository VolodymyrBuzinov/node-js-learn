import z from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

export const emailValidation = () =>
  z.email({ error: "Please enter a valid email address." });

export const passwordValidation = () => {
  return z
    .string()
    .min(MIN_PASSWORD_LENGTH, {
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
    })
    .max(MAX_PASSWORD_LENGTH, {
      error: `Password must be less than ${MAX_PASSWORD_LENGTH} characters.`,
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}<>\\|;:'",.?/~`_+=-]).{8,}$/,
      {
        error: `Incorrect password format.`,
      }
    );
};

export const loginAuthValidator = z.object({
  email: emailValidation(),
  password: passwordValidation(),
});
