package com.work.Mercy.service;

import com.work.Mercy.model.Campaigns;
import com.work.Mercy.model.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService{
    private BigDecimal finalPrice;
    private BigDecimal PriceOnTopDefault;
    private BigDecimal roundCoupon = BigDecimal.ZERO;
    private BigDecimal roundOnTop = BigDecimal.ZERO;

    @Override
    public BigDecimal calculateTotalPrice(List<CartItem> cartItems) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (CartItem cartItem : cartItems) {
            BigDecimal price = cartItem.getPrice();
            BigDecimal quantity = new BigDecimal(cartItem.getQuantity());
            BigDecimal itemTotal = price.multiply(quantity);
            totalPrice = totalPrice.add(itemTotal);
        }
        return totalPrice;
    }
    @Override
    public BigDecimal calculateFinalPrice(Campaigns selectedCampaigns, List<CartItem> cartItems) {

        if (finalPrice == null) {
            finalPrice = calculateTotalPrice(cartItems);
        }
        if (selectedCampaigns.getCategory().equals("Coupon")) {
            roundCoupon = roundCoupon.add(BigDecimal.ONE);
            if (roundCoupon.compareTo(BigDecimal.valueOf(2)) > 0) {
                finalPrice = calculateTotalPrice(cartItems);

            }
            if (selectedCampaigns.getName().equals("Fixed amount")) {
                String strDiscount = selectedCampaigns.getDiscount();
                BigDecimal discount = new BigDecimal(strDiscount.replaceAll("\\D", ""));
                finalPrice = finalPrice.subtract(discount);
                PriceOnTopDefault =finalPrice;
            } else if (selectedCampaigns.getName().equals("Percentage discount")) {
                String strDiscount = selectedCampaigns.getDiscount();
                BigDecimal discountPercent = new BigDecimal(strDiscount.replaceAll("\\D", ""));
                BigDecimal discountAmount = finalPrice.multiply(discountPercent).divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);
                finalPrice = finalPrice.subtract(discountAmount);
                PriceOnTopDefault =finalPrice;

            }
        } else if (selectedCampaigns.getCategory().equals("On Top")) {
            roundOnTop = roundOnTop.add(BigDecimal.ONE);
            if (roundOnTop.compareTo(BigDecimal.valueOf(2)) > 0) {
                finalPrice = PriceOnTopDefault;

            }
            if (selectedCampaigns.getName().equals("Percentage discount by item category")) {
                String strDiscount = selectedCampaigns.getDiscount();
                BigDecimal discountPercent = new BigDecimal(strDiscount.replaceAll("\\D", ""));
                String lastWord = strDiscount.split("\\s+")[strDiscount.split("\\s+").length - 1];

                BigDecimal totalByCategoryPrice = BigDecimal.ZERO;
                for (CartItem item : cartItems) {
                    if (item.getType().equals(lastWord)) {
                        totalByCategoryPrice = totalByCategoryPrice.add(item.getPrice());
                    }
                }
                BigDecimal discountAmount = totalByCategoryPrice.multiply(discountPercent).divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);
                finalPrice = finalPrice.subtract(discountAmount);
            } else if (selectedCampaigns.getName().equals("Discount by points")) {
                BigDecimal twentyPercentage = finalPrice.multiply(BigDecimal.valueOf(20)).divide(BigDecimal.valueOf(100), RoundingMode.HALF_UP);

                String strDiscount = selectedCampaigns.getDiscount();
                BigDecimal discount = new BigDecimal(strDiscount.replaceAll("\\D", ""));
                if (discount.compareTo(twentyPercentage) <= 0) {
                    finalPrice = finalPrice.subtract(discount);
                }
            }
        } else if (selectedCampaigns.getCategory().equals("Seasonal")) {
            if (selectedCampaigns.getName().equals("Special campaigns")) {
                String strDiscount = selectedCampaigns.getDiscount();
                String[] matchNumbers = strDiscount.split("\\D+");
                BigDecimal discountValue = new BigDecimal(matchNumbers[0]);
                BigDecimal conditionValue = new BigDecimal(matchNumbers[1]);
                if (finalPrice.compareTo(conditionValue) >= 0) {
                    finalPrice = finalPrice.subtract(discountValue);
                }
            }
        }

        return finalPrice;
    }


}
