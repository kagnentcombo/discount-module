package com.work.Mercy.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Campaigns {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id;
    private String name;
    private String category;
    private String discount;



    public Campaigns() {
    }

    public Campaigns(String name, String category, String discount) {
        this.name = name;
        this.category = category;
        this.discount = discount;
    }
}

