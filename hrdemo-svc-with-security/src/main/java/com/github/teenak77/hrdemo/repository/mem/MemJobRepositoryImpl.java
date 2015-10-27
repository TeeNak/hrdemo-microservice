package com.github.teenak77.hrdemo.repository.mem;

import com.github.teenak77.hrdemo.model.domain.Job;
import com.github.teenak77.hrdemo.repository.JobRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.TreeMap;

/**
 * Created by teenak on 2015/02/07.
 */
@Repository
@Profile("mem")
public class MemJobRepositoryImpl implements JobRepository {

    TreeMap<Integer, Job> jobList = new TreeMap<Integer, Job>();

    public int findNewKey() {

        if( jobList.size() <= 0) {
            return 1;
        }
        return jobList.lastKey() + 1;

    }

    public Collection<Job> findAll() {
        return jobList.values();
    }


    public Job findOne(Integer key) {
        return jobList.get(key);
    }

    public Job save(Job job) {

        if(job.getJobId() == null || job.getJobId() == 0) {
            job.setJobId(findNewKey());
        }

        jobList.put(job.getJobId(), job);
        return job;
    }

    public void delete(Job job) {
        jobList.remove(job.getJobId());
    }
}
