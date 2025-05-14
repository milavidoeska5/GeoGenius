package mk.ukim.finki.geogenius.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminDto {

    private Long id;

    private String title;

    private String description;

    private String creatorUsername;

    @JsonFormat(pattern = "dd.MM.yyyy HH:mm")
    private LocalDateTime creationDate;

    public AdminDto(Long id, String title, String description, String creatorUsername, LocalDateTime creationDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creatorUsername = creatorUsername;
        this.creationDate = creationDate;
    }
}
