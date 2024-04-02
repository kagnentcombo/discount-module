package com.work.Mercy.service;

import com.work.Mercy.model.Stock;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface IStockService {

    List<Stock> getAllStock();
    byte[] getStockPhotoByStockId(long id) throws SQLException;


    Stock addNewStock(String sex, String type,String name,BigDecimal price,String detail,String size,MultipartFile file,String component,String care,String source) throws SQLException, IOException;
}
