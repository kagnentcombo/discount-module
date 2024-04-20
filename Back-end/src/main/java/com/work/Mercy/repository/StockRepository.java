package com.work.Mercy.repository;

import com.work.Mercy.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Long> {
    @Query(value = "SELECT DISTINCT s.type FROM Stock s") //DISTINCT เพื่อให้ได้รายการที่มีค่าไม่ซ้ำกันจากฟิลด์ที่เราระบุ
    List<String> findDistinctTypes();
}