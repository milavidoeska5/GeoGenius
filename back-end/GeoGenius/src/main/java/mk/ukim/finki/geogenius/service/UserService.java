package mk.ukim.finki.geogenius.service;

import mk.ukim.finki.geogenius.model.User;
import mk.ukim.finki.geogenius.model.dto.ChangePasswordDto;
import mk.ukim.finki.geogenius.model.dto.LoginDto;
import mk.ukim.finki.geogenius.model.dto.RegisterDto;
import mk.ukim.finki.geogenius.model.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {
    void register(RegisterDto request);

    User authenticate(LoginDto request);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    UserDto getProfile(String username);

    void changePassword(String username, ChangePasswordDto dto);
}
