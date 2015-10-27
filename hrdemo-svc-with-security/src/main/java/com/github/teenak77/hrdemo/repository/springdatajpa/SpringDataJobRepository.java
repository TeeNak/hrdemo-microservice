package com.github.teenak77.hrdemo.repository.springdatajpa;

import com.github.teenak77.hrdemo.model.domain.Job;
import com.github.teenak77.hrdemo.repository.JobRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by teenak on 2015/02/11.
 */
@Repository
@Profile("spring-data-jpa")
public interface SpringDataJobRepository
        extends JobRepository
                , org.springframework.data.repository.Repository<Job, Integer>
                , PagingAndSortingRepository<Job, Integer> {
}
