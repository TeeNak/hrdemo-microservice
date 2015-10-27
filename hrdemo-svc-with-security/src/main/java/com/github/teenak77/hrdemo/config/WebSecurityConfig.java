package com.github.teenak77.hrdemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebMvcSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/home").permitAll()
                .antMatchers("/css/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, BCryptPasswordEncoder encoder) throws Exception {

//        Usernames/Passwords are
//        rod/koala
//        dianne/emu
//        scott/wombat
//        peter/opal

        auth
                .inMemoryAuthentication()
                .passwordEncoder(encoder)
                .withUser("rod").password("$2a$10$75pBjapg4Nl8Pzd.3JRnUe7PDJmk9qBGwNEJDAlA3V.dEJxcDKn5O").roles("user")
                .and()
                .withUser("dianne").password("$2a$04$bCMEyxrdF/7sgfUiUJ6Ose2vh9DAMaVBldS1Bw2fhi1jgutZrr9zm").roles("user")
                .and()
                .withUser("scott").password("$2a$06$eChwvzAu3TSexnC3ynw4LOSw1qiEbtNItNeYv5uI40w1i3paoSfLu").roles("user")
                .and()
                .withUser("peter").password("$2a$04$8.H8bCMROLF4CIgd7IpeQ.tcBXLP5w8iplO0n.kCIkISwrIgX28Ii").roles("user");

    }
}