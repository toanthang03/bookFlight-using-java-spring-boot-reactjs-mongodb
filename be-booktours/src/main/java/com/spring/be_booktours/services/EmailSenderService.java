package com.spring.be_booktours.services;

import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.spring.be_booktours.dtos.account.Contact;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailSenderService {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

    public void sendEmail(String toEmail, String subject, String text) {
        try {
            logger.info("START... Sending email");

            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
            Context context = new Context();
            context.setVariable("email", toEmail); // Truyền tham số vào template html
            context.setVariable("code", text); // Truyền tham số vào template html
            String html = templateEngine.process("code-verify", context);

            helper.setFrom("hoan39800@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(html, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            logger.error("Error sending email: " + e.getMessage());
        }
    }

    public void sendContact(Contact contact) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(contact.getEmail());
        message.setTo("hoan39800@gmail.com");
        message.setSubject("Be Book Tours - Thông báo từ khách hàng");
        message.setText(
                "Thông báo từ khách hàng: " + contact.getFullName() + "\n" + "Nội dung: " + contact.getMessage());
        javaMailSender.send(message);
    }

    // Gửi email cấp lại mật khẩu
    public void sendResetPasswordEmail(String toEmail, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("hoan39800@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Gotrip - Cấp lại mật khẩu");
        message.setText(
                "Chúng tôi xin gửi mật khẩu mới đến cho bạn, vui lòng đăng nhập và đổi mật khẩu mới ngay sau khi đăng nhập. Mật khẩu mới là: "
                        + newPassword);
        javaMailSender.send(message);
    }

}
