package com.work.Mercy.service;

import com.work.Mercy.exception.ResourceNotFoundException;
import com.work.Mercy.model.Stock;
import com.work.Mercy.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StockService implements IStockService{
    private final StockRepository stockRepository;
    @Override
    public List<Stock> getAllStock() {
        return stockRepository.findAll();
    }

    @Override
    public byte[] getStockPhotoByStockId(long id) throws SQLException {
        Optional<Stock> theRoom = stockRepository.findById(id);
        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Room not found");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public Stock addNewStock(String sex, String type,String name,BigDecimal price,String detail,String size,MultipartFile file,String component,String care,String source) throws SQLException, IOException {
        Stock stock = new Stock();
        stock.setName(name);
        stock.setComponent(component);
        stock.setCare(care);
        stock.setDetail(detail);
        stock.setSex(sex);
        stock.setSize(size);
        stock.setSource(source);
        stock.setType(type);
        stock.setPrice(price);
        if (!file.isEmpty()){
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            stock.setPhoto(photoBlob);
        }
        return stockRepository.save(stock);
    }
}
