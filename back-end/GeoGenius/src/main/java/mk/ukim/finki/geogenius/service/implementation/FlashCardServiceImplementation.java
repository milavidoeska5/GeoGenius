package mk.ukim.finki.geogenius.service.implementation;

import mk.ukim.finki.geogenius.model.FlashCard;
import mk.ukim.finki.geogenius.model.User;
import mk.ukim.finki.geogenius.model.dto.AdminDto;
import mk.ukim.finki.geogenius.model.dto.FlashCardDto;
import mk.ukim.finki.geogenius.model.enumerations.CardStatus;
import mk.ukim.finki.geogenius.model.exceptions.CardNotFoundException;
import mk.ukim.finki.geogenius.model.exceptions.UsernameNotFoundException;
import mk.ukim.finki.geogenius.repository.FlashCardRepository;
import mk.ukim.finki.geogenius.repository.UserRepository;
import mk.ukim.finki.geogenius.service.FlashCardService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashCardServiceImplementation implements FlashCardService {

  private final FlashCardRepository flashCardRepository;
  private final UserRepository userRepository;

    public FlashCardServiceImplementation(FlashCardRepository flashCardRepository, UserRepository userRepository) {
        this.flashCardRepository = flashCardRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<FlashCardDto> getApprovedCards() {
        return flashCardRepository.findByStatusOrderByCreationDateDesc(CardStatus.APPROVED)
                .stream()
                .map(card -> new FlashCardDto(card.getTitle(), card.getDescription(), card.getCreationDate()))
                .collect(Collectors.toList());
    }

    @Override
    public FlashCardDto getCardById(Long id) {
        FlashCard card = flashCardRepository.findById(id)
                .orElseThrow(() -> new CardNotFoundException(String.format("Card with id: %d is not found", id)));

        return new FlashCardDto(
                card.getTitle(),
                card.getDescription(),
                card.getCreationDate()
        );
    }


    @Override
    public void proposeCard(FlashCardDto dto, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));

        FlashCard card = new FlashCard();
        card.setTitle(dto.getTitle());
        card.setDescription(dto.getDescription());
        card.setStatus(CardStatus.PENDING);
        card.setCreator(user);
        flashCardRepository.save(card);

    }

    @Override
    public List<AdminDto> getPendingCards() {
        return flashCardRepository.findByStatusOrderByCreationDateDesc(CardStatus.PENDING)
                .stream()
                .map(card -> new AdminDto(card.getId(), card.getTitle(), card.getDescription(), card.getCreator().getUsername(), card.getCreationDate()))
                .collect(Collectors.toList());
    }

    @Override
    public void approveCard(Long id) {
        FlashCard card = flashCardRepository.findById(id).orElseThrow(() -> new CardNotFoundException(String.format("Card with id: %d is not found", id)));
        card.setStatus(CardStatus.APPROVED);
        flashCardRepository.save(card);

    }

    @Override
    public void rejectCard(Long id) {
        FlashCard card = flashCardRepository.findById(id).orElseThrow(() -> new CardNotFoundException(String.format("Card with id: %d is not found", id)));
        flashCardRepository.delete(card);
    }
}
