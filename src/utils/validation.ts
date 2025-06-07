
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const getValidationMessage = (field: string, value: string): string => {
  if (!validateRequired(value)) {
    return `${field} is required`;
  }
  
  if (field === 'Email' && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }
  
  if (field === 'Name' && !validateName(value)) {
    return 'Name must be at least 2 characters long';
  }
  
  return '';
};
