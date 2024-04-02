package com.work.Mercy.controller;

import com.work.Mercy.model.Campaigns;
import com.work.Mercy.model.CartItem;
import com.work.Mercy.model.Stock;
import com.work.Mercy.request.CampaignCartItemRequest;
import com.work.Mercy.response.CampaignsResponse;
import com.work.Mercy.response.StockResponse;
import com.work.Mercy.service.CartItemService;
import com.work.Mercy.service.ICampaignsService;
import com.work.Mercy.service.ICartItemService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/campaigns")
@CrossOrigin(origins = "http://localhost:3000")
public class CampaignsController {
    private final ICampaignsService campaignsService;
    private final ICartItemService cartItemService;
    @PostMapping("/add/new-campaigns")
    public ResponseEntity<CampaignsResponse> addNewCampaigns(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("discount") String discount
    ) {
        Campaigns saveCampaigns = campaignsService.addNewCampaigns(name,category,discount);
        CampaignsResponse response = new CampaignsResponse(saveCampaigns.getId(), saveCampaigns.getName(),
                saveCampaigns.getCategory(),saveCampaigns.getDiscount());
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/all-campaigns")
    public ResponseEntity<List<CampaignsResponse>> getAllCampaigns() {
        List<Campaigns> campaigns = campaignsService.getAllCampaigns();
        List<CampaignsResponse> campaignsResponses = new ArrayList<>();
        for (Campaigns campaign : campaigns) {
            CampaignsResponse response = new CampaignsResponse(
                    campaign.getId(),
                    campaign.getName(),
                    campaign.getCategory(),
                    campaign.getDiscount()
            );
            campaignsResponses.add(response);
        }

        return ResponseEntity.ok(campaignsResponses);
    }

    @PostMapping("/cartItem")
    public ResponseEntity<Double> calculatePrice(@RequestBody List<CartItem> cartItems) {
        BigDecimal totalPriceDefault = cartItemService.calculateTotalPrice(cartItems);
        double totalPriceDefaultDouble = totalPriceDefault.doubleValue();
        return ResponseEntity.ok(totalPriceDefaultDouble);
    }

    @PostMapping("/selectCampaigns")
    public ResponseEntity<Double> calculateCampaigns(@RequestBody CampaignCartItemRequest request) {
        BigDecimal totalPrice = cartItemService.calculateFinalPrice(request.getCampaign(), request.getCartItems());
        double totalPriceDouble = totalPrice.doubleValue();
        return ResponseEntity.ok(totalPriceDouble);
    }


}
