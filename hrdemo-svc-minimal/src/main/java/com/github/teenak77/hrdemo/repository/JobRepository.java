package com.github.teenak77.hrdemo.repository;

import com.github.teenak77.hrdemo.domain.Job;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by teenak on 13/09/15.
 */
public interface JobRepository
        extends PagingAndSortingRepository<Job, Long>  {

    List<Job> findByName(@Param("name") String name);

}
