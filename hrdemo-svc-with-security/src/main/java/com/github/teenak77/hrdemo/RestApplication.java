package com.github.teenak77.hrdemo;

import com.github.teenak77.hrdemo.model.domain.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import javax.sql.DataSource;

@EnableAutoConfiguration
@ComponentScan
@Import(RepositoryRestMvcConfiguration.class)
public class RestApplication extends RepositoryRestMvcConfiguration {

    @Override
    protected void configureRepositoryRestConfiguration( RepositoryRestConfiguration config) {
        config.exposeIdsFor(Job.class);
    }


    @Autowired
    private DataSourceProperties properties;

    @Bean
    public DataSource dataSource() {
        org.apache.tomcat.jdbc.pool.DataSource ds = new org.apache.tomcat.jdbc.pool.DataSource();
        ds.setDriverClassName(this.properties.getDriverClassName());
        ds.setUrl(this.properties.getUrl());
        ds.setUsername(this.properties.getUsername());
        ds.setPassword(this.properties.getPassword());
        return ds;
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(RestApplication.class, args);
    }
}
