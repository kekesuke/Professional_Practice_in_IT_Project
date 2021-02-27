package com.graphapi.service;

import java.util.Collection;
import java.util.Optional;

public interface IService<T> {
	Collection<T> findAll();
	
	Optional<T> findById(String id);
	
	T saveOrUpdate(T t);
	
	String deleteById(String id);

}
