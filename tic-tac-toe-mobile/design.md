# Tic-Tac-Toe Mobile App - Design System

## Overview
A modern, neomorphic Tic-Tac-Toe game with a dark theme, smart CPU opponent, and persistent scoreboard. The app follows Apple Human Interface Guidelines for iOS-first design with one-handed mobile portrait usage (9:16).

## Color Palette

| Token | Color | Usage |
|-------|-------|-------|
| **Background** | Dark Slate/Navy (#1A2B33) | Main screen background |
| **Primary (Player X)** | Cyan/Teal (#31C3BD) | Player X marks, accent elements |
| **Secondary (CPU O)** | Orange/Yellow (#F2B137) | CPU O marks, secondary accent |
| **Neutral/Text** | Light Gray/Silver (#A8BFC9) | Text, turn indicator |
| **Tile Background** | Deep Slate (#1F3641) | Game board tiles (empty state) |
| **Shadow/3D** | Dark (#10212A) | Drop shadows, 3D button effect |

## Screen List

### 1. **Home / Game Screen** (Main)
The primary and only screen where all gameplay occurs.

**Layout Structure:**
- **Header Section** (Top)
  - Left: Logo (Cyan 'X' + Orange 'O')
  - Center: Turn indicator pill (shows current player)
  - Right: Restart button (refresh icon)

- **Game Board** (Middle)
  - 3×3 grid with gaps between tiles
  - Rounded square tiles
  - Empty tiles: dark background (#1F3641)
  - Filled tiles: large cyan 'X' or orange 'O'
  - Subtle drop-shadow for 3D effect

- **Scoreboard** (Bottom)
  - Three rounded rectangular blocks side-by-side
  - Block 1 (Cyan): "X (YOU)" + win count
  - Block 2 (Gray): "TIES" + draw count
  - Block 3 (Orange): "O (CPU)" + win count

## Primary Content and Functionality

### Header
- **Logo**: Cyan 'X' next to Orange 'O' (visual brand)
- **Turn Indicator**: Pill-shaped button displaying "X TURN" or "O TURN" (non-interactive, visual only)
- **Restart Button**: Clears board, keeps scores intact

### Game Board
- **Tile Interaction**: Tap empty tile to place 'X'
- **Visual Feedback**: Tiles show pressed state (subtle opacity/scale change)
- **Win Detection**: Highlights winning line (if applicable)
- **Game Over**: Shows winner or tie message, auto-clears board after brief delay

### Scoreboard
- **Persistent Scores**: Tracks across multiple rounds
- **Win Count**: Increments when player or CPU wins
- **Tie Count**: Increments on draw games

## Key User Flows

### **Flow 1: Player Turn**
1. User sees "X TURN" in header
2. User taps an empty tile
3. 'X' appears on tile with haptic feedback
4. Turn passes to CPU

### **Flow 2: CPU Turn**
1. Header shows "O TURN"
2. CPU thinks for ~500ms (simulated delay)
3. CPU places 'O' on optimal tile
4. Turn passes back to player

### **Flow 3: Win Condition**
1. Three-in-a-row detected (player or CPU)
2. Winning line highlighted or emphasized
3. Score increments for winner
4. Board clears after 1-2 second delay
5. New game starts automatically

### **Flow 4: Tie Condition**
1. Board fills with no winner
2. "TIES" score increments
3. Board clears after 1-2 second delay
4. New game starts automatically

### **Flow 5: Restart Game**
1. User taps restart button at top-right
2. Board clears immediately
3. Scores remain unchanged
4. New game begins with player's turn

## Design Principles

- **Neomorphic Style**: Subtle drop-shadows and 3D button effects create tactile, "pushable" appearance
- **Dark Theme**: Reduces eye strain, modern aesthetic
- **One-Handed Usage**: All interactive elements within thumb reach (bottom 60% of screen)
- **Clear Feedback**: Every action produces immediate visual/haptic feedback
- **Accessibility**: High contrast text, clear visual hierarchy, no reliance on color alone
