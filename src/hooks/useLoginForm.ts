import { useState, FormEvent, ChangeEvent } from "react";

interface FormErrors {
  matricNumber?: string;
  password?: string;
}

export const useLoginForm = () => {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateMatricNumber = (matricNumber: string): string | undefined => {
    if (!matricNumber.trim()) {
      return "Matric number is required";
    }
    if (!/^[A-Za-z0-9/]+$/.test(matricNumber)) {
      return "Invalid matric number format";
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return undefined;
  };

  const handleMatricChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMatricNumber(e.target.value);
    if (errors.matricNumber) {
      setErrors({ ...errors, matricNumber: undefined });
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(e.target.checked);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const matricError = validateMatricNumber(matricNumber);
    const passwordError = validatePassword(password);

    if (matricError || passwordError || !acceptTerms) {
      setErrors({
        matricNumber: matricError,
        password: passwordError,
      });

      if (!acceptTerms) {
        alert("Please accept the Terms and Conditions to continue");
      }
      return;
    }

    console.log("Form submitted:", { matricNumber, password, acceptTerms });
    alert("Login successful!");
  };

  return {
    matricNumber,
    password,
    acceptTerms,
    errors,
    handleMatricChange,
    handlePasswordChange,
    handleTermsChange,
    handleSubmit,
  };
};
