package com.todo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.todo.model.TodoItem;

@Repository
public interface ItemsDao extends JpaRepository<TodoItem, Long>{
    @Query(value = "SELECT t.*, MATCH (t.description) AGAINST (:searchTerm) AS score " +
                   "FROM todo_items t " +
                   "WHERE MATCH (t.description) AGAINST (:searchTerm) AND t.user_id=:id " +
                   "ORDER BY score DESC", nativeQuery = true)
    List<TodoItem> findByUserIdAndSearchQuery(@Param("id") Long id, @Param("searchTerm") String searchTerm);
}
