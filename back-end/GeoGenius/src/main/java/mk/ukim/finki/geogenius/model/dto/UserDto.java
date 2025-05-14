package mk.ukim.finki.geogenius.model.dto;

import lombok.Data;

@Data
public class UserDto {

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private Integer points;

    public UserDto(String username, String firstName, String lastName, String email, Integer points) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.points = points;
    }
}
