package com.work.Mercy.service;

import com.work.Mercy.model.Campaigns;

import java.util.List;

public interface ICampaignsService {
    Campaigns addNewCampaigns(String name, String category, String discount);

    List<Campaigns> getAllCampaigns();
}
