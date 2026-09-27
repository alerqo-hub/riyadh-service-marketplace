export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ProviderProfileData {
  serviceCategory: string;
  licenseNumber: string;
  yearsExperience: number;
  bio: string;
  bankAccount: string;
}
