package mk.ukim.finki.geogenius.web;

import mk.ukim.finki.geogenius.model.dto.FlashCardDto;
import mk.ukim.finki.geogenius.service.FlashCardService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FlashCardController {

    private final FlashCardService flashCardService;

    public FlashCardController(FlashCardService flashCardService) {
        this.flashCardService = flashCardService;
    }

    @GetMapping
    public List<FlashCardDto> getApprovedCards() {
        return flashCardService.getApprovedCards();
    }

    @GetMapping("/{id}")
    public FlashCardDto getCardById(@PathVariable Long id) {
        return flashCardService.getCardById(id);
    }

    @PostMapping
    public void proposeCard(@RequestBody FlashCardDto flashCardDto,
                            Principal principal) {
        flashCardService.proposeCard(flashCardDto, principal.getName());
    }
}
