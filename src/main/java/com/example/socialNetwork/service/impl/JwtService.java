package com.example.socialNetwork.service.impl;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.example.socialNetwork.dto.UserDTO;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

@Service
public class JwtService {
	public static final String USERNAME = "userName";
	public static final String ID = "id";
//	public static final String FULLNAME = "fullName";
	public static final String SECRET_KEY = "11111111111111111111111111111111";
	public static final int EXPIRE_TIME = 86400000;

	public String generateTokenLogin(UserDTO userDTO) {
		String token = null;
		try {
			// Create HMAC signer
			JWSSigner signer = new MACSigner(generateShareSecret());
			JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
			builder.claim(USERNAME, userDTO.getUserName());
			builder.claim(ID, userDTO.getId()+"");
//			builder.claim(FULLNAME, userDTO.getFullName());
			builder.expirationTime(generateExpirationDate());
			JWTClaimsSet claimsSet = builder.build();
			SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
			// Apply the HMAC protection
			signedJWT.sign(signer);
			token = signedJWT.serialize();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return token;
	}


	
	private JWTClaimsSet getClaimsFromToken(String token) {
		JWTClaimsSet claims = null;
		try {
			SignedJWT signedJWT = SignedJWT.parse(token);
			JWSVerifier verifier = new MACVerifier(generateShareSecret());
			if (signedJWT.verify(verifier)) {
				claims = signedJWT.getJWTClaimsSet();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return claims;
	}

	private Date generateExpirationDate() {
		return new Date(System.currentTimeMillis() + EXPIRE_TIME);
	}

	private Date getExpirationDateFromToken(String token) {
		Date expiration = null;
		JWTClaimsSet claims = getClaimsFromToken(token);
		expiration = claims.getExpirationTime();
		return expiration;
	}

	public String getUsernameFromToken(String token) {
		String username = null;
		try {
			JWTClaimsSet claims = getClaimsFromToken(token);
			username = claims.getStringClaim(USERNAME);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return username;
	}

	public Long getUseIdFromToken(String token) {
		Long id = null;
		try {
			JWTClaimsSet claims = getClaimsFromToken(token);
			id = Long.parseLong(claims.getStringClaim(ID));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return id;
	}
	
	private byte[] generateShareSecret() {
		// Generate 256-bit (32-byte) shared secret
		byte[] sharedSecret = new byte[32];
		sharedSecret = SECRET_KEY.getBytes();
		return sharedSecret;
	}

	private Boolean isTokenExpired(String token) {
		Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	public Boolean validateTokenLogin(String token) {
		if (token == null || token.trim().length() == 0) {
			return false;
		}
		String username = getUsernameFromToken(token);
		Long id = getUseIdFromToken(token);
		if (username == null || username.isEmpty() || id == null) {
			return false;
		}
		if (isTokenExpired(token)) {
			return false;
		}
		return true;
	}


}