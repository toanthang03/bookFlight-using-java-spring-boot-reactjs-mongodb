package com.spring.be_booktours.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.be_booktours.dtos.MyResponse;
import com.spring.be_booktours.dtos.account.ChangePasswordRequest;
import com.spring.be_booktours.dtos.account.ChangeProfileRequest;
import com.spring.be_booktours.dtos.account.Contact;
import com.spring.be_booktours.dtos.account.LogRegResponse;
import com.spring.be_booktours.dtos.account.LoginRequest;
import com.spring.be_booktours.dtos.account.RegisterRequest;
import com.spring.be_booktours.entities.AppUser;
import com.spring.be_booktours.repositories.AppUserRepository;
import com.spring.be_booktours.utils.JWTUtils;

@Service
@Transactional
public class UserService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private AppUserRepository usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public MyResponse<?> Register(RegisterRequest registerRequest) {
        MyResponse<?> response = new MyResponse<>();
        try {
            // Kiểm tra xác nhận mật khẩu có khớp không
            if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
                response.setStatus(400);
                response.setMessage("Mật khẩu không khớp");
                return response;
            }

            // Kiểm tra email đã tồn tại chưa
            Optional<AppUser> user = usersRepo.findByEmail(registerRequest.getEmail());
            if (user.isPresent()) {
                response.setStatus(400);
                response.setMessage("Email đã tồn tại");
                return response;
            }
            // Kiểm tra số điện thoại đã tồn tại chưa
            Optional<AppUser> userPhone = usersRepo.findByPhone(registerRequest.getPhone());
            if (userPhone.isPresent()) {
                response.setStatus(400);
                response.setMessage("Số điện thoại đã tồn tại");
                return response;
            }

            // Tạo mới user và lưu vào db
            var ourUsers = new AppUser();
            ourUsers.setEmail(registerRequest.getEmail());
            ourUsers.setName(registerRequest.getName());
            ourUsers.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            ourUsers.setVerifiedEmail(false);
            ourUsers.setCreatedAt(new Date());
            // Set role mặc định là Customer
            ourUsers.setRoles(Set.of("ROLE_CUSTOMER"));
            AppUser appUser = new AppUser();
            appUser.setId(null);
            appUser = usersRepo.save(ourUsers);

            if (appUser.getId() != null) {
                response.setStatus(200);
                response.setMessage("Đăng kí thành công!");
            }

        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Gặp lỗi trong quá trình đăng ký(" + ex.getMessage() + ")");
        }
        return response;
    }

    public MyResponse<LogRegResponse> Login(LoginRequest loginRequest) {
        MyResponse<LogRegResponse> response = new MyResponse<>();
        try {
            LogRegResponse logRegResponse = new LogRegResponse();

            // Kiểm tra xem email có tồn tại không
            Optional<AppUser> appuser = usersRepo.findByEmail(loginRequest.getEmail());
            if (appuser.isEmpty()) {
                response.setStatus(404);
                response.setMessage("Tài khoản không tồn tại!");
                return response;
            }

            // Kiểm tra xem email và password có khớp không
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()));

            // Tạo token và refresh token
            var user = appuser.get();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Trả về kết quả đăng nhập
            response.setStatus(200);
            response.setMessage("Đăng nhập thành công!");

            logRegResponse.setToken(jwt);
            logRegResponse.setRoles(user.getRoles());
            logRegResponse.setRefreshToken(refreshToken);
            logRegResponse.setExpirationTime("Hết hạn sau: 24 giờ");
            logRegResponse.setVerifiedEmail(user.isVerifiedEmail());

            response.setData(logRegResponse);
        } catch (Exception ex) {
            response.setStatus(500);
            response.setMessage("Gặp lỗi trong quá trình đăng nhập(" + ex.getMessage() + ")");
        }
        return response;
    }

    public MyResponse<Set<String>> GetRoles(String email) {
        MyResponse<Set<String>> response = new MyResponse<>();

        // Kiểm tra xem email có tồn tại không
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        }

        response.setStatus(200);
        response.setMessage("Lấy danh sách quyền thành công!");
        response.setData(appuser.get().getRoles());

        return response;
    }

    public MyResponse<?> GrantRoles(String email, Set<String> roles) {
        MyResponse<?> response = new MyResponse<>();

        // Kiểm tra xem email có tồn tại không
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        }

        // Cập nhật quyền mới
        AppUser user = appuser.get();
        roles.add("ROLE_CUSTOMER");
        user.setRoles(roles);
        usersRepo.save(user);

        response.setStatus(200);
        response.setMessage("Cập nhật quyền thành công!");
        return response;
    }

    public MyResponse<?> VerifyEmail(String email) {
        MyResponse<?> response = new MyResponse<>();

        // Kiểm tra xem email có tồn tại không
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        }

        // Cập nhật trạng thái xác thực email
        AppUser user = appuser.get();
        user.setVerifiedEmail(true);
        usersRepo.save(user);

        response.setStatus(200);
        response.setMessage("Xác thực email thành công!");
        return response;
    }

    public MyResponse<String> createAndSendToken(String email) {
        MyResponse<String> response = new MyResponse<>();

        // Kiểm tra xem email có tồn tại không
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        }

        // Tạo mã xác thực ngẫu nhiên có 6 ký tự
        String token = String.valueOf((int) (Math.random() * 900000 + 100000));

        // Gửi mã xác thực
        emailSenderService.sendEmail(email, "Xác thực email", "Mã xác thực của bạn là: " + token);

        response.setStatus(200);
        response.setMessage("Gửi mã xác thực thành công!");
        response.setData(token);
        return response;
    }

    public MyResponse<AppUser> GetProfile(String email) {
        MyResponse<AppUser> response = new MyResponse<>();

        // Kiểm tra xem email có tồn tại không
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        }

        response.setStatus(200);
        response.setMessage("Lấy thông tin tài khoản thành công!");
        response.setData(appuser.get());
        return response;
    }

    public MyResponse<?> ChangePassword(String email, ChangePasswordRequest changePasswordRequest) {
        MyResponse<?> response = new MyResponse<>();

        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        } else {
            AppUser user = appuser.get();
            if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
                response.setStatus(400);
                response.setMessage("Mật khẩu cũ không đúng!");
                return response;
            }
            if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
                response.setStatus(400);
                response.setMessage("Mật khẩu mới không khớp!");
                return response;
            }
            // Mật khẩu mới phải khác mật khẩu cũ
            if (changePasswordRequest.getOldPassword().equals(changePasswordRequest.getNewPassword())) {
                response.setStatus(400);
                response.setMessage("Mật khẩu mới phải khác mật khẩu cũ!");
                return response;
            }
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            usersRepo.save(user);
            response.setStatus(200);
            response.setMessage("Đổi mật khẩu thành công!");
            return response;
        }
    }

    public MyResponse<?> UpdateProfile(String email, ChangeProfileRequest changeProfileRequest) {
        MyResponse<?> response = new MyResponse<>();

        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        } else {
            AppUser user = appuser.get();
            user.setName(changeProfileRequest.getName());
            user.setPhone(changeProfileRequest.getPhone());
            user.setAddress(changeProfileRequest.getAddress());
            usersRepo.save(user);
            response.setStatus(200);
            response.setMessage("Cập nhật thông tin tài khoản thành công!");
            return response;
        }
    }

    public MyResponse<List<AppUser>> GetAllUsers(String email, int page, int limit) {
        MyResponse<List<AppUser>> response = new MyResponse<>();
        Query query = new Query();
        List<AppUser> users = new ArrayList<>();
        // Loại bỏ người dùng có email là email của admin
        query.addCriteria(Criteria.where("email").ne(email));

        query.skip((long) (page - 1) * limit); // Bỏ qua một số lượng bản ghi
        query.limit(limit); // Giới hạn số bản ghi trả về
        users = mongoTemplate.find(query, AppUser.class);
        // Loại bỏ người dùng có email là email của admin
        response.setStatus(200);
        response.setMessage("Lấy danh sách tài khoản thành công!");
        response.setData(users);
        return response;
    }

    public MyResponse<Integer> CountCustomers(int days) {
        MyResponse<Integer> response = new MyResponse<>();
        LocalDate numberDaysAgo = LocalDate.now().minusDays(days);
        Date numberDaysAgoDate = Date.from(numberDaysAgo.atStartOfDay(ZoneId.systemDefault()).toInstant());

        // Xây dựng aggregation để đếm số khách hàng đăng ký trong 10 ngày qua
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("createdAt").gte(numberDaysAgoDate)),
                Aggregation.count().as("totalCustomers"));

        AggregationResults<Document> results = mongoTemplate.aggregate(aggregation, "appusers", Document.class);
        Document result = results.getUniqueMappedResult();

        if (result == null) {
            response.setStatus(200);
            response.setMessage("Không có khách hàng nào đăng ký trong " + days + " ngày qua");
            response.setData(0);
        } else {
            int totalCustomers = result.getInteger("totalCustomers");
            response.setStatus(200);
            response.setMessage("Đã có " + totalCustomers + " khách hàng đăng ký trong " + days + " ngày qua");
            response.setData(totalCustomers);
        }
        return response;
    }

    public MyResponse<Double> ReturnRate() {
        MyResponse<Double> response = new MyResponse<>();

        List<AppUser> users = usersRepo.findAll();
        // Tính toán số khách hàng đăng ký từ 2 lần trở lên
        int totalBookingGte2 = users.stream().filter(user -> user.getBookingHistories().size() >= 2).toList().size();
        // Tính toán số khách hàng chỉ đăng kí 1 lần duy nhất
        int totalBookingEq1 = users.stream().filter(user -> user.getBookingHistories().size() == 1).toList().size();
        // Tính toán tỷ lệ quay lại của khách hàng
        double returnRate = (double) totalBookingGte2 / (totalBookingGte2 + totalBookingEq1) * 100;

        response.setStatus(200);
        response.setMessage("Tính toán tỷ lệ quay lại của khách hàng thành công!");
        response.setData(returnRate);
        return response;
    }

    public MyResponse<?> Contact(Contact contact) {
        MyResponse<?> response = new MyResponse<>();
        emailSenderService.sendContact(contact);
        response.setStatus(200);
        response.setMessage("Gửi thông tin liên hệ thành công!");
        return response;
    }

    public MyResponse<?> DeleteUser(String email) {
        MyResponse<?> response = new MyResponse<>();
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        } else {
            usersRepo.delete(appuser.get());
            response.setStatus(200);
            response.setMessage("Xóa tài khoản thành công!");
            return response;
        }
    }

    public MyResponse<?> ResetPassword(String email) {
        MyResponse<?> response = new MyResponse<>();

        // Kiểm tra xem email có tồn tại không
        Optional<AppUser> appuser = usersRepo.findByEmail(email);
        if (appuser.isEmpty()) {
            response.setStatus(404);
            response.setMessage("Tài khoản không tồn tại!");
            return response;
        } else {
            // Kiểm tra xem email đã xác nhận chưa
            AppUser user = appuser.get();
            if (!user.isVerifiedEmail()) {
                response.setStatus(400);
                response.setMessage("Email chưa được xác thực, vui lòng vào phần liên hệ để được cấp lại mật khẩu!");
                return response;
            }
        }
        // Tạo mật khẩu mới ngẫu nhiên và gửi mail
        // Tạo mật khẩu có 20 kí tự chữ hoặc số ngẫu nhiên

        String newPassword = "";
        for (int i = 0; i < 20; i++) {
            newPassword += (char) ((int) (Math.random() * 26) + 97);
        }
        emailSenderService.sendResetPasswordEmail(email, newPassword);

        // Cập nhật mật khẩu mới vào db
        AppUser user = appuser.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        usersRepo.save(user);
        
        response.setStatus(200);
        response.setMessage("Gửi email cấp lại mật khẩu thành công!");
        return response;
    }

}
