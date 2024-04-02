package com.work.Mercy.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CampaignsResponse {
    private long id;
    private String name;
    private String category;
    private String discount;

    public CampaignsResponse(long id, String name, String category, String discount) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.discount = discount;
    }
}
