package mk.ukim.finki.geogenius.web;

import mk.ukim.finki.geogenius.model.dto.ChangePasswordDto;
import mk.ukim.finki.geogenius.model.dto.UserDto;
import mk.ukim.finki.geogenius.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserDto getProfile(Principal principal) {
        return userService.getProfile(principal.getName());
    }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordDto dto,
                               Principal principal) {

        userService.changePassword(principal.getName(), dto);

    }

}
