package mk.ukim.finki.geogenius.model.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import mk.ukim.finki.geogenius.model.enumerations.Role;

@Data
public class UserDto {

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private Integer points;

    @Enumerated(EnumType.STRING)
    private Role role;

    public UserDto(String username, String firstName, String lastName, String email, Integer points, Role role) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.points = points;
        this.role = role;

    }
}
