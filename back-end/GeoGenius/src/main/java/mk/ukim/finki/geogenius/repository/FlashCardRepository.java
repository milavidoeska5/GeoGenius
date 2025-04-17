package mk.ukim.finki.geogenius.repository;

import mk.ukim.finki.geogenius.model.FlashCard;
import mk.ukim.finki.geogenius.model.enumerations.CardStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashCardRepository extends JpaRepository<FlashCard, Long> {

    List<FlashCard> findByStatusOrderByCreationDateDesc(CardStatus status);

}
