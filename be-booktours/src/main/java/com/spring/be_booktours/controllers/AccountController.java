package com.spring.be_booktours.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.dtos.account.ChangePasswordRequest;
import com.spring.be_booktours.dtos.account.ChangeProfileRequest;
import com.spring.be_booktours.dtos.account.Contact;
import com.spring.be_booktours.dtos.account.LoginRequest;
import com.spring.be_booktours.dtos.account.RegisterRequest;
import com.spring.be_booktours.services.UserService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(userService.Register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.Login(loginRequest));
    }

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_TOUR_MANAGER', 'ROLE_HOTEL_MANAGER, ROLE_FLIGHT_MANAGER')")
    public ResponseEntity<?> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.GetProfile(email));
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_TOUR_MANAGER', 'ROLE_HOTEL_MANAGER, ROLE_FLIGHT_MANAGER')")
    public ResponseEntity<?> getRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.GetRoles(email));
    }

    @GetMapping("/create-and-send")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_TOUR_MANAGER', 'ROLE_HOTEL_MANAGER, ROLE_FLIGHT_MANAGER')")
    public ResponseEntity<?> createAndSendToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.createAndSendToken(email));
    }

    @GetMapping("/verify-email")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_TOUR_MANAGER', 'ROLE_HOTEL_MANAGER, ROLE_FLIGHT_MANAGER')")
    public ResponseEntity<?> verifyEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.VerifyEmail(email));
    }

    @PostMapping("/change-password")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_TOUR_MANAGER', 'ROLE_HOTEL_MANAGER, ROLE_FLIGHT_MANAGER')")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.ChangePassword(email, changePasswordRequest));
    }

    @PutMapping("/update-profile")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_TOUR_MANAGER', 'ROLE_HOTEL_MANAGER, ROLE_FLIGHT_MANAGER')")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody ChangeProfileRequest changeProfileRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.UpdateProfile(email, changeProfileRequest));
    }

    @PostMapping("/contact")
    public ResponseEntity<?> contact(@Valid @RequestBody Contact contact) {
        return ResponseEntity.ok(userService.Contact(contact));
    }

    // Reset mật khẩu
    @GetMapping("/reset-password/{email}")
    public ResponseEntity<?> resetPassword(@Valid @Email @PathVariable String email) {
        return ResponseEntity.ok(userService.ResetPassword(email));
    }

}
