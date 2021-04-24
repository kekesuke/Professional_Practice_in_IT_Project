package com.graphapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.graphapi.models.Symbol;
import com.graphapi.models.Graph;
import com.graphapi.models.GraphRequest;
import com.graphapi.services.interfaces.IService;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class Application implements CommandLineRunner {
	private static final Logger log = LoggerFactory.getLogger(Application.class);
	
	@Autowired
	private IService<Graph> service;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Graph graph = new Graph();
		graph.setId("test");
		graph.setDate(111);
		graph.setClose(222f);
		graph.setLow(333f);


		service.saveOrUpdate(graph);
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}

	@Bean
	public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
		long time;
		time = Instant.now().getEpochSecond();
		String s2 = Long.toString(time);
		return args -> {
			Symbol[]  symbols = restTemplate.getForEntity(
					"https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=c0t93rv48v6r4maemvu0", Symbol[].class).getBody();
		    for (Symbol symbol : symbols) {
		    	
		    	//GraphRequest[]  graphs = restTemplate.getForEntity(
					//"https://finnhub.io/api/v1/crypto/candle?symbol="+symbol.getSymbol() +"&resolution=D&from=1546329600&to="+time +"&token=c0t93rv48v6r4maemvu0", GraphRequest[].class).getBody();
		    	
		    	//log.info("https://finnhub.io/api/v1/crypto/candle?symbol="+BINANCE:TKOBUSD +"&resolution=D&from=1546329600&to="+time +"&token=c0t93rv48v6r4maemvu0");
		    	
		    	//log.info(s2);
		    	log.info(symbol.getSymbol());
            }
		    GraphRequest  graph = restTemplate.getForEntity(
					"https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:TKOBUSD" +"&resolution=D&from=1546329600&to="+time +"&token=c0t93rv48v6r4maemvu0", GraphRequest.class).getBody();
		    //log.info(s2);

		};
	}

}
//https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from=1572651390&to=1575243390&token=c0t93rv48v6r4maemvu0