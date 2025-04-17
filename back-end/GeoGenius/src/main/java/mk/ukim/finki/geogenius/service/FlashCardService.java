package mk.ukim.finki.geogenius.service;

import mk.ukim.finki.geogenius.model.dto.AdminDto;
import mk.ukim.finki.geogenius.model.dto.FlashCardDto;

import java.util.List;

public interface FlashCardService {
    List<FlashCardDto> getApprovedCards();

    FlashCardDto getCardById(Long id);

    void proposeCard(FlashCardDto card, String username);

    List<AdminDto> getPendingCards();

    void approveCard(Long id);

    void rejectCard(Long id);

}
