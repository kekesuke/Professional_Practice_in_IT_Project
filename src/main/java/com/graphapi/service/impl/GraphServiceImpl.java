package com.graphapi.service.impl;

import java.util.Collection;
import java.util.Optional;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graphapi.model.Graph;
import com.graphapi.repository.GraphRepository;
import com.graphapi.service.IService;

@Service
public class GraphServiceImpl implements IService<Graph> {
	
	@Autowired
	private GraphRepository graphRepository;

	@Override
	public Collection<Graph> findAll() {
		return graphRepository.findAll();
	}

	@Override
	public Optional<Graph> findById(String id) {
		return graphRepository.findById(id);
	}

	@Override
	public Graph saveOrUpdate(Graph graph) {
		return graphRepository.saveAndFlush(graph);
	}

	
	@Override
	public String deleteById(String id) {
		JSONObject jsonObject = new JSONObject();
		try {
			graphRepository.deleteById(id);
			jsonObject.put("message", "Graph deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
