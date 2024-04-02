package com.work.Mercy.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Blob;
import org.apache.commons.codec.binary.Base64;
@Data
@NoArgsConstructor
public class StockResponse {

    private long id;
    private String sex;
    private String type;
    private String name;
    private BigDecimal price;
    private String detail;
    private String size;
    private String photo;
    private String component;
    private String care;
    private String source;

    public StockResponse(long id, String sex, String type, String name, BigDecimal price, String detail, String size, String component, String care, String source) {
        this.id = id;
        this.sex = sex;
        this.type = type;
        this.name = name;
        this.price = price;
        this.detail = detail;
        this.size = size;
        this.component = component;
        this.care = care;
        this.source = source;
    }
}
