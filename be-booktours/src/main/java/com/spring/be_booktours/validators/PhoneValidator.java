package com.spring.be_booktours.validators;

import com.spring.be_booktours.annotations.Phone;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<Phone, String> {

    private static final String PHONE_PATTERN = "^[0-9]{10}$"; // Thay đổi mẫu cho phù hợp

    @Override
    public void initialize(Phone phone) {
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null) {
            return false;
        }
        return phone.matches(PHONE_PATTERN);
    }
}
