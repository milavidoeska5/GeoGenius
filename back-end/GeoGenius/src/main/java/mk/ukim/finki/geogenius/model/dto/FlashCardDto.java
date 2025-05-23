package mk.ukim.finki.geogenius.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FlashCardDto {
    private Long id;
    private String title;

    private String description;

    @JsonFormat(pattern = "dd.MM.yyyy HH:mm")
    private LocalDateTime creationDate;

    public FlashCardDto(Long id, String title, String description, LocalDateTime creationDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
    }
}
