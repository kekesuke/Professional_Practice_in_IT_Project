package com.graphapi.services;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graphapi.exception.ApplicationException;
import com.graphapi.exception.GraphNotFoundException;
import com.graphapi.model.Graph;
import com.graphapi.resource.Resource;
import com.graphapi.service.IService;

@RestController
@RequestMapping("/graph")
public class GraphResourceService implements Resource<Graph> {
	
	private static Logger log = LoggerFactory.getLogger(GraphResourceService.class);
	
	@Autowired
	private IService<Graph> graphService;

	@Override
	public ResponseEntity<Collection<Graph>> findAll() {
		log.info("GraphResourceService - findAll");
		return new ResponseEntity<>(graphService.findAll(), HttpStatus.OK);
	}

	
	@Override
	public ResponseEntity<Graph> findById(String id) {
		log.info("GraphResourceService - findById");
		Optional<Graph> graph = graphService.findById(id);
		if(!graph.isPresent()) {
			throw new GraphNotFoundException("Graph not found");
		}
		return new ResponseEntity<>(graph.get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Graph> save(Graph graph) {
		log.info("GraphResourceService - save");
		if(graph.getId() != null) {
			throw new ApplicationException("Graph ID found, ID is not required for save the data");
		}
		return new ResponseEntity<>(graphService.saveOrUpdate(graph), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Graph> update(Graph graph) {
		log.info("GraphResourceService - update");
		if(graph.getId() == null) {
			throw new ApplicationException("Graph ID not found, ID is required for update the data");
		}
		return new ResponseEntity<>(graphService.saveOrUpdate(graph), HttpStatus.OK);
	}


	@Override
	public ResponseEntity<String> deleteById(String id) {
		log.info("GraphResourceService - deleteById");
		Optional<Graph> graph = graphService.findById(id);
		if(!graph.isPresent()) {
			throw new GraphNotFoundException("graph not found");
		}
		return new ResponseEntity<>(graphService.deleteById(id), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> invalid() {
		log.info("GraphResourceService - invalid");
		JSONObject jsonObject = new JSONObject();
		try {
			jsonObject.put("message", "something is missing, please check everything before sending the request!!!");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
	}

}
