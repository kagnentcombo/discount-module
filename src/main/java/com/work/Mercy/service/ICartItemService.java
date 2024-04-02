package com.work.Mercy.service;

import com.work.Mercy.model.Campaigns;
import com.work.Mercy.model.CartItem;

import java.math.BigDecimal;
import java.util.List;

public interface ICartItemService {
    BigDecimal calculateTotalPrice(List<CartItem> cartItems);

    BigDecimal calculateFinalPrice(Campaigns selectedCampaigns, List<CartItem> cartItems);
}
