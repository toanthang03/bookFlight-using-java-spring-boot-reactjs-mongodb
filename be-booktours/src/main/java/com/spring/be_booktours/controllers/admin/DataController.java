package com.spring.be_booktours.controllers.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.be_booktours.services.DataService;

@RestController
@RequestMapping("/api/v1/admin/data")
public class DataController {

    @Autowired
    private DataService dataService;

    @GetMapping("/backup")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> backupData() {
        return ResponseEntity.ok(dataService.backupData("D:\\backupmongodb"));
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @GetMapping("/restore")
    public ResponseEntity<?> restoreData() {
        return ResponseEntity.ok(dataService.restoreData("D:\\backupmongodb"));
    }

    @GetMapping("/backup/{collectionName}")
    public ResponseEntity<?> backupCollection(@PathVariable String collectionName) {
        return ResponseEntity.ok(dataService.backupCollection("D:\\backupmongodb", collectionName));
    }

    @GetMapping("/restore/{collectionName}")
    public ResponseEntity<?> restoreCollection(@PathVariable String collectionName) {
        return ResponseEntity.ok(dataService.restoreCollection("D:\\backupmongodb", collectionName));
    }

}
