package mk.ukim.finki.geogenius.web;

import mk.ukim.finki.geogenius.model.dto.AdminDto;
import mk.ukim.finki.geogenius.service.FlashCardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/cards")
public class AdminController {

    private final FlashCardService flashCardService;

    public AdminController(FlashCardService flashCardService) {
        this.flashCardService = flashCardService;
    }

    @GetMapping("/pending")
    public List<AdminDto> getPendingCards() {
        return flashCardService.getPendingCards();
    }

    @PutMapping("/{id}/approve")
    public void approveCard(@PathVariable Long id) {
        flashCardService.approveCard(id);
    }

    @DeleteMapping("/{id}/reject")
    public void rejectCard(@PathVariable Long id) {
        flashCardService.rejectCard(id);
    }

}