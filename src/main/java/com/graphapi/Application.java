package com.graphapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.graphapi.model.Graph;
import com.graphapi.service.IService;

@SpringBootApplication
public class Application implements CommandLineRunner {
	
	@Autowired
	private IService<Graph> service;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Graph graph = new Graph();
		graph.setId("test");
		graph.setAvgVol10Day(111f);
		graph.setWeekHigh52(222f);
		graph.setWeekLow52(333f);
		graph.setWeekLowDate52("Test");
		graph.setWeekPriceReturnDaily52(444f);

		service.saveOrUpdate(graph);
	}

}
