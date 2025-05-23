package mk.ukim.finki.geogenius.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import mk.ukim.finki.geogenius.model.enumerations.CardStatus;

import java.time.LocalDateTime;

@Entity
@Data
public class FlashCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private CardStatus status;

    @JsonFormat(pattern = "dd.MM.yyyy HH:mm")
    private LocalDateTime creationDate;

    @ManyToOne
    private User creator;

    public FlashCard() {
    }

    public FlashCard(Long id, String title, String description, CardStatus status, User creator) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.creator = creator;
    }

    @PrePersist
    public void onCreate() {
        this.creationDate = LocalDateTime.now();
    }
}
