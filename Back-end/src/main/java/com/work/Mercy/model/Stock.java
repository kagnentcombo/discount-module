package com.work.Mercy.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Blob;
@Entity
@Getter
@Setter
@AllArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id;
    private String sex;
    private String type;
    private String name;
    private BigDecimal price;
    private String detail;
    private String size;

    @Lob
    private Blob photo;

    private String component;
    private String care;
    private String source;
    public Stock() {
    }
}
