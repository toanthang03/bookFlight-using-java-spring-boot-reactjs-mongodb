package com.spring.be_booktours.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.spring.be_booktours.dtos.MyResponse;

@RestControllerAdvice
public class ValidationExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException e) {
        MyResponse<?> response = new MyResponse<>(403, "Bạn chưa xác thực hoặc chưa có quyền truy cập!", null);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> handleDateFormatError(MethodArgumentTypeMismatchException ex) {
        // Kiểm tra xem lỗi liên quan đến định dạng ngày tháng
        if (ex.getRequiredType() != null && ex.getRequiredType().equals(LocalDate.class)) {
            MyResponse<?> response = new MyResponse<>(400,
                    "Ngày tháng không đúng định dạng! Định dạng yêu cầu: yyyy-MM-dd", null);
            return ResponseEntity.badRequest().body(response);
        }
        MyResponse<?> response = new MyResponse<>(400,
                "Yêu cầu không hợp lệ: " + ex.getMessage(), null);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericException(Exception ex) {
        MyResponse<?> response = new MyResponse<>(400,
                "Đã xảy ra lỗi: " + ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
