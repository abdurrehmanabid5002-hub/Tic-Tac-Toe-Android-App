# Tic-Tac-Toe Mobile App - TODO

## Core Game Features
- [x] Game board state management (3x3 grid, X/O/empty)
- [x] Player turn tracking (X always goes first)
- [x] Win condition detection (3-in-a-row)
- [x] Tie condition detection (board full, no winner)
- [x] Score tracking (player wins, CPU wins, ties)
- [x] Board reset between rounds (keeps scores)

## CPU AI Logic
- [x] Check if CPU can win on next move (take winning spot)
- [x] Check if player is about to win (block them)
- [x] Pick random center or corner spot if neither applies
- [x] Simulate thinking delay (~500ms before CPU move)

## UI Components
- [x] Header section (logo, turn indicator, restart button)
- [x] 3x3 game board with tiles
- [x] Scoreboard (3 blocks: X wins, Ties, O wins)
- [x] Game over message/modal
- [x] Tile interaction feedback (press states)

## Styling & Theme
- [x] Apply dark neomorphic color palette
- [x] Implement 3D button effects (drop shadows)
- [x] Rounded corners on tiles and buttons
- [x] Responsive layout for mobile portrait
- [x] Tailwind CSS configuration

## Interactions & Feedback
- [x] Tile tap detection (player move)
- [x] Haptic feedback on tile tap
- [x] Visual feedback on tile press
- [x] Restart button functionality
- [x] Game over animation/message

## Branding
- [x] Generate custom app icon with neomorphic design
- [x] Update app.config.ts with app name and logo URL
- [x] Copy icon to splash, favicon, and Android adaptive icon locations

## Testing & Delivery
- [ ] Test player vs CPU gameplay
- [ ] Test all win conditions
- [ ] Test tie condition
- [ ] Test restart functionality
- [ ] Test score persistence
- [ ] Verify UI matches design spec
- [ ] Test on mobile preview
