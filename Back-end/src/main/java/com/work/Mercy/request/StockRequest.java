package com.work.Mercy.request;

import lombok.Data;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
@Data
@Accessors(chain = true)
public class StockRequest {
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
}
