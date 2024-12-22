package com.spring.be_booktours.dtos.account;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class LogRegResponse {
    private String token;
    private String refreshToken;
    private String expirationTime;
    private Set<String> roles;
    private boolean verifiedEmail;
}
