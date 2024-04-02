package com.work.Mercy.service;

import com.work.Mercy.model.Campaigns;
import com.work.Mercy.repository.CampaignsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CampaignsService implements ICampaignsService{
    private final CampaignsRepository campaignsRepository;

    @Override
    public Campaigns addNewCampaigns(String name, String category, String discount) {
        Campaigns campaigns = new Campaigns();
        campaigns.setName(name);
        campaigns.setCategory(category);
        campaigns.setDiscount(discount);

        return campaignsRepository.save(campaigns);
    }

    @Override
    public List<Campaigns> getAllCampaigns() {
        return campaignsRepository.findAll();
    }
}
