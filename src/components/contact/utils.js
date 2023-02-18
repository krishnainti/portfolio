export const validateForm = (form) => {
  let errors = {};

  if (!form.name) {
    errors.name = "Enter your name";
  }

  if (!form.email) {
    errors.email = "Enter your email";
  } else if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter valid email";
  }
  if (!form.subject) {
    errors.subject = "Enter subject";
  }

  if (!form.message) {
    errors.message = "Enter message";
  }

  return { errors, isValid: !Boolean(Object.keys(errors).length) };
};
