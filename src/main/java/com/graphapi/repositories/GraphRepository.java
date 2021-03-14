package com.graphapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.graphapi.models.Graph;

@Repository
public interface GraphRepository extends JpaRepository<Graph, String> {

}
