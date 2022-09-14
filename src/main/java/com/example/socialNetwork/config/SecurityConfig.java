package com.example.socialNetwork.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.socialNetwork.rest.CustomAccessDeniedHandler;
import com.example.socialNetwork.rest.JwtAuthenticationTokenFilter;
import com.example.socialNetwork.rest.RestAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Bean
	public PasswordEncoder passwordEncoder() {
	   return new BCryptPasswordEncoder(20);
	}
	
	@Bean
	public JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter() throws Exception {
		JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
		jwtAuthenticationTokenFilter.setAuthenticationManager(authenticationManager());
		return jwtAuthenticationTokenFilter;
	}

	@Bean
	public RestAuthenticationEntryPoint restServicesEntryPoint() {
		return new RestAuthenticationEntryPoint();
	}

	@Bean
	public CustomAccessDeniedHandler customAccessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}

	@Bean
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().ignoringAntMatchers("/api/**");
		http.authorizeRequests().antMatchers("/api/login**").permitAll(); 
		http.authorizeRequests().antMatchers("/api/signup**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/posts/**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/posts/conditions/**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/comments/**").permitAll();
		http.authorizeRequests().antMatchers(HttpMethod.GET, "/api/images/**").permitAll();
		http.antMatcher("/api/**").httpBasic().authenticationEntryPoint(restServicesEntryPoint()).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/api/**").access("hasRole('ROLE_TENANT') or hasRole('ROLE_LANDLORD')")
				.antMatchers(HttpMethod.POST, "/api/**").access("hasRole('ROLE_TENANT')  or hasRole('ROLE_LANDLORD')")
				.antMatchers(HttpMethod.PUT, "/api/**").access("hasRole('ROLE_TENANT') or hasRole('ROLE_LANDLORD')")
				.antMatchers(HttpMethod.DELETE, "/api/**").access("hasRole('ROLE_TENANT')  or hasRole('ROLE_LANDLORD')").and()
				.addFilterBefore(jwtAuthenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
	}
	
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/ws**");
    }
}