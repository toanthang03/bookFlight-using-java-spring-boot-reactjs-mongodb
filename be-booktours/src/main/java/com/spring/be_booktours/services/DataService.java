package com.spring.be_booktours.services;

import org.springframework.stereotype.Service;
import com.spring.be_booktours.dtos.MyResponse;

@Service
public class DataService {

    public MyResponse<?> backupData(String path) {
        MyResponse<?> response = new MyResponse<>();
        String databaseName = "dbbooktours";
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "mongodump",
                    "--db",
                    databaseName,
                    "--out",
                    path);

            processBuilder.start();

            response.setStatus(200);
            response.setMessage("Sao lưu dữ liệu thành công");
        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Gặp gián đoạn trong quá trình sao lưu dữ liệu(" + ex.getMessage() + ")");
        }
        return response;
    }

    public MyResponse<?> restoreData(String path) {
        MyResponse<?> response = new MyResponse<>();
        String databaseName = "dbbooktours";
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "mongorestore",
                    "--drop", // Xóa dữ liệu cũ
                    "--db",
                    databaseName,
                    path + "\\" + databaseName);

            processBuilder.start();

            response.setStatus(200);
            response.setMessage("Phục hồi dữ liệu thành công");
        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Gặp gián đoạn trong quá trình phục hồi dữ liệu(" + ex.getMessage() + ")");
        }
        return response;
    }

    public MyResponse<?> backupCollection(String path, String collectionName) {
        MyResponse<?> response = new MyResponse<>();
        String databaseName = "dbbooktours";
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "mongodump",
                    "--db",
                    databaseName,
                    "--collection",
                    collectionName,
                    "--out",
                    path);

            processBuilder.start();

            response.setStatus(200);
            response.setMessage("Sao lưu dữ liệu thành công");
        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Gặp gián đoạn trong quá trình sao lưu dữ liệu(" + ex.getMessage() + ")");
        }
        return response;
    }

    public MyResponse<?> restoreCollection(String path, String collectionName) {
        MyResponse<?> response = new MyResponse<>();
        String databaseName = "dbbooktours";
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "mongorestore",
                    "--db",
                    databaseName,
                    "--collection",
                    collectionName,
                    path + "\\" + databaseName + "\\" + collectionName + ".bson");

            processBuilder.start();

            response.setStatus(200);
            response.setMessage("Phục hồi dữ liệu thành công");
        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Gặp gián đoạn trong quá trình phục hồi dữ liệu(" + ex.getMessage() + ")");
        }
        return response;
    }

}
