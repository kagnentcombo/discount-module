package com.work.Mercy.request;

import com.work.Mercy.model.Campaigns;
import com.work.Mercy.model.CartItem;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;
@Data
@Accessors(chain = true)

public class CampaignCartItemRequest {
    private Campaigns campaign;
    private List<CartItem> cartItems;
}
