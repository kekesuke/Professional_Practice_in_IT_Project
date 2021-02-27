package com.graphapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.graphapi.model.Graph;

@Repository
public interface GraphRepository extends JpaRepository<Graph, String> {

}
