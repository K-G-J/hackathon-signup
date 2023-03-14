export const validateEmail = (email: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.toLowerCase()
  );
};

export const validateGithub = (github: string): boolean => {
  return github.startsWith('https://github.com/');
};

export const validateLinkedIn = (linkedIn: string): boolean => {
  return linkedIn.startsWith('https://www.linkedin.com/in/');
};

export const validateLength = (input: string): boolean => {
  return input.length >= 250 && input.length <= 500;
};
