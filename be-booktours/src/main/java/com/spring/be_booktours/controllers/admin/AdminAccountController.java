package com.spring.be_booktours.controllers.admin;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.services.UserService;


@RestController
@RequestMapping("/api/v1/admin/account")
@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
public class AdminAccountController {

    @Autowired
    private UserService userService;


    @PutMapping("/roles/{email}")
    public ResponseEntity<?> grantRoles(@PathVariable String email, @RequestBody Set<String> roles) {
        return ResponseEntity.ok(userService.GrantRoles(email, roles));
    }

    @GetMapping("/get-all-users")
    public ResponseEntity<?> getAllUsers(@RequestParam(defaultValue = "1", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int limit) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(userService.GetAllUsers(email, page, limit));
    }

    // Xóa tài khoản
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.DeleteUser(email));
    }

    // Đếm số khách hàng đã đăng ký trong n ngày gần nhất
    @GetMapping("/count-customers")
    public ResponseEntity<?> countCustomers(@RequestParam(defaultValue = "7", required = false) int days) {
        return ResponseEntity.ok(userService.CountCustomers(days));
    }
    
    // Tính toán tỷ lệ quay lại của khách hàng
    @GetMapping("/return-rate")
    public ResponseEntity<?> returnRate() {
        return ResponseEntity.ok(userService.ReturnRate());
    }

}
