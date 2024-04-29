export const validateLoginSignUpfields = (email, password, name) => {
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );

  if (name) {
    const isNameValid = /^[a-zA-Z ]+$/.test(name);
    if (!isNameValid) return "User name is not valid";
  }

  if (!isValidEmail) return "Email is not valid";
  if (!isPasswordValid) return "Password is not valid";
  return null;
};
