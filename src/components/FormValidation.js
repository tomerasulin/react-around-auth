import { useState } from "react";

const FormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = () => {
    setValues({});
    setErrors({});
    setIsValid(false);
  };

  return { isValid, values, errors, handleChange, resetForm };
};

export default FormValidation;
