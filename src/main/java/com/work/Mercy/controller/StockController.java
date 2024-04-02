package com.work.Mercy.controller;

import com.work.Mercy.exception.PhotoRetrievalException;
import com.work.Mercy.model.Stock;
import com.work.Mercy.request.StockRequest;
import com.work.Mercy.response.StockResponse;
import com.work.Mercy.service.IStockService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stock")
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {
 private final IStockService stockService;

    @PostMapping("/add/new-suit")
    public ResponseEntity<StockResponse> addNewSuit(
            @RequestParam("sex") String sex,
            @RequestParam("type") String type,
            @RequestParam("name") String name,
            @RequestParam("price") BigDecimal price,
            @RequestParam("detail") String detail,
            @RequestParam("size") String size,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("component") String component,
            @RequestParam("care") String care,
            @RequestParam("source") String source
            ) throws SQLException, IOException {
        Stock saveStock = stockService.addNewStock(sex,type,name,price,detail,size,photo,component,care,source);
        StockResponse response = new StockResponse(saveStock.getId(), saveStock.getSex(),
                saveStock.getType(),saveStock.getName(),saveStock.getPrice(),saveStock.getDetail(),saveStock.getSize(),saveStock.getComponent(),saveStock.getCare(), saveStock.getSource());
        return ResponseEntity.ok(response);
    }

 @GetMapping(value = "/all-stock")
    public ResponseEntity<List<StockResponse>> getAllStocks() throws SQLException {
     List<Stock> stocks = stockService.getAllStock();
     List<StockResponse> stockResponseList = new ArrayList<>();
     for(Stock stock : stocks){
         byte[] photoBytes = stockService.getStockPhotoByStockId(stock.getId());
         if(photoBytes != null && photoBytes.length > 0){
             String base64photo = Base64.encodeBase64String(photoBytes);
             StockResponse stockResponse = getStockResponse(stock);
             stockResponse.setPhoto(base64photo);
             stockResponseList.add(stockResponse);
            }
        }
     return ResponseEntity.ok(stockResponseList);
 }

    private StockResponse getStockResponse(Stock stock) {
        byte[] photoBytes = null;

        Blob photoBlob = stock.getPhoto();
        if(photoBlob != null){
            try{
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());

            }catch (SQLException e){
                throw new PhotoRetrievalException("Error retrieving photo");

            }
        }
        return new StockResponse(stock.getId(),
                stock.getSex(),
                stock.getType(),
                stock.getName(),
                stock.getPrice(),
                stock.getDetail(),
                stock.getSize(),
                stock.getComponent(),
                stock.getCare(),
                stock.getSource());
    }

}